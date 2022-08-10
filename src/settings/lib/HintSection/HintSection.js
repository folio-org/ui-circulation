import {
  get,
  isEmpty,
} from 'lodash';
import utils from '../RuleEditor/utils';
import {
  ACTIVE_HINT_ELEMENT_CLASS,
  HINT_ELEMENT_CLASS,
  HINT_SECTION_CONTAINER,
} from '../../../constants';

class HintSection {
  constructor(sectionOptions, cm) {
    this.cm = cm;
    this.container = utils.createContainer(HINT_SECTION_CONTAINER);
    this.setSelectedHintIndex(sectionOptions.selectedHintIndex || 0);
    this.defaultSelectedHintIndex = this.selectedHintIndex;
    this.itemsOptions = sectionOptions.list;

    if (sectionOptions.header) {
      this.initHeader(sectionOptions.header);
    }

    this.listContainer = document.createElement('ul');
    this.container.appendChild(this.listContainer);

    if (!isEmpty(get(sectionOptions, 'list'))) {
      this.setList(sectionOptions.list, this.defaultSelectedHintIndex);
    }
  }

  initHeader(headerText) {
    this.header = utils.createHeader(headerText, 'CodeMirror-hints-subheader');

    this.container.appendChild(this.header);
  }

  setList(list, selectedHintIndex = -1) {
    this.clearItemsList();
    this.itemsOptions = list;
    this.setSelectedHintIndex(selectedHintIndex);

    this.itemsOptions.forEach((currentListItem, index) => {
      this.listContainer.appendChild(this.createListItem(currentListItem, index));
    });

    this.setupListScrollingPadding();
  }

  createListItem(itemOptions, index) {
    const listItemElement = document.createElement('li');
    const className = HINT_ELEMENT_CLASS + (this.isSelectedByIndex(index) ? utils.addIndentToEditorRules(ACTIVE_HINT_ELEMENT_CLASS, 'before') : '');

    listItemElement.className = itemOptions.className ? `${itemOptions.className} ${className}` : className;

    const displayText = itemOptions.displayText || utils.getText(itemOptions);

    listItemElement.appendChild(this.createListItemContent(displayText, itemOptions));
    listItemElement.hintId = index;

    return listItemElement;
  }

  createListItemContent(displayText) {
    return document.createTextNode(displayText);
  }

  clearItemsList() {
    this.defaultSelectedHintIndex = 0;
    this.setSelectedHintIndex(this.defaultSelectedHintIndex);
    this.itemsOptions = [];

    while (this.listContainer.firstChild) {
      this.listContainer.removeChild(this.listContainer.firstChild);
    }
  }

  setupListScrollingPadding() {
    if (this.listContainer.scrollHeight > this.listContainer.clientHeight + 1) {
      for (let node = this.listContainer.firstChild; node; node = node.nextSibling) {
        node.style.paddingRight = `${this.cm.display.nativeBarWidth}px`;
      }
    }
  }

  getListNodeAt(index) {
    return this.listContainer.childNodes[index];
  }

  calculateNextHintIndex(nextActiveHintIndex, avoidWrap) {
    const itemsOptionsSize = this.listNodes.length;
    let nextIndex = nextActiveHintIndex;

    if (nextIndex >= itemsOptionsSize) {
      nextIndex = avoidWrap ? itemsOptionsSize - 1 : 0;
    } else if (nextIndex < 0) {
      nextIndex = avoidWrap ? 0 : itemsOptionsSize - 1;
    }

    return nextIndex;
  }

  changeActive(nextIndex) {
    let hintNode = this.getListNodeAt(this.selectedHintIndex);

    if (hintNode) {
      hintNode.classList.toggle(ACTIVE_HINT_ELEMENT_CLASS, false);
    }

    this.setSelectedHintIndex(nextIndex);
    hintNode = this.getListNodeAt(this.selectedHintIndex);

    if (!hintNode) return;

    hintNode.classList.toggle(ACTIVE_HINT_ELEMENT_CLASS, true);

    if (hintNode.offsetTop < this.listContainer.scrollTop) {
      this.listContainer.scrollTop = hintNode.offsetTop - 3;
    } else if (hintNode.offsetTop + hintNode.offsetHeight > this.listContainer.scrollTop + this.listContainer.clientHeight) {
      this.listContainer.scrollTop = hintNode.offsetTop + hintNode.offsetHeight - this.listContainer.clientHeight + 3;
    }
  }

  setSelectedHintIndex(index) {
    this.selectedHintIndex = index;
  }

  get listNodes() {
    return Array.from(this.listContainer.childNodes);
  }

  isSelectedByIndex(index) {
    return this.selectedHintIndex === index;
  }
}

export default HintSection;
