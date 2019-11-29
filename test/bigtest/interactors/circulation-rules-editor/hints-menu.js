import {
  interactor,
  isPresent,
  action,
  collection,
  Interactor,
  count,
} from '@bigtest/interactor';

import HintsSection from './hints-section';

@interactor class HintsMenu {
  static defaultScope = '.CodeMirror-hints';

  hasItems = isPresent('.CodeMirror-hint');
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

export default HintsMenu;
