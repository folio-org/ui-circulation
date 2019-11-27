
import {
  interactor,
  isPresent,
  computed,
  collection,
  count,
  scoped,
} from '@bigtest/interactor';

import { ACTIVE_HINT_ELEMENT_CLASS } from '../../../../src/constants';

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

export default HintsSection;
