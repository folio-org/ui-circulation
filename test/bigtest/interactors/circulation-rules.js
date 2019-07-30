import {
  interactor,
  isPresent,
  action,
  computed,
  clickable,
  property,
  collection,
  Interactor,
  count,
  scoped,
  triggerable,
} from '@bigtest/interactor';

function getEditorValue() {
  return computed(function () {
    const editor = this.$('.CodeMirror').CodeMirror;
    return editor.doc.getValue();
  });
}

function getEditorLine(lineNo = 0) {
  return computed(function () {
    const editor = this.$('.CodeMirror').CodeMirror;
    return editor.doc.getValue(lineNo);
  });
}

function hasClass(selector, className) {
  return computed(function () {
    return this.$(selector).className.includes(className);
  });
}

const scrollingOffset = 3;

@interactor class HintsSection {
  subheader = scoped('.CodeMirror-hints-subheader');
  isFirstItemActive = hasClass('.CodeMirror-hint:first-child', 'CodeMirror-hint-active');
  isLastItemActive = hasClass('.CodeMirror-hint:last-child', 'CodeMirror-hint-active');
  isActiveItemPresent = isPresent('.CodeMirror-hint-active');
  items = collection('.CodeMirror-hint', scoped);
  itemsCount = count('.CodeMirror-hint');

  isScrollable = function () {
    return this.$('ul').scrollHeight > this.$('ul').clientHeight;
  };

  getItemNode(itemIndex) {
    return this.$(`.CodeMirror-hint:nth-child(${itemIndex + 1})`);
  }

  isScrolledToTop = function (itemIndex) {
    return this.$('ul').scrollTop === this.getItemNode(itemIndex).offsetTop - scrollingOffset;
  };

  isScrolledToBottom = function (itemIndex) {
    const itemNode = this.getItemNode(itemIndex);
    const listContainer = this.$('ul');

    return listContainer.scrollTop === itemNode.offsetTop + itemNode.offsetHeight - listContainer.clientHeight + scrollingOffset;
  };
}

@interactor class Hints {
  static defaultScope = '.CodeMirror-hints';

  arePresent = isPresent('.CodeMirror-hint');

  header = new Interactor('.CodeMirror-hints-header');
  sections = collection('.CodeMirror-hints-list', HintsSection);
  sectionsCount = count('.CodeMirror-hints-list');

  triggerItemEvent = function (event, options) {
    return action(function (itemIndex, section = 0) {
      return this.find(`.CodeMirror-hints-list:nth-child(${section + 1}) .CodeMirror-hint:nth-child(${itemIndex + 1})`)
        .do(($node) => {
          const defaultOptions = {
            сancelable: true,
            bubbles: true
          };

          $node.dispatchEvent(new Event(event, { ...defaultOptions, ...options }));
        });
    });
  };

  clickOnItem = this.triggerItemEvent('click');
  doubleClickOnItem = this.triggerItemEvent('dblclick');
}

@interactor class Editor {
  static defaultScope = '.react-codemirror2';

  setValue = action(function (value) {
    return this.find('.CodeMirror').do(({ CodeMirror }) => {
      CodeMirror.doc.setValue(value);
      CodeMirror.setCursor(CodeMirror.lineCount(), 0);
      CodeMirror.showHint();

      return CodeMirror;
    }).run();
  });

  pickHint = action(function (index = 0) {
    return this.find('.CodeMirror').do(({ CodeMirror }) => {
      const {
        widget,
        data,
      } = CodeMirror.state.completionActive;
      widget.sections[widget.currentSectionIndex].selectedHintIndex = index;

      widget.pick(data, index);
      CodeMirror.setCursor(CodeMirror.lineCount(), 0);
      CodeMirror.showHint();
      return CodeMirror;
    }).run();
  });

  changeActiveItem = action(function (index = 0, avoidWrap = false) {
    return this.find('.CodeMirror').do(({ CodeMirror }) => {
      const completionActive = CodeMirror.state.completionActive;

      if (completionActive && completionActive.widget) {
        completionActive.widget.changeActive(index, avoidWrap);
      }

      return CodeMirror;
    }).run();
  });

  pressKey = function (keyCode) {
    return triggerable('textarea', 'keydown', {
      bubbles: true,
      cancelable: true,
      keyCode,
    });
  };

  pressEnter = this.pressKey(13);
  pressTab = this.pressKey(9);
  pressArrowDown = this.pressKey(40);
  pressArrowUp = this.pressKey(38);

  textArea = new Interactor('textarea');
  hints = new Hints();
  value = getEditorValue();
  line0 = getEditorLine(0);
}

@interactor class CirculationRules {
  static defaultScope = '[data-test-circulation-rules]';

  formPresent = isPresent('[data-test-circulation-rules-form]');
  editorPresent = isPresent('.react-codemirror2');
  clickSaveRulesBtn = clickable('#clickable-save-loan-rules');
  isSaveButtonDisabled = property('#clickable-save-loan-rules', 'disabled');
  editor = new Editor();
}

export default new CirculationRules();
