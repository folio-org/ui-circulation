// fork of Codemirror's show-hint addon
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

import CodeMirror from 'codemirror'; // eslint-disable-line import/no-extraneous-dependencies
import {
  get,
  isEmpty,
  isString,
  forOwn,
  noop
} from 'lodash';

import {
  ACTIVE_HINT_ELEMENT_CLASS,
  HINT_ELEMENT_CLASS,
} from '../../../constants';

CodeMirror.registerHelper('hint', 'auto', { resolve: resolveAutoHints });

const defaultOptions = {
  hint: CodeMirror.hint.auto,
  completeSingle: true,
  alignWithWord: true,
  closeCharacters: /[\s()[]{};:>,]/,
  closeOnUnfocus: true,
  completeOnSingleClick: true,
  container: null,
  customKeys: null,
  extraKeys: null
};

// This is the old interface, kept around for now to stay backwards-compatible
CodeMirror.showHint = function (cm, getHints, options) {
  if (!getHints) {
    return cm.showHint(options);
  }

  if (options && options.async) getHints.async = true;

  const newOptions = Object.assign({ hint: getHints }, options);

  return cm.showHint(newOptions);
};

CodeMirror.defineExtension('showHint', function (initialOptions) {
  const options = parseOptions(this, this.getCursor('start'), initialOptions);
  const selections = this.listSelections();

  if (selections.length > 1) return;

  // By default, don't allow completion when something is selected.
  // A hint function can have a `supportsSelection` property to
  // indicate that it can handle selections.
  if (this.somethingSelected()) {
    if (!options.hint.supportsSelection) return;

    // Don't try with cross-line selections
    for (let i = 0; i < selections.length; i++) {
      if (selections[i].head.line !== selections[i].anchor.line) return;
    }
  }

  if (this.state.completionActive) this.state.completionActive.close();

  const completion = new Completion(this, options);

  this.state.completionActive = completion;

  if (!completion.options.hint) return;

  CodeMirror.signal(this, 'startCompletion', this);
  completion.update(true);
});

class Completion {
  constructor(cm, options) {
    this.cm = cm;
    this.options = options;
    this.widget = null;
    this.debounce = 0;
    this.tick = 0;
    this.startPos = this.cm.getCursor('start');
    this.startLen = this.cm.getLine(this.startPos.line).length - this.cm.getSelection().length;

    this.clearCursorActivityTimeout = () => {
      if (this.cursorActivityTimeoutId) {
        clearTimeout(this.cursorActivityTimeoutId);
        this.timeoutId = null;
      }
    };

    cm.on('cursorActivity', this.handleCursorActivity = () => {
      this.clearCursorActivityTimeout();

      // The timeout is needed to display the hint using the actual heights of the rendered lines
      // (after updateHeightsInViewport is executed)
      this.cursorActivityTimeoutId = setTimeout(this.cursorActivity, 0);
    });
  }

  close = () => {
    if (!this.active()) return;

    this.cm.state.completionActive = null;
    this.tick = null;

    this.clearCursorActivityTimeout();
    this.cm.off('cursorActivity', this.handleCursorActivity);

    if (this.widget && this.data) CodeMirror.signal(this.data, 'close');
    if (this.widget) this.widget.close();

    CodeMirror.signal(this.cm, 'endCompletion', this.cm);
  };

  active() {
    return this.cm.state.completionActive === this;
  }

  pick(data, i) {
    const completion = data.sections[this.widget.currentSectionIndex].list[i];

    if (completion.hint) {
      completion.hint(this.cm, data, completion);
    } else {
      this.cm.replaceRange(
        getText(completion),
        completion.from || data.from,
        completion.to || data.to,
        'complete'
      );
    }

    CodeMirror.signal(data, 'pick', completion);
    this.close();
  }

  cursorActivity = () => {
    if (this.debounce) {
      cancelAnimationFrame(this.debounce);
      this.debounce = 0;
    }

    const pos = this.cm.getCursor();
    const line = this.cm.getLine(pos.line);

    if (pos.line !== this.startPos.line || line.length - pos.ch !== this.startLen - this.startPos.ch ||
      pos.ch < this.startPos.ch || this.cm.somethingSelected() ||
      (pos.ch && this.options.closeCharacters.test(line.charAt(pos.ch - 1)))) {
      this.close();
    } else {
      this.debounce = requestAnimationFrame(() => this.update());

      if (this.widget) this.widget.disable();
    }
  };

  update(first) {
    if (this.tick == null) return;

    const updatedTick = ++this.tick;

    fetchHints(this.options.hint, this.cm, this.options, data => {
      if (this.tick === updatedTick) this.finishUpdate(data, first);
    });
  }

  finishUpdate(data, first) {
    if (this.data) CodeMirror.signal(this.data, 'update');

    const picked = (this.widget && this.widget.picked) || (first && this.options.completeSingle);

    if (this.widget) this.widget.close();

    if (data && this.data && this.isNew(this.data, data)) return;

    this.data = data;

    if (!isEmpty(get(data, 'sections.0.list'))) {
      if (picked && data.sections.length === 1 && data.sections[0].list.length === 1) {
        this.pick(data, 0);
      } else {
        this.widget = new Widget(this, data);
        CodeMirror.signal(data, 'shown');
      }
    }
  }

  isNew(prevValue, newValue) {
    const moved = CodeMirror.cmpPos(newValue.from, prevValue.from) > 0;
    const characterRangeChanged = prevValue.to.ch - prevValue.from.ch !== newValue.to.ch - newValue.from.ch;

    return moved && characterRangeChanged;
  }
}

function parseOptions(cm, pos, options) {
  const editor = cm.options.hintOptions;
  const parsedOptions = Object.assign({}, defaultOptions, editor, options);

  if (parsedOptions.hint.resolve) {
    parsedOptions.hint = parsedOptions.hint.resolve(cm, pos);
  }

  return parsedOptions;
}

function getText(completion) {
  return isString(completion) ? completion : completion.text;
}

class Widget {
  static buildKeyMap(completion, handle) {
    const baseMap = {
      Up() { handle.moveFocus(-1); },
      Down() { handle.moveFocus(1); },
      PageUp() { handle.moveFocus(-handle.menuSize() + 1, true); },
      PageDown() { handle.moveFocus(handle.menuSize() - 1, true); },
      Home() { handle.setFocus(0); },
      End() { handle.setFocus(handle.length - 1); },
      Enter: handle.pick,
      Tab: handle.pick,
      Esc: handle.close
    };
    const custom = completion.options.customKeys;
    const keyMap = custom ? {} : baseMap;

    function addBinding(key, val) {
      let bound;

      if (!isString(val)) {
        bound = function (cm) { return val(cm, handle); };
      } else if (Object.prototype.hasOwnProperty.call(baseMap, val)) {
        // This mechanism is deprecated
        bound = baseMap[val];
      } else {
        bound = val;
      }

      keyMap[key] = bound;
    }

    if (custom) {
      forOwn(custom, (value, key) => addBinding(key, value));
    }

    const extra = completion.options.extraKeys;

    if (extra) {
      forOwn(extra, (value, key) => addBinding(key, value));
    }

    return keyMap;
  }

  static getHintElement(hintsContainer, targetElement) {
    let currentSearchElement = targetElement;

    while (currentSearchElement && currentSearchElement !== hintsContainer) {
      if (currentSearchElement.nodeName.toUpperCase() === 'LI' && currentSearchElement.parentNode === hintsContainer) {
        return currentSearchElement;
      }

      currentSearchElement = currentSearchElement.parentNode;
    }
  }

  constructor(completion, data) {
    this.completion = completion;
    this.data = data;
    this.picked = false;
    this.currentSectionIndex = 0;
    this.isBelow = true;
    this.position = {
      left: 0,
      top: 0,
    };

    this.initContainers();
    this.initHintSections();
    (completion.options.container || document.body).appendChild(this.container);
    this.updatePosition();

    const completions = this.getCurrentSection(data).list;
    const cm = completion.cm;

    cm.addKeyMap(this.keyMap = Widget.buildKeyMap(completion, {
      moveFocus: (index, avoidWrap) => {
        this.changeActive(this.getCurrentSection().selectedHintIndex + index, avoidWrap);
      },
      setFocus: this.changeActive,
      menuSize: this.calculateMenuSize,
      pick: this.pick,
      close: completion.close,
      length: completions.length,
      data
    }));

    if (completion.options.closeOnUnfocus) {
      let closingOnBlur;

      cm.on('blur', this.handleBlur = () => { closingOnBlur = setTimeout(completion.close, 100); });
      cm.on('focus', this.handleFocus = () => { clearTimeout(closingOnBlur); });
    }

    const startScroll = cm.getScrollInfo();

    cm.on('scroll', this.handleScroll = () => {
      const curScroll = cm.getScrollInfo();
      const editor = cm.getWrapperElement().getBoundingClientRect();
      const newTop = this.position.top + startScroll.top - curScroll.top;
      let point = newTop - (window.pageYOffset || (document.documentElement || document.body).scrollTop);

      if (!this.isBelow) point += this.container.offsetHeight;

      if (point <= editor.top || point >= editor.bottom) {
        return completion.close();
      }

      this.container.style.top = `${newTop}px`;
      this.container.style.left = `${this.position.left + startScroll.left - curScroll.left}px`;
    });

    CodeMirror.on(this.container, 'dblclick', e => {
      const hint = Widget.getHintElement(this.getCurrentSection().listContainer, e.target);

      if (hint && hint.hintId != null) {
        this.changeActive(hint.hintId);
        this.pick();
      }
    });

    CodeMirror.on(this.container, 'click', e => {
      const hint = Widget.getHintElement(this.getCurrentSection().listContainer, e.target);

      if (hint && hint.hintId != null) {
        this.changeActive(hint.hintId);

        if (completion.options.completeOnSingleClick) {
          this.pick();
        }
      }
    });

    CodeMirror.on(this.container, 'mousedown', () => setTimeout(() => cm.focus(), 20));

    CodeMirror.signal(data, 'select', completions[0], this.getCurrentSection().getListNodeAt(0));
  }

  getSelectedHintInCurrentSection() {
    return this.getCurrentSection().selectedHintIndex;
  }

  getCurrentSection(context = this) {
    return context.sections[this.currentSectionIndex];
  }

  initContainers() {
    this.container = createContainer('CodeMirror-hints');
    this.sectionsContainer = createContainer('CodeMirror-hints-sections-container');

    if (this.data.header) {
      this.container.appendChild(createHeader(this.data.header, 'CodeMirror-hints-header'));
    }

    this.container.appendChild(this.sectionsContainer);
  }

  initHintSections() {
    this.sections = this.data.sections.reduce((memo, section) => {
      const newHintSection = new HintSection(section, this.completion.cm);

      this.sectionsContainer.appendChild(newHintSection.container);

      return memo.concat(newHintSection);
    }, []);
  }

  updatePosition() {
    const cm = this.completion.cm;
    let cursorPosition = cm.cursorCoords(this.completion.options.alignWithWord ? this.data.from : null);
    this.position.left = cursorPosition.left;
    this.position.top = cursorPosition.bottom;

    this.container.style.left = `${this.position.left}px`;
    this.container.style.top = `${this.position.top}px`;

    // if hint is at the edge of the screen, then the menu should appear on the left of the cursor
    const winW = window.innerWidth || Math.max(document.body.offsetWidth, document.documentElement.offsetWidth);
    const winH = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);

    let box = this.container.getBoundingClientRect();
    const overlapY = box.bottom - winH;

    if (overlapY > 0) {
      const height = box.bottom - box.top;
      const cursorTop = cursorPosition.top - (cursorPosition.bottom - box.top);

      if (cursorTop - height > 0) { // Fits above cursor
        this.position.top = cursorPosition.top - height;
        this.container.style.top = `${this.position.top}px`;
        this.isBelow = false;
      } else if (height > winH) {
        this.container.style.height = `${winH - 5}px`;
        this.position.top = cursorPosition.bottom - box.top;
        this.container.style.top = `${this.position.top}px`;
        const cursor = cm.getCursor();

        if (this.data.from.ch !== cursor.ch) {
          cursorPosition = cm.cursorCoords(cursor);
          this.position.left = cursorPosition.left;
          this.container.style.left = `${this.position.left}px`;
          box = this.container.getBoundingClientRect();
        }
      }
    }

    let overlapX = box.right - winW;

    if (overlapX > 0) {
      if (box.right - box.left > winW) {
        this.container.style.width = `${winW - 5}px`;
        overlapX -= (box.right - box.left) - winW;
      }

      this.position.left = cursorPosition.left - overlapX;
      this.container.style.left = `${this.position.left}px`;
    }
  }

  close() {
    if (this.completion.widget !== this) return;

    this.completion.widget = null;

    if (this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }

    const {
      cm,
      options: { closeOnUnfocus }
    } = this.completion;

    cm.removeKeyMap(this.keyMap);

    if (closeOnUnfocus) {
      cm.off('blur', this.handleBlur);
      cm.off('focus', this.handleFocus);
    }

    cm.off('scroll', this.handleScroll);
  }

  disable() {
    this.completion.cm.removeKeyMap(this.keyMap);
    this.keyMap = { Enter: () => { this.picked = true; } };
    this.completion.cm.addKeyMap(this.keyMap);
  }

  pick = () => {
    const selectedHintIndex = this.getSelectedHintInCurrentSection();
    const currentItemOptions = this.getCurrentSection(this.data).list[selectedHintIndex];

    if (selectedHintIndex === -1 || currentItemOptions.inactive) return;

    if (this.currentSectionIndex < this.data.sections.length - 1) {
      this.changeSection();
    } else {
      this.completion.pick(this.data, selectedHintIndex);
    }
  };

  changeSection() {
    this.setupNextSectionData();
    this.currentSectionIndex++;

    const {
      list,
      selectedHintIndex,
    } = this.getCurrentSection(this.data);

    this.getCurrentSection().setList(list, selectedHintIndex);
    this.updatePosition();
  }

  setupNextSectionData() {
    const {
      childSection,
      list,
    } = this.data.sections[this.currentSectionIndex];
    const nextSectionData = this.data.sections[this.currentSectionIndex + 1];
    const parentId = list[this.getSelectedHintInCurrentSection()].id;

    nextSectionData.list = CodeMirror.hint.getSubMenuData(this.completion.cm, { childSection, parentId });
  }

  changeActive = (nextActiveHintIndex, avoidWrap) => {
    const currentSection = this.getCurrentSection();
    const {
      selectedHintIndex,
      itemsOptions,
    } = currentSection;

    currentSection.changeActive(nextActiveHintIndex, avoidWrap);

    CodeMirror.signal(
      this.data,
      'select',
      itemsOptions[selectedHintIndex],
      currentSection.getListNodeAt(selectedHintIndex)
    );
  };

  calculateMenuSize() {
    return Math.floor(this.container.clientHeight / this.getCurrentSection().getListNodeAt(0).offsetHeight) || 1;
  }
}

class HintSection {
  constructor(sectionOptions, cm) {
    this.cm = cm;
    this.container = createContainer('CodeMirror-hints-list');
    this.setSelectedHintIndex(sectionOptions.selectedHintIndex || 0);
    this.defaultSelectedHintIndex = this.selectedHintIndex;
    this.itemsOptions = sectionOptions.list;

    if (sectionOptions.header) {
      this.container.appendChild(createHeader(sectionOptions.header, 'CodeMirror-hints-subheader'));
    }

    this.listContainer = document.createElement('ul');
    this.container.appendChild(this.listContainer);

    if (!isEmpty(get(sectionOptions, 'list'))) {
      this.setList(sectionOptions.list, this.defaultSelectedHintIndex);
    }
  }

  setList(list, selectedHintIndex = -1) {
    this.clearItemsList();
    this.itemsOptions = list;
    this.setSelectedHintIndex(selectedHintIndex);

    this.itemsOptions.forEach((currentListItem, index) => {
      const listItemElement = this.listContainer.appendChild(document.createElement('li'));
      const className = HINT_ELEMENT_CLASS + (this.isSelectedByIndex(index) ? ` ${ACTIVE_HINT_ELEMENT_CLASS}` : '');

      listItemElement.className = currentListItem.className ? `${currentListItem.className} ${className}` : className;
      listItemElement.appendChild(document.createTextNode(currentListItem.displayText || getText(currentListItem)));
      listItemElement.hintId = index;
    });

    this.setupListScrollingPadding();
  }

  clearItemsList() {
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

  changeActive(nextActiveHintIndex, avoidWrap) {
    const itemsOptionsSize = this.itemsOptions.length;
    let nextIndex = nextActiveHintIndex;

    if (nextIndex >= itemsOptionsSize) {
      nextIndex = avoidWrap ? itemsOptionsSize - 1 : 0;
    } else if (nextIndex < 0) {
      nextIndex = avoidWrap ? 0 : itemsOptionsSize - 1;
    }

    if (this.isSelectedByIndex(nextIndex)) return;

    let hintNode = this.getListNodeAt(this.selectedHintIndex);

    if (hintNode) {
      hintNode.className = hintNode.className.replace(` ${ACTIVE_HINT_ELEMENT_CLASS}`, '');
    }

    this.setSelectedHintIndex(nextIndex);
    hintNode = this.listContainer.childNodes[this.selectedHintIndex];
    hintNode.className += ` ${ACTIVE_HINT_ELEMENT_CLASS}`;

    if (hintNode.offsetTop < this.listContainer.scrollTop) {
      this.listContainer.scrollTop = hintNode.offsetTop - 3;
    } else if (hintNode.offsetTop + hintNode.offsetHeight > this.listContainer.scrollTop + this.listContainer.clientHeight) {
      this.listContainer.scrollTop = hintNode.offsetTop + hintNode.offsetHeight - this.listContainer.clientHeight + 3;
    }
  }

  setSelectedHintIndex(index) {
    this.selectedHintIndex = index;
  }

  isSelectedByIndex(index) {
    return this.selectedHintIndex === index;
  }
}

function createHeader(text, className = '') {
  const header = createContainer(className);

  header.innerHTML = text;

  return header;
}

function createContainer(className = '') {
  const divElement = document.createElement('div');

  divElement.className = className;

  return divElement;
}

function getApplicableHelpers(cm, helpers) {
  if (!cm.somethingSelected()) {
    return helpers;
  }

  return helpers.filter(helper => helper.supportsSelection);
}

function fetchHints(hint, cm, options, callback) {
  if (hint.async) {
    return hint(cm, callback, options);
  }

  const result = hint(cm, options);
  const isPromise = result && result.then;

  if (isPromise) {
    return result.then(callback);
  }

  return callback(result);
}

function resolveAutoHints(cm, pos) {
  const helpers = cm.getHelpers(pos, 'hint');

  if (!isEmpty(helpers)) {
    const resolved = function (codeMirror, callback, options) {
      const applicableHelpers = getApplicableHelpers(codeMirror, helpers);

      function initHelpers(helperIndex) {
        if (helperIndex === applicableHelpers.length) {
          return callback(null);
        }

        fetchHints(applicableHelpers[helperIndex], codeMirror, options, result => {
          return isEmpty(get(result, 'sections.0.list')) ? initHelpers(helperIndex + 1) : callback(result);
        });
      }

      initHelpers(0);
    };

    resolved.async = true;
    resolved.supportsSelection = true;

    return resolved;
  }

  const words = cm.getHelper(cm.getCursor(), 'hintWords');

  if (words) {
    return function (codeMirror) { return CodeMirror.hint.fromList(codeMirror, { words }); };
  }

  if (CodeMirror.hint.anyword) {
    return function (codeMirror, options) { return CodeMirror.hint.anyword(codeMirror, options); };
  }

  return noop;
}

CodeMirror.registerHelper('hint', 'fromList', (cm, options) => {
  const cursor = cm.getCursor();
  const tokenAtCursor = cm.getTokenAt(cursor);
  const to = CodeMirror.Pos(cursor.line, tokenAtCursor.end);
  const tokenAtCursorValid = tokenAtCursor.string && /\w/.test(tokenAtCursor.string[tokenAtCursor.string.length - 1]);
  const term = tokenAtCursorValid ? tokenAtCursor.string : '';
  const from = tokenAtCursorValid ? CodeMirror.Pos(cursor.line, tokenAtCursor.start) : to;
  const found = options.words.filter(word => word.slice(0, term.length) === term);

  if (!isEmpty(found)) {
    return {
      list: found,
      from,
      to
    };
  }
});

CodeMirror.commands.autocomplete = CodeMirror.showHint;

CodeMirror.defineOption('hintOptions', null);
