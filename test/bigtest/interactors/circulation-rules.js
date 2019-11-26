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
  fillable,

} from '@bigtest/interactor';

import { ACTIVE_HINT_ELEMENT_CLASS } from '../../../src/constants';

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
  isFirstItemActive = hasClass('.CodeMirror-hint:not(.hidden):first-child', ACTIVE_HINT_ELEMENT_CLASS);
  isLastItemActive = hasClass('.CodeMirror-hint:not(.hidden):last-child', ACTIVE_HINT_ELEMENT_CLASS);
  isActiveItemPresent = isPresent(`.${ACTIVE_HINT_ELEMENT_CLASS}`);
  items = collection('.CodeMirror-hint:not(.hidden)', scoped);
  itemsCount = count('.CodeMirror-hint:not(.hidden)');
  hasHighlightedItems = isPresent('.CodeMirror-hint:not(.hidden) span', scoped);
  completionButton = scoped('.CodeMirror-hint-section-button');
  isCompletionButtonHidden = hasClass('.CodeMirror-hint-section-button-container', 'hidden');
  isCompletionButtonDisabled = hasClass('.CodeMirror-hint-section-button', 'disabled');
  hasCheckBoxes = isPresent('input[type="checkbox"]');
  filterInput = scoped('input[type="text"]');

  isCheckBoxChecked = function (itemIndex) {
    return this.$(`.CodeMirror-hint:nth-child(${itemIndex + 1}) input[type="checkbox"]`).checked;
  }

  isHighlightedFilterValue = function (itemIndex, filterValue = '') {
    const itemText = this.items(itemIndex).$('span').innerText;

    return itemText.toLowerCase() === filterValue.toLowerCase();
  }

  isScrollable = function () {
    return this.$('ul').scrollHeight > this.$('ul').clientHeight;
  };

  getItemNode(itemIndex) {
    return this.$(`.CodeMirror-hint:nth-child(${itemIndex + 1})`);
  }

  isScrolledToTop(itemIndex) {
    return this.$('ul').scrollTop === this.getItemNode(itemIndex).offsetTop - scrollingOffset;
  }

  isScrolledToBottom(itemIndex) {
    const itemNode = this.getItemNode(itemIndex);
    const listContainer = this.$('ul');

    return listContainer.scrollTop === itemNode.offsetTop + itemNode.offsetHeight - listContainer.clientHeight + scrollingOffset;
  }
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
            cancelable: true,
            bubbles: true
          };

          $node.dispatchEvent(new Event(event, { ...defaultOptions, ...options }));
        });
    });
  };

  clickOnItem = this.triggerItemEvent('click');
}

@interactor class Editor {
  static defaultScope = '.react-codemirror2';

  setValue = action(function (value, overrideOptions) {
    const defaultOptions = { showHint: true, append: false };
    const options = Object.assign(defaultOptions, overrideOptions);

    return this.find('.CodeMirror').do(({ CodeMirror }) => {
      const resultValue = options.append ? CodeMirror.doc.getValue() + value : value;

      CodeMirror.doc.setValue(resultValue);
      CodeMirror.setCursor(CodeMirror.lineCount(), 0);

      if (options.showHint) {
        CodeMirror.showHint();
      }

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
  pressBackspace = this.pressKey(8);

  textArea = new Interactor('textarea');
  errorMessage = new Interactor('.rule-error');
  hints = new Hints();
  value = getEditorValue();
  line0 = getEditorLine(0);
}

@interactor class CirculationRules {
  static defaultScope = '[data-test-circulation-rules]';

  formPresent = isPresent('[data-test-circulation-rules-form]');
  editorPresent = isPresent('.react-codemirror2');
  clickSaveRulesBtn = clickable('#clickable-save-loan-rules');
  filterInputField = new Interactor('[data-test-rules-filter]');
  isSaveButtonDisabled = property('#clickable-save-loan-rules', 'disabled');
  editor = new Editor();
  filter = fillable('[data-test-rules-filter]');
}

export default new CirculationRules();
