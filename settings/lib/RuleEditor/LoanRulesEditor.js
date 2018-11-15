/* eslint-disable */
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import Codemirror from 'codemirror';
import CodeMirror from 'react-codemirror2';
import { intlShape, injectIntl } from 'react-intl';

import initLoanRulesCMM from './LoanRulesCMM';
import 'codemirror/addon/fold/foldcode';
import initFoldRules from './fold-rules';
import 'codemirror/addon/fold/foldgutter';
import './loan-rules-show-hint';
import loanRulesHint from './loanRules-hint';
import 'codemirror/addon/hint/css-hint';
import '!style-loader!css-loader!./CodeMirrorCustom.css';
import css from './LoanRulesEditor.css';

const propTypes = {
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
    polcies that could be applied to selections of typeGroups.
  */
  policies: PropTypes.arrayOf(PropTypes.object),

  /*
    values that could be applied to selections of typeGroups. Defaults to:
    {
      'g': 'Patron Groups',
      'a': 'Campus',
      'b': 'Branch',
      'c': 'Collection',
      'm': 'Material Type',
      's': 'Shelf',
      't': 'Loan Type',
    }
    A value of this should be applied for each typegroup that's expected to be highlighted by the editor.
  */
  typeMapping: PropTypes.object.isRequired,

  /*
    the code that appears in the editor
  */
  code: PropTypes.string,
  errors: PropTypes.arrayOf(
    PropTypes.shape(
      {
        message:PropTypes.string,
        line:PropTypes.number
      })),
  showAssist: PropTypes.bool,
  filter: PropTypes.string,
  intl: intlShape.isRequired,
};

const defaultProps = {
  typeMapping: {
    'g': 'Patron Groups',
    'a': 'Campus',
    'b': 'Branch',
    'c': 'Collection',
    'm': 'Material Type',
    's': 'Shelf',
    't': 'Loan Type',
  }
}

// custom-handlers for working with the ever-present code hinting.
function moveFocusDown(cm, handle){
  const HINT_ELEMENT_CLASS        = "CodeMirror-hint";
  const ACTIVE_HINT_ELEMENT_CLASS = "CodeMirror-hint-active";
  if (cm.state.completionActive.widget.data.selectedHint === -1) {
    handle.data.selectedHint = 0;
    const widget = cm.state.completionActive.widget;
    const node = widget.hints.childNodes[0];
    node.className += " " + ACTIVE_HINT_ELEMENT_CLASS;
    widget.selectedHint = 0;
    Codemirror.signal(widget.data, "select", widget.data.list[0], node);
  } else {
    handle.moveFocus(1);
    cm.state.completionActive.widget.data.selectedHint += 1;
  }
};

function moveFocusUp(cm, handle) {
  var HINT_ELEMENT_CLASS        = "CodeMirror-hint";
  var ACTIVE_HINT_ELEMENT_CLASS = "CodeMirror-hint-active";
  //if it's the first element in the list, we'll need to refocus the editor...
  if (cm.state.completionActive.widget.data.selectedHint <= 0) {
    const widget = cm.state.completionActive.widget;
    const node = widget.hints.childNodes[handle.data.selectedHint];
    if (node) node.className = node.className.replace(" " + ACTIVE_HINT_ELEMENT_CLASS, "");
    handle.data.selectedHint = -1;
    widget.selectedHint = -1;
    cm.focus();
  } else {
    handle.moveFocus(-1);
    cm.state.completionActive.widget.data.selectedHint -= 1;
  }
};

function handleEnter(cm, handle) {
  if (handle.data.selectedHint === -1) {
    cm.execCommand("newlineAndIndent");
  } else {
    handle.pick();
  }
};

function handleTab(cm, handle) {
  if (handle.data.selectedHint === -1) {
    if(cm.somethingSelected()) {
      cm.indentSelection("add");
      return;
    }

    const doc = cm.getDoc();
    const cursor = doc.getCursor(); // gets the line number in the cursor position

    doc.replaceRange('\t', cursor); // adds a new line
  } else {
    handle.pick();
  }
}

//generate gutter graphics for folding...
function generateOpen() {
  const container = document.createElement('div');
  container.style.cssText='width: 26px; height: 26px; cursor:pointer;';
  const tri = document.createElementNS('http://www.w3.org/2000/svg','svg');
  tri.style.cssText='width:100%; height: 100%';
  const polygon = document.createElementNS('http://www.w3.org/2000/svg','polygon');
  polygon.setAttribute('points', "18.7 4.8 13.4 14.1 8 4.8");
  polygon.setAttribute('fill',"#666");
  tri.appendChild(polygon);
  container.appendChild(tri);
  return container;
}

function generateFolded() {
  const container = document.createElement('div');
  container.style.cssText='width: 26px; height: 26px; cursor:pointer;';
  const tri = document.createElementNS('http://www.w3.org/2000/svg','svg');
  tri.style.cssText='width:100%; height: 100%';
  const polygon = document.createElementNS('http://www.w3.org/2000/svg','polygon');
  polygon.setAttribute('points', "8.7 4 18 9.4 8.7 14.8");
  polygon.setAttribute('fill',"#666");
  tri.appendChild(polygon);
  container.appendChild(tri);
  return container;
}

class LoanRulesEditor extends React.Component {

  constructor(props) {
    super(props);

    initLoanRulesCMM(Codemirror);
    initFoldRules(Codemirror);
    this.state = this.getInitialState();

    this.cmComponent = null;
    this.cm = null;

    this.editorFocused = false;

    // this.updateCode = this.updateCode.bind(this);
    this.renderError = this.renderError.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
    this.showHelp = this.showHelp.bind(this);
    this.filterRules = this.filterRules.bind(this);
    this.handleFocus = this.handleFocus.bind(this);

    // keep track of errWidgets for clearing later...
    this.errWidgets = [];

    // track sections hidden via filter...
    this.filteredSections = [];
  }

  componentWillReceiveProps(nextProps) {
    const nextState = {};

    if (nextProps.policies && !isEqual(nextProps.policies, this.props.polices)) {
      nextState.policies = nextProps.policies;
    }

    if (nextProps.typeMapping && !isEqual(nextProps.typeMapping, this.props.typeMapping)) {
      nextState.typeMapping = nextProps.typeMapping;
    }

    if (nextProps.completionLists && !isEqual(nextProps.completionLists, this.props.completionLists)) {
      nextState.completionLists = nextProps.completionLists;
    }

    if (Object.keys(nextState).length > 0) {
      this.setState((curState) => {
        const newState = _.cloneDeep(curState);
        Object.assign(newState.codeMirrorOptions.mode, nextState);
        return newState;
      });
    }

    if (nextProps.code !== this.props.code) {
      this.setState(prevState =>
        Object.assign(_.cloneDeep(prevState), { code: nextProps.code })
      );
    }

    // filtering
    if(nextProps.filter !== this.props.filter) {
      this.filterRules(nextProps.filter);
    }
  }

  getInitialState() {
    const modeConfig = {
      name: 'loanRulesCMM',
      completionLists: this.props.completionLists,
      policies: this.props.policies,
      typeMapping: this.props.typeMapping,
      keySelector: [
        'all',
        'rare'
      ]
    }

    const openTri = generateOpen();
    const foldedTri = generateFolded();

    return  {
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
          gutter: "LoanRules-foldgutter",
          indicatorOpen: openTri,
          indicatorFolded: foldedTri,
        },
        gutters: ["CodeMirror-linenumbers", "LoanRules-foldgutter"],
      },
      code: this.props.code,
    }
  }

  componentDidMount() {
    this.cm = this.cmComponent.editor;
    //set up hinting
    loanRulesHint(Codemirror, this.props);

    // prettymuch always show the auto-complete.
    this.cm.on('cursorActivity', this.showHelp);
    this.cm.on('endCompletion', this.showHelp);
    // this.cm.on('focus', this.showHelp);
  }

  componentDidUpdate() {
    this.clearErrors();
    this.cm.refresh();
    if(this.props.errors && this.props.errors.length > 0){
      this.props.errors.forEach((err) => {
        this.renderError(err.line, err.message);
      })
    }
  }

  filterRules(filter) {

    this.filteredSections.forEach((fs) => {
      fs.clear();
    });
    if ( filter === '' ) { return; }

    // scan rows with '#'
    const res = [];
    const re = new RegExp(filter,'i');
    let found = true;
    const rng = {};
    this.cm.eachLine((lh) => {
      // test rule line for filer string... if
      if(/^\s*#/.test(lh.text)){
        if(!re.test(lh.text)){
          if (found) {
            rng.start = {line: this.cm.getLineNumber(lh)-1, ch: 0};
            found = false;
          }
        } else {
          if(!found){
            rng.end = {line: this.cm.getLineNumber(lh)-1, ch: lh.text.length};
            res.push(Object.assign({}, rng));
            found = true;
          }
        }
      }
      if(this.cm.getLineNumber(lh) == this.cm.lastLine()){
        if(!found) {
          rng.end = {line: this.cm.getLineNumber(lh), ch: lh.text.length};
          res.push(Object.assign({}, rng));
        }
      }
    });
    // if filter not found, mark rows until next '#'

    let lastLine = 0;
    res.forEach((rn) => {
      this.filteredSections.push(this.cm.markText(rn.start, rn.end, { collapsed: true, inclusiveLeft: true, inclusiveRight: true, }));
    });
  }

  clearErrors(){
    this.errWidgets.forEach((w) => {
      w.clear();
    });
  }

  // called before codemirror state is internally updated...
  handleFocus(focused) {
    if(!focused){
      this.editorFocused = false;
      // if help is present when editor loses focus, hide it...
      // except for when it loses focuse due to clicking a help option (sheesh).
      if (!this.cm.state.focused) {
        if( this.cm.state.completionActive && this.cm.state.completionActive.widget ) {
          const w = this.cm.state.completionActive.widget;
          // this.cm.state.focused = false;
          w.close();
        }
      }
    } else {
      this.editorFocused = true;
      this.showHelp(this.cm);
    }
  }

  // display error in editor
  renderError(lineNumber, errMsg) {
    const errElement = document.createElement('div');
    errElement.className = 'loan-rule-error';
    errElement.innerHTML = errMsg;

    this.errWidgets.push(this.cm.doc.addLineWidget(
      lineNumber-1,
      errElement,
      {
        coverGutter: true,
        noHScroll: true,
      }
    ));
  }

  // execute hint-giving.
  showHelp(cm) {
    // return if
    // * there's already an active help dropdown
    // * if showing help has been turned off
    // * component knows the editor is in focus(updates before the actual editor knows)
    if(cm.state.completionActive || !this.props.showAssist || !this.editorFocused) return;

    const hintOptions = {
      completeSingle: false,
      completeOnSingleClick: true,
      hideOnUnfocus: true,
      customKeys:{
        'Up': moveFocusUp,
        'Down': moveFocusDown,
        'PageUp': function(cm, handle) { handle.moveFocus(-handle.menuSize() + 1, true); },
        'PageDown': function(cm, handle) { handle.moveFocus(handle.menuSize() - 1, true); },
        'Home': function(cm, handle) { handle.setFocus(0); },
        'End': function(cm, handle) { handle.setFocus(handle.length - 1); },
        'Enter': handleEnter,
        'Tab': handleTab,
        'Esc': function(cm, handle) { handle.close },
      }
    };

    Codemirror.showHint(this.cm, Codemirror.hint.loanRulesCMM, hintOptions);
  }

  // updateCode(newCode) {
	// 	this.setState({
	// 		code: newCode,
	// 	});
	// }

  render() {
    return(
      <CodeMirror
        className={css.codeMirrorFullScreen}
        ref={(ref) => { this.cmComponent = ref; }}
        value={this.state.code}
        onFocus={(editor, event) => this.handleFocus(true)}
        onBlur={(editor, event) => this.handleFocus(false)}
        onChange={(editor, metadata, value) => this.props.onChange(value)}
        options={this.state.codeMirrorOptions}
      />
    );
  }

}

LoanRulesEditor.propTypes = propTypes;
LoanRulesEditor.defaultProps = defaultProps;

export default injectIntl(LoanRulesEditor);
