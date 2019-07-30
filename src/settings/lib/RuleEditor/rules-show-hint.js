/* eslint-disable */

/* fork of Codemirror's show-hint addon */
// eslint-disable
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function (mod) {
  if (typeof exports === 'object' && typeof module === 'object') // CommonJS
  { mod(require('codemirror')); } else if (typeof define === 'function' && define.amd) // AMD
  { define(['codemirror'], mod); } else // Plain browser env
  { mod(CodeMirror); }
}((CodeMirror) => {
  const HINT_ELEMENT_CLASS = 'CodeMirror-hint';
  const ACTIVE_HINT_ELEMENT_CLASS = 'CodeMirror-hint-active';

  // This is the old interface, kept around for now to stay
  // backwards-compatible.
  CodeMirror.showHint = function (cm, getHints, options) {
    if (!getHints) return cm.showHint(options);
    if (options && options.async) getHints.async = true;
    const newOpts = { hint: getHints };
    if (options) for (const prop in options) newOpts[prop] = options[prop];
    return cm.showHint(newOpts);
  };

  CodeMirror.defineExtension('showHint', function (options) {
    options = parseOptions(this, this.getCursor('start'), options);
    const selections = this.listSelections();
    if (selections.length > 1) return;
    // By default, don't allow completion when something is selected.
    // A hint function can have a `supportsSelection` property to
    // indicate that it can handle selections.
    if (this.somethingSelected()) {
      if (!options.hint.supportsSelection) return;
      // Don't try with cross-line selections
      for (let i = 0; i < selections.length; i++) if (selections[i].head.line != selections[i].anchor.line) return;
    }

    if (this.state.completionActive) this.state.completionActive.close();
    const completion = this.state.completionActive = new Completion(this, options);
    if (!completion.options.hint) return;

    CodeMirror.signal(this, 'startCompletion', this);
    completion.update(true);
  });

  function Completion(cm, options) {
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
    }

    cm.on('cursorActivity', this.activityFunc = () => {
      this.clearCursorActivityTimeout();

      // The timeout is needed to display the hint using the actual heights of the rendered lines
      // (after updateHeightsInViewport is executed)
      this.cursorActivityTimeoutId = setTimeout(() => {
        this.cursorActivity()
      }, 0);
    });
  }

  const requestAnimationFrame = window.requestAnimationFrame || function (fn) {
    return setTimeout(fn, 1000 / 60);
  };
  const cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;

  Completion.prototype = {
    close() {
      if (!this.active()) return;
      this.cm.state.completionActive = null;
      this.tick = null;

      this.clearCursorActivityTimeout();
      this.cm.off('cursorActivity', this.activityFunc);

      if (this.widget && this.data) CodeMirror.signal(this.data, 'close');
      if (this.widget) this.widget.close();
      CodeMirror.signal(this.cm, 'endCompletion', this.cm);
    },

    active() {
      return this.cm.state.completionActive == this;
    },

    pick(data, i) {
      const completion = data.sections[this.widget.currentSectionIndex].list[i];

      if (completion.hint) {
        completion.hint(this.cm, data, completion);
      } else {
        this.cm.replaceRange(getText(completion), completion.from || data.from,
          completion.to || data.to, 'complete');
      }
      CodeMirror.signal(data, 'pick', completion);
      this.close();
    },

    cursorActivity() {
      if (this.debounce) {
        cancelAnimationFrame(this.debounce);
        this.debounce = 0;
      }

      const pos = this.cm.getCursor();
      const line = this.cm.getLine(pos.line);

      if (pos.line != this.startPos.line || line.length - pos.ch != this.startLen - this.startPos.ch ||
          pos.ch < this.startPos.ch || this.cm.somethingSelected() ||
          (pos.ch && this.options.closeCharacters.test(line.charAt(pos.ch - 1)))) {
        this.close();
      } else {
        const self = this;
        this.debounce = requestAnimationFrame(() => { self.update(); });
        if (this.widget) this.widget.disable();
      }
    },

    update(first) {
      if (this.tick == null) return;

      const self = this;
      const myTick = ++this.tick;

      fetchHints(this.options.hint, this.cm, this.options, (data) => {
        if (self.tick == myTick) self.finishUpdate(data, first);
      });
    },

    finishUpdate(data, first) {
      if (this.data) CodeMirror.signal(this.data, 'update');

      const picked = (this.widget && this.widget.picked) || (first && this.options.completeSingle);
      if (this.widget) this.widget.close();

      if (data && this.data && isNewCompletion(this.data, data)) return;
      this.data = data;

      if (data && data.sections.length && data.sections[0].list.length) {
        if (picked && data.sections.length === 1 && data.sections[0].list.length == 1) {
          this.pick(data, 0);
        } else {
          this.widget = new Widget(this, data);
          CodeMirror.signal(data, 'shown');
        }
      }
    }
  };

  function isNewCompletion(old, nw) {
    const moved = CodeMirror.cmpPos(nw.from, old.from);
    return moved > 0 && old.to.ch - old.from.ch != nw.to.ch - nw.from.ch;
  }

  function parseOptions(cm, pos, options) {
    const editor = cm.options.hintOptions;
    const out = {};
    let prop;

    for (prop in defaultOptions) {
      out[prop] = defaultOptions[prop];
    }

    if (editor) {
      for (prop in editor) {
        if (editor[prop] !== undefined) out[prop] = editor[prop];
      }
    }

    if (options) {
      for (prop in options) {
        if (options[prop] !== undefined) out[prop] = options[prop];
      }
    }

    if (out.hint.resolve) out.hint = out.hint.resolve(cm, pos);

    return out;
  }

  function getText(completion) {
    return typeof completion === 'string' ? completion : completion.text;
  }

  function buildKeyMap(completion, handle) {
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
    const ourMap = custom ? {} : baseMap;
    function addBinding(key, val) {
      let bound;
      if (typeof val !== 'string') bound = function (cm) { return val(cm, handle); };
      // This mechanism is deprecated
      else if (baseMap.hasOwnProperty(val)) bound = baseMap[val];
      else bound = val;
      ourMap[key] = bound;
    }
    let key;

    if (custom) {
      for (key in custom) { if (custom.hasOwnProperty(key)) addBinding(key, custom[key]); }
    }
    const extra = completion.options.extraKeys;
    if (extra) {
      for (key in extra) { if (extra.hasOwnProperty(key)) addBinding(key, extra[key]); }
    }

    return ourMap;
  }

  function getHintElement(hintsElement, el) {
    while (el && el != hintsElement) {
      if (el.nodeName.toUpperCase() === 'LI' && el.parentNode == hintsElement) return el;
      el = el.parentNode;
    }
  }

  function Widget(completion, data) {
    this.completion = completion;
    this.data = data;
    this.picked = false;
    const widget = this;
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

    const completions = data.sections[this.currentSectionIndex].list;
    const cm = completion.cm;

    cm.addKeyMap(this.keyMap = buildKeyMap(completion, {
      moveFocus(n, avoidWrap) {
        const selectedHintIndex = widget.getSelectedHintInCurrentSection();

        widget.changeActive(selectedHintIndex + n, avoidWrap);
      },
      setFocus(n) { widget.changeActive(n); },
      menuSize() { return widget.screenAmount(); },
      length: completions.length,
      close() { completion.close(); },
      pick() { widget.pick(); },
      data
    }));

    if (completion.options.closeOnUnfocus) {
      let closingOnBlur;
      cm.on('blur', this.onBlur = function () { closingOnBlur = setTimeout(() => { completion.close(); }, 100); });
      cm.on('focus', this.onFocus = function () { clearTimeout(closingOnBlur); });
    }

    const startScroll = cm.getScrollInfo();

    cm.on('scroll', this.onScroll = () => {
      const curScroll = cm.getScrollInfo();
      const editor = cm.getWrapperElement().getBoundingClientRect();
      const newTop = this.position.top + startScroll.top - curScroll.top;
      let point = newTop - (window.pageYOffset || (document.documentElement || document.body).scrollTop);

      if (!this.isBelow) point += this.container.offsetHeight;

      if (point <= editor.top || point >= editor.bottom) return completion.close();

      this.container.style.top = newTop + 'px';
      this.container.style.left = (this.position.left + startScroll.left - curScroll.left) + 'px';
    });

    CodeMirror.on(this.container, 'dblclick', (e) => {
      const t = getHintElement(this.sections[this.currentSectionIndex].listContainer, e.target);

      if (t && t.hintId != null) {
        widget.changeActive(t.hintId);
        widget.pick();
      }
    });

    CodeMirror.on(this.container, 'click', (e) => {
      const t = getHintElement(this.sections[this.currentSectionIndex].listContainer, e.target);

      if (t && t.hintId != null) {
        widget.changeActive(t.hintId);

        if (completion.options.completeOnSingleClick) {
          widget.pick();
        }
      }
    });

    CodeMirror.on(this.container, 'mousedown', () => {
      setTimeout(() => { cm.focus(); }, 20);
    });

    CodeMirror.signal(data, 'select', completions[0], this.sections[this.currentSectionIndex].getListNode(0));

    return true;
  }

  Widget.prototype = {
    getSelectedHintInCurrentSection() {
      return this.sections[this.currentSectionIndex].selectedHintIndex;
    },
    initContainers() {
      this.container = createInitDiv('CodeMirror-hints');
      this.sectionsContainer = createInitDiv('CodeMirror-hints-sections-container');

      if (this.data.header) {
        this.container.appendChild(createHeader(this.data.header, 'CodeMirror-hints-header'));
      }

      this.container.appendChild(this.sectionsContainer);
    },

    initHintSections() {
      this.sections = [];

      this.data.sections.forEach((section) => {
        const newHintSection = new HintSection(section, this.completion.cm);

        this.sections.push(newHintSection);
        this.sectionsContainer.appendChild(newHintSection.container);
      });
    },

    updatePosition() {
      const cm = this.completion.cm;
      let cursorPosition = cm.cursorCoords(this.completion.options.alignWithWord ? this.data.from : null);
      this.position.left = cursorPosition.left;
      this.position.top = cursorPosition.bottom;

      this.container.style.left = this.position.left + 'px';
      this.container.style.top = this.position.top + 'px';

      // If we're at the edge of the screen, then we want the menu to appear on the left of the cursor.
      const winW = window.innerWidth || Math.max(document.body.offsetWidth, document.documentElement.offsetWidth);
      const winH = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);

      let box = this.container.getBoundingClientRect();
      const overlapY = box.bottom - winH;

      if (overlapY > 0) {
        const height = box.bottom - box.top;
        const cursorTop = cursorPosition.top - (cursorPosition.bottom - box.top);

        if (cursorTop - height > 0) { // Fits above cursor
          this.position.top = cursorPosition.top - height;
          this.container.style.top = this.position.top + 'px';
          this.isBelow = false;
        } else if (height > winH) {
          this.container.style.height = (winH - 5) + 'px';
          this.position.top = cursorPosition.bottom - box.top;
          this.container.style.top = top + 'px';
          const cursor = cm.getCursor();

          if (this.data.from.ch != cursor.ch) {
            cursorPosition = cm.cursorCoords(cursor);
            this.position.left = cursorPosition.left;
            this.container.style.left = this.position.left + 'px';
            box = this.container.getBoundingClientRect();
          }
        }
      }

      let overlapX = box.right - winW;

      if (overlapX > 0) {
        if (box.right - box.left > winW) {
          this.container.style.width = (winW - 5) + 'px';
          overlapX -= (box.right - box.left) - winW;
        }

        this.position.left = cursorPosition.left - overlapX;
        this.container.style.left = this.position.left + 'px';
      }
    },

    close() {
      if (this.completion.widget != this) return;

      this.completion.widget = null;

      if (this.container.parentNode) {
        this.container.parentNode.removeChild(this.container);
      }

      this.completion.cm.removeKeyMap(this.keyMap);
      const cm = this.completion.cm;

      if (this.completion.options.closeOnUnfocus) {
        cm.off('blur', this.onBlur);
        cm.off('focus', this.onFocus);
      }

      cm.off('scroll', this.onScroll);
    },

    disable() {
      this.completion.cm.removeKeyMap(this.keyMap);
      const widget = this;
      this.keyMap = { Enter() { widget.picked = true; } };
      this.completion.cm.addKeyMap(this.keyMap);
    },

    pick() {
      const selectedHintIndex = this.getSelectedHintInCurrentSection();
      const currentItemOptions = this.data.sections[this.currentSectionIndex].list[selectedHintIndex];

      if (selectedHintIndex === -1) return;

      if (!currentItemOptions.inactive) {
        if (this.currentSectionIndex < this.data.sections.length - 1) {
          this.changeSection();
        } else {
          this.completion.pick(this.data, selectedHintIndex);
        }
      }
    },

    changeSection() {
      this.setupNextSectionData();
      this.currentSectionIndex++;

      const {
        list,
        selectedHintIndex,
      } = this.data.sections[this.currentSectionIndex];

      this.sections[this.currentSectionIndex].setList(list, selectedHintIndex);
      this.updatePosition();
    },

    setupNextSectionData() {
      const {
        childSection,
        list,
      } = this.data.sections[this.currentSectionIndex];
      const nextSectionData = this.data.sections[this.currentSectionIndex + 1];
      const parentId = list[this.getSelectedHintInCurrentSection()].id;
      nextSectionData.list = CodeMirror.hint.getSubMenuData(this.completion.cm, { childSection, parentId });
    },

    changeActive(nextActiveHintIndex, avoidWrap) {
      const currentSection = this.sections[this.currentSectionIndex];
      const {
        selectedHintIndex,
        itemsOptions,
      } = currentSection;

      currentSection.changeActive(nextActiveHintIndex, avoidWrap);

      CodeMirror.signal(this.data, 'select', itemsOptions[selectedHintIndex], currentSection.getListNode(selectedHintIndex));
    },

    screenAmount() {
      return Math.floor(this.container.clientHeight / this.sections[this.currentSectionIndex].getListNode(0).offsetHeight) || 1;
    }
  };

  function HintSection(sectionOptions, cm) {
    this.cm = cm;
    this.container = createInitDiv('CodeMirror-hints-list');
    this.selectedHintIndex = sectionOptions.selectedHintIndex || 0;
    this.defaultSelectedHintIndex = this.selectedHintIndex;
    this.itemsOptions = sectionOptions.list;

    if (sectionOptions.header) {
      this.container.appendChild(createHeader(sectionOptions.header, 'CodeMirror-hints-subheader'));
    }

    this.listContainer = document.createElement('ul');
    this.container.appendChild(this.listContainer);

    if (sectionOptions.list && sectionOptions.list.length) {
      this.setList(sectionOptions.list, this.defaultSelectedHintIndex);
    }
  }

  HintSection.prototype = {
    setList(list, selectedHintIndex = -1) {
      this.clearItemsList();
      this.itemsOptions  = list;
      this.selectedHintIndex = selectedHintIndex;

      this.itemsOptions.forEach((currentListItem, i) => {
        const listItemElement = this.listContainer.appendChild(document.createElement('li'));
        let className = HINT_ELEMENT_CLASS + (i !== this.selectedHintIndex ? '' : ' ' + ACTIVE_HINT_ELEMENT_CLASS);

        if (currentListItem.className) {
          className = currentListItem.className + ' ' + className;
        }

        listItemElement.className = className;

        if (currentListItem.render) {
          currentListItem.render(listItemElement, data, currentListItem)
        } else {
          listItemElement.appendChild(document.createTextNode(currentListItem.displayText || getText(currentListItem)));
        }

        listItemElement.hintId = i;
      });

      this.setupListScrollingPadding();
    },

    clearItemsList() {
      this.selectedHintIndex = this.defaultSelectedHintIndex;
      this.itemsOptions = [];

      while (this.listContainer.firstChild) {
        this.listContainer.removeChild(this.listContainer.firstChild);
      }
    },

    setupListScrollingPadding() {
      if (this.listContainer.scrollHeight > this.listContainer.clientHeight + 1) {
        for (let node = this.listContainer.firstChild; node; node = node.nextSibling) {
          node.style.paddingRight = this.cm.display.nativeBarWidth + 'px';
        }
      }
    },

    getListNode(index) {
      return this.listContainer.childNodes[index];
    },

    changeActive(nextActiveHintIndex, avoidWrap) {
      if (nextActiveHintIndex >= this.itemsOptions.length) {
        nextActiveHintIndex = avoidWrap ? this.itemsOptions.length - 1 : 0;
      } else if (nextActiveHintIndex < 0) {
        nextActiveHintIndex = avoidWrap ? 0 : this.itemsOptions.length - 1;
      }

      if (this.selectedHintIndex == nextActiveHintIndex) return;

      let node = this.listContainer.childNodes[this.selectedHintIndex];

      if (node) {
        node.className = node.className.replace(' ' + ACTIVE_HINT_ELEMENT_CLASS, '');
      }

      this.selectedHintIndex = nextActiveHintIndex;
      node = this.listContainer.childNodes[this.selectedHintIndex];
      node.className += ' ' + ACTIVE_HINT_ELEMENT_CLASS;

      if (node.offsetTop < this.listContainer.scrollTop) {
        this.listContainer.scrollTop = node.offsetTop - 3;
      } else if (node.offsetTop + node.offsetHeight > this.listContainer.scrollTop + this.listContainer.clientHeight) {
        this.listContainer.scrollTop = node.offsetTop + node.offsetHeight - this.listContainer.clientHeight + 3;
      }
    },
  };

  function createHeader(text, className = '') {
    const header = createInitDiv(className);

    header.innerHTML = text;

    return header;
  }

  function createInitDiv(className = '') {
    const divElement = document.createElement('div');

    divElement.className = className;

    return divElement;
  }

  function applicableHelpers(cm, helpers) {
    if (!cm.somethingSelected()) return helpers;
    const result = [];
    for (let i = 0; i < helpers.length; i++) if (helpers[i].supportsSelection) result.push(helpers[i]);
    return result;
  }

  function fetchHints(hint, cm, options, callback) {
    if (hint.async) {
      hint(cm, callback, options);
    } else {
      const result = hint(cm, options);
      if (result && result.then) result.then(callback);
      else callback(result);
    }
  }

  function resolveAutoHints(cm, pos) {
    const helpers = cm.getHelpers(pos, 'hint');
    let words;

    if (helpers.length) {
      const resolved = function (cm, callback, options) {
        const app = applicableHelpers(cm, helpers);

        function run(i) {
          if (i == app.length) return callback(null);

          fetchHints(app[i], cm, options, (result) => {
            result && result.sections.length > 0 && result.sections[0].list.length > 0 ? callback(result) : run(i + 1);
          });
        }
        run(0);
      };

      resolved.async = true;
      resolved.supportsSelection = true;

      return resolved;
    } else if (words = cm.getHelper(cm.getCursor(), 'hintWords')) {
      return function (cm) { return CodeMirror.hint.fromList(cm, { words }); };
    } else if (CodeMirror.hint.anyword) {
      return function (cm, options) { return CodeMirror.hint.anyword(cm, options); };
    } else {
      return function () {};
    }
  }

  CodeMirror.registerHelper('hint', 'auto', {
    resolve: resolveAutoHints
  });

  CodeMirror.registerHelper('hint', 'fromList', (cm, options) => {
    const cur = cm.getCursor();
    const token = cm.getTokenAt(cur);
    const to = CodeMirror.Pos(cur.line, token.end);
    let term;
    let from;

    if (token.string && /\w/.test(token.string[token.string.length - 1])) {
      term = token.string;
      from = CodeMirror.Pos(cur.line, token.start);
    } else {
      term = '';
      from = to;
    }

    const found = [];

    for (let i = 0; i < options.words.length; i++) {
      const word = options.words[i];
      if (word.slice(0, term.length) == term) found.push(word);
    }

    if (found.length) return { list: found, from, to };
  });

  CodeMirror.commands.autocomplete = CodeMirror.showHint;

  var defaultOptions = {
    hint: CodeMirror.hint.auto,
    completeSingle: true,
    alignWithWord: true,
    closeCharacters: /[\s()\[\]{};:>,]/,
    closeOnUnfocus: true,
    completeOnSingleClick: true,
    container: null,
    customKeys: null,
    extraKeys: null
  };

  CodeMirror.defineOption('hintOptions', null);
}));

// eslint-enable
