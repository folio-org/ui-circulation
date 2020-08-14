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

const propTypes = {
  onChange: PropTypes.func.isRequired,

  // collection of 'code hint' data: all the possible named values/selectors from all of the system categories (typeGroups)
  completionLists: PropTypes.object,

  /*
    values that could be applied to selections of typeGroups:
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
  code: PropTypes.string, // the code that appears in the editor
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string,
      line: PropTypes.number,
    }),
  ),
  showAssist: PropTypes.bool,
  filter: PropTypes.string,
  intl: PropTypes.object.isRequired,
};

function handleBackspace(cm) {
  const { widget } = cm.state.completionActive;

  if (widget.currentSectionIndex < 1) {
    return cm.deleteH(-1, 'char');
  }

  widget.moveToPreviousSectionInCurrentSectionsList();
}

// custom handlers for working with the ever-present code hinting
const moveFocus = value => (cm, handle) => handle.moveFocus(value);

function handleEnter(cm, handle) {
  if (selectHint(cm, handle)) {
    return;
  }

  cm.execCommand('newlineAndIndent');
}

function selectHint(cm, handle) {
  const { currentSectionIndex } = cm.state.completionActive.widget;
  const {
    selectedHintIndex,
    list,
  } = handle.data.sections[currentSectionIndex];

  if (selectedHintIndex !== -1 && selectedHintIndex < list.length) {
    handle.pick();

    return true;
  }
}

function handleTab(cm, handle) {
  if (selectHint(cm, handle)) {
    return;
  }

  if (cm.somethingSelected()) {
    cm.indentSelection('add');

    return;
  }

  const activeDocument = cm.getDoc();
  const cursor = activeDocument.getCursor(); // gets the line number in the cursor position

  activeDocument.replaceRange('\t', cursor); // adds a new line
}

function createTriangle(isOpen = true) {
  const container = document.createElement('div');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

  container.style.cssText = 'width: 26px; height: 26px; cursor:pointer;';
  svg.style.cssText = 'width:100%; height: 100%';
  polygon.setAttribute('points', isOpen ? '18.7 4.8 13.4 14.1 8 4.8' : '8.7 4 18 9.4 8.7 14.8');
  polygon.setAttribute('fill', '#666');
  svg.appendChild(polygon);
  container.appendChild(svg);

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
    this.errWidgets = []; // track widgets errors for clearing later
    this.filteredSections = []; // track sections hidden via filter
  }

  getInitialState() {
    const {
      completionLists,
      typeMapping,
      policyMapping,
      code,
    } = this.props;

    const modeConfig = {
      name: 'rulesCMM',
      completionLists,
      typeMapping,
      policyMapping,
      keySelector: ['all', 'rare'],
    };

    const openTri = createTriangle();
    const foldedTri = createTriangle(false);

    return {
      code,
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
        gutters: ['CodeMirror-linenumbers', 'rules-foldgutter'],
        foldGutter: {
          rangeFinder: Codemirror.fold.rules,
          gutter: 'rules-foldgutter',
          indicatorOpen: openTri,
          indicatorFolded: foldedTri,
        }
      },
    };
  }

  componentDidMount() {
    const { intl: { formatMessage } } = this.props;

    this.cm = this.cmComponentRef.current.editor;

    rulesHint(Codemirror, this.props);
    initSubMenuDataFetching(Codemirror, this.props);

    // pretty much always show the auto-complete
    this.cm.on('cursorActivity', this.showHint);
    this.cm.on('endCompletion', this.showHint);
    this.cm.display.input.textarea.ariaLabel = formatMessage({ id: 'ui-circulation.settings.circulationRules.label' });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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

    if (filter === '') return;

    // scan rows with '#'
    const ranges = [];
    const re = new RegExp(filter, 'i');
    let found = true;
    const rng = {};

    this.cm.eachLine(line => {
      const lineNumber = this.cm.getLineNumber(line);

      // test rule line for filter string... if
      if (/^\s*#/.test(line.text)) {
        if (!re.test(line.text)) {
          if (found) {
            rng.start = { line: lineNumber - 1, ch: 0 };
            found = false;
          }
        } else if (!found) {
          rng.end = { line: lineNumber - 1, ch: line.text.length };
          ranges.push({ ...rng });
          found = true;
        }
      }

      if (lineNumber === this.cm.lastLine()) {
        if (!found) {
          rng.end = { line: lineNumber, ch: line.text.length };
          ranges.push({ ...rng });
        }
      }
    });

    // if filter not found, mark rows until next '#'
    ranges.forEach((rn) => {
      this.filteredSections.push(this.cm.markText(rn.start, rn.end, { collapsed: true, inclusiveLeft: true, inclusiveRight: true }));
    });
  };

  clearErrors = () => this.errWidgets.forEach(errWidget => errWidget.clear());

  // called before codemirror state is internally updated
  handleFocus = focused => {
    this.editorFocused = focused;

    if (this.editorFocused) {
      this.showHint(this.cm);

      return;
    }

    // if help is present when editor loses focus, hide it
    // except for when it loses focus due to clicking a help option
    const {
      focused: stateFocused,
      completionActive,
    } = this.cm.state;

    const widget = get(completionActive, 'widget');

    if (!stateFocused && widget) {
      widget.close();
    }
  };

  renderError = (lineNumber, errMsg) => {
    const errElement = document.createElement('div');

    errElement.className = 'rule-error';
    errElement.innerHTML = errMsg;

    const error = this.cm.doc.addLineWidget(
      lineNumber - 1,
      errElement,
      {
        coverGutter: true,
        noHScroll: true,
      }
    );

    this.errWidgets.push(error);
  };

  showHint = cm => {
    // return if
    // * there's already an active help dropdown
    // * showing help has been turned off
    // * component knows the editor is in focus(updates before the actual editor knows)
    if (cm.state.completionActive || !this.props.showAssist || !this.editorFocused) return;

    const hintOptions = {
      completeSingle: false,
      hideOnUnfocus: true,
      customKeys: {
        Up: moveFocus(-1),
        Down: moveFocus(1),
        PageUp: (codeMirror, handle) => { handle.moveFocus(-handle.menuSize() + 1, true); },
        PageDown: (codeMirror, handle) => { handle.moveFocus(handle.menuSize() - 1, true); },
        Home: (codeMirror, handle) => { handle.setFocus(0); },
        End: (codeMirror, handle) => { handle.setFocus(handle.length - 1); },
        Enter: handleEnter,
        Tab: handleTab,
        Backspace: handleBackspace,
        Esc: noop,
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
