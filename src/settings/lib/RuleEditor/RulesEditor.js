import React from 'react';
import PropTypes from 'prop-types';
import Codemirror from 'codemirror'; // eslint-disable-line import/no-extraneous-dependencies
import CodeMirror from 'react-codemirror2';
import { injectIntl } from 'react-intl';
import {
  noop,
  cloneDeep,
  isEmpty,
  isEqual,
  get
} from 'lodash';

import 'codemirror/addon/fold/foldcode'; // eslint-disable-line import/no-extraneous-dependencies
import 'codemirror/addon/fold/foldgutter'; // eslint-disable-line import/no-extraneous-dependencies
import 'codemirror/addon/hint/css-hint'; // eslint-disable-line import/no-extraneous-dependencies

import initRulesCMM from './initRulesCMM';
import initFoldRules from './initFoldRules';
import './rules-show-hint';
import {
  rulesHint,
  initSubMenuDataFetching,
} from './Rules-hint';

import '!style-loader!css-loader!./CodeMirrorCustom.css'; // eslint-disable-line import/no-webpack-loader-syntax
import css from './RulesEditor.css';

const ACTIVE_HINT_ELEMENT_CLASS = 'CodeMirror-hint-active';

const propTypes = {
  onChange: PropTypes.func.isRequired,

  /*
    big collection of 'code hint' data...
    all the possible named values/selectors from all of the system categories (typeGroups)...
    'Patron Groups',
    'Campus',
    'Branch',
    'Collection',
    'Material Type',
    'Shelf',
    'Loan Type'
  */
  completionLists: PropTypes.object,

  /*
    values that could be applied to selections of typeGroups. Example:
    {
      'g': 'Patron Groups',
      'a': 'Campus'
    }
    A value of this should be applied for each typegroup that's expected to be highlighted by the editor.
  */
  typeMapping: PropTypes.object.isRequired,

  /*
    values that could be applied to selections of policies:
    {
      'l': 'Loan policies',
      'r': 'Request policies',
      'n': 'Notice policies',
    }
  */
  policyMapping: PropTypes.object.isRequired,

  /*
    the code that appears in the editor
  */
  code: PropTypes.string,
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      message:PropTypes.string,
      line:PropTypes.number,
    }),
  ),
  showAssist: PropTypes.bool,
  filter: PropTypes.string,
};

// custom handlers for working with the ever-present code hinting
function moveFocusDown(cm, handle) {
  const {
    currentSectionIndex,
    data,
    sections,
  } = cm.state.completionActive.widget;
  const currentSectionData = data.sections[currentSectionIndex];

  if (currentSectionIndex === 0 && currentSectionData.selectedHintIndex === -1) {
    handle.data.sections[currentSectionIndex].selectedHintIndex = 0;
    const node = sections[currentSectionIndex].getListNode(0);
    node.className += ' ' + ACTIVE_HINT_ELEMENT_CLASS;
    sections[currentSectionIndex].selectedHintIndex = 0;
    Codemirror.signal(data, 'select', currentSectionData.list[0], node);
  } else {
    handle.moveFocus(1);
    currentSectionData.selectedHintIndex += 1;
  }
}

function moveFocusUp(cm, handle) {
  // refocus the editor, if it's the first element in the list
  const {
    currentSectionIndex,
    data,
    sections,
  } = cm.state.completionActive.widget;

  if (currentSectionIndex === 0 && data.sections[currentSectionIndex].selectedHintIndex <= 0) {
    const { selectedHintIndex } = handle.data.sections[currentSectionIndex];
    const node = sections[currentSectionIndex].getListNode(selectedHintIndex);

    if (node) node.className = node.className.replace(` ${ACTIVE_HINT_ELEMENT_CLASS}`, '');

    handle.data.sections[currentSectionIndex].selectedHintIndex = -1;
    sections[currentSectionIndex].selectedHintIndex = -1;
    cm.focus();
  } else {
    handle.moveFocus(-1);
    data.sections[currentSectionIndex].selectedHintIndex -= 1;
  }
}

function handleEnter(cm, handle) {
  const { currentSectionIndex } = cm.state.completionActive.widget;

  if (handle.data.sections[currentSectionIndex].selectedHintIndex === -1) {
    cm.execCommand('newlineAndIndent');
  } else {
    handle.pick();
  }
}

function handleTab(cm, handle) {
  const { currentSectionIndex } = cm.state.completionActive.widget;

  if (handle.data.sections[currentSectionIndex].selectedHintIndex === -1) {
    if (cm.somethingSelected()) {
      cm.indentSelection('add');

      return;
    }

    const doc = cm.getDoc();
    const cursor = doc.getCursor(); // gets the line number in the cursor position

    doc.replaceRange('\t', cursor); // adds a new line
  } else {
    handle.pick();
  }
}

function createTriangle(isOpen = true) {
  const container = document.createElement('div');
  const tri = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

  container.style.cssText = 'width: 26px; height: 26px; cursor:pointer;';
  tri.style.cssText = 'width:100%; height: 100%';
  polygon.setAttribute('points', isOpen ? '18.7 4.8 13.4 14.1 8 4.8' : '8.7 4 18 9.4 8.7 14.8');
  polygon.setAttribute('fill', '#666');
  tri.appendChild(polygon);
  container.appendChild(tri);

  return container;
}

class RulesEditor extends React.Component {
  constructor(props) {
    super(props);

    initRulesCMM(Codemirror);
    initFoldRules(Codemirror);
    this.state = this.getInitialState();

    this.cmComponentRef = React.createRef();
    this.cm = null;

    this.editorFocused = false;

    // track widgets errors for clearing later...
    this.errWidgets = [];

    // track sections hidden via filter...
    this.filteredSections = [];
  }

  componentWillReceiveProps(nextProps) { // eslint-disable-line react/no-deprecated, react/sort-comp
    const nextState = {};

    if (nextProps.typeMapping && !isEqual(nextProps.typeMapping, this.props.typeMapping)) {
      nextState.typeMapping = nextProps.typeMapping;
    }

    if (nextProps.policyMapping && !isEqual(nextProps.policyMapping, this.props.policyMapping)) {
      nextState.policyMapping = nextProps.policyMapping;
    }

    if (nextProps.completionLists && !isEqual(nextProps.completionLists, this.props.completionLists)) {
      nextState.completionLists = nextProps.completionLists;
    }

    if (!isEmpty(nextState)) {
      this.setState(({ codeMirrorOptions }) => {
        const newCodeMirrorOptions = cloneDeep(codeMirrorOptions);

        return { codeMirrorOptions: Object.assign(newCodeMirrorOptions.mode, nextState) };
      });
    }

    if (nextProps.code !== this.props.code) {
      this.setState(() => ({ code: nextProps.code }));
    }

    if (nextProps.filter !== this.props.filter) {
      this.filterRules(nextProps.filter);
    }
  }

  getInitialState() {
    const {
      completionLists,
      typeMapping,
      policyMapping,
    } = this.props;

    const name = 'rulesCMM';
    const modeConfig = {
      name,
      completionLists,
      typeMapping,
      policyMapping,
      keySelector: [
        'all',
        'rare'
      ],
    };

    const openTri = createTriangle();
    const foldedTri = createTriangle(false);

    return {
      codeMirrorOptions: {
        lineNumbers: true,
        lineWrapping: true,
        tabSize: 4,
        indentUnit: 4,
        smartIndent: true,
        indentWithTabs: true,
        tabindex: 0,
        rtlMoveVisually: true,
        mode: modeConfig,
        electricChars: true,
        foldGutter: {
          rangeFinder: Codemirror.fold.rules,
          gutter: 'rules-foldgutter',
          indicatorOpen: openTri,
          indicatorFolded: foldedTri,
        },
        gutters: ['CodeMirror-linenumbers', 'rules-foldgutter'],
      },
      code: this.props.code,
    };
  }

  componentDidMount() {
    this.cm = this.cmComponentRef.current.editor;

    rulesHint(Codemirror, this.props);
    initSubMenuDataFetching(Codemirror, this.props);

    // pretty much always show the auto-complete
    this.cm.on('cursorActivity', this.showHelp);
    this.cm.on('endCompletion', this.showHelp);
  }

  componentDidUpdate() {
    this.clearErrors();
    this.cm.refresh();

    const { errors } = this.props;

    if (!isEmpty(errors)) {
      errors.forEach(({ line, message }) => this.renderError(line, message));
    }
  }

  filterRules = filter => {
    this.filteredSections.forEach(filteredSection => filteredSection.clear());

    if (filter === '') {
      return;
    }

    // scan rows with '#'
    const res = [];
    const re = new RegExp(filter, 'i');
    let found = true;
    const rng = {};

    this.cm.eachLine(line => {
      const lineNumber = this.cm.getLineNumber(line);

      // test rule line for filter string... if
      if (/^\s*#/.test(line.text)) {
        if (!re.test(line.text)) {
          if (found) {
            rng.start = { line: line - 1, ch: 0 };
            found = false;
          }
        } else if (!found) {
          rng.end = { line: lineNumber - 1, ch: line.text.length };
          res.push(Object.assign({}, rng));
          found = true;
        }
      }

      if (lineNumber === this.cm.lastLine()) {
        if (!found) {
          rng.end = { line: lineNumber, ch: line.text.length };
          res.push(Object.assign({}, rng));
        }
      }
    });

    // if filter not found, mark rows until next '#'
    res.forEach((rn) => {
      this.filteredSections.push(this.cm.markText(rn.start, rn.end, { collapsed: true, inclusiveLeft: true, inclusiveRight: true }));
    });
  };

  clearErrors = () => this.errWidgets.forEach(errWidget => errWidget.clear());

  // called before codemirror state is internally updated...
  handleFocus = focused => {
    this.editorFocused = focused;

    if (!this.editorFocused) {
      // if help is present when editor loses focus, hide it...
      // except for when it loses focus due to clicking a help option
      const {
        focused: stateFocused,
        completionActive,
      } = this.cm.state;

      const widget = get(completionActive, 'widget');

      if (!stateFocused && widget) {
        widget.close();
      }
    } else {
      this.showHelp(this.cm);
    }
  };

  renderError = (lineNumber, errMsg) => {
    const errElement = document.createElement('div');

    errElement.className = 'rule-error';
    errElement.innerHTML = errMsg;

    this.errWidgets.push(this.cm.doc.addLineWidget(
      lineNumber - 1,
      errElement,
      {
        coverGutter: true,
        noHScroll: true,
      }
    ));
  };

  // execute hint-giving
  showHelp = cm => {
    // return if
    // * there's already an active help dropdown
    // * if showing help has been turned off
    // * component knows the editor is in focus(updates before the actual editor knows)
    if (cm.state.completionActive || !this.props.showAssist || !this.editorFocused) return;

    const hintOptions = {
      completeSingle: false,
      completeOnSingleClick: true,
      hideOnUnfocus: true,
      customKeys:{
        'Up': moveFocusUp,
        'Down': moveFocusDown,
        'PageUp': (codeMirror, handle) => { handle.moveFocus(-handle.menuSize() + 1, true); },
        'PageDown': (codeMirror, handle) => { handle.moveFocus(handle.menuSize() - 1, true); },
        'Home': (codeMirror, handle) => { handle.setFocus(0); },
        'End': (codeMirror, handle) => { handle.setFocus(handle.length - 1); },
        'Enter': handleEnter,
        'Tab': handleTab,
        'Esc': noop,
      }
    };

    Codemirror.showHint(this.cm, Codemirror.hint.rulesCMM, hintOptions);
  };

  render() {
    return (
      <CodeMirror
        className={css.codeMirrorFullScreen}
        ref={this.cmComponentRef}
        options={this.state.codeMirrorOptions}
        value={this.state.code}
        onFocus={() => this.handleFocus(true)}
        onBlur={() => this.handleFocus(false)}
        onChange={(editor, metadata, value) => this.props.onChange(value)}
      />
    );
  }
}

RulesEditor.propTypes = propTypes;

export default injectIntl(RulesEditor);
