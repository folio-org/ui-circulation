import HintSection from './HintSection';
import utils from '../RuleEditor/utils';
import {
  ACTIVE_HINT_ELEMENT_CLASS,
  HINT_ELEMENT_CLASS,
} from '../../../constants';

jest.mock('../RuleEditor/utils', () => ({
  createContainer: jest.fn(() => ({
    appendChild: jest.fn(),
  })),
  createHeader: jest.fn(),
  addIndentToEditorRules: jest.fn(),
  getText: jest.fn(),
}));

describe('HintSection', () => {
  const cm = {};
  const header = 'header text';
  const defaultSectionOptions = {};

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when "sectionOptions" has no data', () => {
    it('should have correct properties', () => {
      const hintSection = new HintSection(defaultSectionOptions, cm);
      const expectedResult = {
        cm,
        container: {
          appendChild: expect.any(Function),
        },
        selectedHintIndex: 0,
        defaultSelectedHintIndex: 0,
        itemsOptions: undefined,
      };

      expect(hintSection).toEqual(expect.objectContaining(expectedResult));
    });
  });

  describe('when "sectionOptions" has data', () => {
    const selectedHintIndex = 1;
    const list = ['test'];
    const sectionOptions = {
      selectedHintIndex,
      list,
      header,
    };

    it('should have correct properties', () => {
      utils.createHeader.mockImplementation(() => header);

      const hintSection = new HintSection(sectionOptions, cm);
      const expectedResult = {
        cm,
        container: {
          appendChild: expect.any(Function),
        },
        selectedHintIndex,
        defaultSelectedHintIndex: 0,
        itemsOptions: list,
        header,
      };

      expect(hintSection).toEqual(expect.objectContaining(expectedResult));
    });
  });

  describe('initHeader', () => {
    const appendChildMock = jest.fn();

    utils.createHeader.mockImplementation(() => header);
    utils.createContainer.mockImplementationOnce(() => ({
      appendChild: appendChildMock,
    }));

    const hintSection = new HintSection(defaultSectionOptions, cm);

    beforeEach(() => {
      hintSection.initHeader(header);
    });

    it('should set "header" property', () => {
      expect(hintSection.header).toBe(header);
    });

    it('should trigger "appendChild" with correct arguments', () => {
      expect(appendChildMock).toHaveBeenCalledWith(header);
    });
  });

  describe('setList', () => {
    const selectedHintIndex = 1;
    const list = ['test'];
    const appendChildMock = jest.fn();

    it('should trigger banch of methods', () => {
      utils.createContainer.mockImplementation(() => ({
        appendChild: appendChildMock,
      }));
      const hintSection = new HintSection(defaultSectionOptions, cm);
      const clearItemsListSpy = jest.spyOn(hintSection, 'clearItemsList');
      const setSelectedHintIndexSpy = jest.spyOn(hintSection, 'setSelectedHintIndex');
      const setupListScrollingPaddingSpy = jest.spyOn(hintSection, 'setupListScrollingPadding');

      hintSection.setList(list, selectedHintIndex);

      expect(clearItemsListSpy).toHaveBeenCalled();
      expect(setSelectedHintIndexSpy).toHaveBeenCalledWith(selectedHintIndex);
      expect(appendChildMock).toHaveBeenCalled();
      expect(setupListScrollingPaddingSpy).toHaveBeenCalled();
    });

    it('should set "itemsOptions" value', () => {
      const hintSection = new HintSection(defaultSectionOptions, cm);

      hintSection.setList(list, selectedHintIndex);

      expect(hintSection.itemsOptions).toEqual(list);
    });

    it('should trigger "setSelectedHintIndex" with default "selectedHintIndex"', () => {
      const hintSection = new HintSection(defaultSectionOptions, cm);
      const setSelectedHintIndexSpy = jest.spyOn(hintSection, 'setSelectedHintIndex');
      const defaultSelectedHintIndex = -1;

      hintSection.setList(list);

      expect(setSelectedHintIndexSpy).toHaveBeenCalledWith(defaultSelectedHintIndex);
    });
  });

  describe('createListItem', () => {
    const createElementMock = jest.fn(() => ({
      className: '',
      appendChild: () => {},
      hintId: '',
    }));
    const hintSection = new HintSection(defaultSectionOptions, cm);

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('when "itemOptions" contains data', () => {
      it('should return element with correct properties', () => {
        jest.spyOn(document, 'createElement').mockImplementationOnce(createElementMock);

        const itemOptions = {
          className: 'class',
          displayText: 'text',
        };
        const index = 1;
        const expectedResult = {
          hintId: index,
          className: `${itemOptions.className} ${HINT_ELEMENT_CLASS}`,
          appendChild: expect.any(Function),
        };

        expect(hintSection.createListItem(itemOptions, index)).toEqual(expectedResult);
      });
    });

    describe('when "itemOptions" does not contain data', () => {
      it('should return element with correct properties', () => {
        jest.spyOn(document, 'createElement').mockImplementationOnce(createElementMock);

        const itemOptions = {};
        const index = 1;
        const expectedResult = {
          hintId: index,
          className: HINT_ELEMENT_CLASS,
          appendChild: expect.any(Function),
        };

        expect(hintSection.createListItem(itemOptions, index)).toEqual(expectedResult);
      });
    });

    describe('when "index" is different from "selectedHintIndex"', () => {
      it('should trigger "addIndentToEditorRules" util', () => {
        jest.spyOn(document, 'createElement').mockImplementationOnce(createElementMock);

        const itemOptions = {};
        const index = 0;
        const testClassName = '-test';
        const expectedResult = {
          hintId: index,
          className: `${HINT_ELEMENT_CLASS}${testClassName}`,
          appendChild: expect.any(Function),
        };

        utils.addIndentToEditorRules.mockImplementationOnce(() => testClassName);

        expect(hintSection.createListItem(itemOptions, index)).toEqual(expectedResult);
      });
    });
  });

  describe('createListItemContent', () => {
    it('should trigger "createTextNode" with correct arguments', () => {
      const createTextNodeMock = jest.fn();
      const displayText = 'text';

      jest.spyOn(document, 'createTextNode').mockImplementationOnce(createTextNodeMock);

      const hintSection = new HintSection(defaultSectionOptions, cm);

      hintSection.createListItemContent(displayText);

      expect(createTextNodeMock).toHaveBeenLastCalledWith(displayText);
    });
  });

  describe('clearItemsList', () => {
    it('should change instance properties', () => {
      const hintSection = new HintSection(defaultSectionOptions, cm);
      const expectedResult = {
        defaultSelectedHintIndex: 0,
        itemsOptions: [],
      };

      hintSection.clearItemsList();

      expect(hintSection).toEqual(expect.objectContaining(expectedResult));
    });
  });

  describe('setupListScrollingPadding', () => {
    const nativeBarWidth = '1';
    const unit = 'px';
    const initialCm = {
      display: {
        nativeBarWidth,
      }
    };
    const initialPadding = '0px';

    it('should not modify right padding', () => {
      jest.spyOn(document, 'createElement').mockImplementationOnce(() => ({
        scrollHeight: 5,
        clientHeight: 6,
        firstChild: {
          style: {
            paddingRight: initialPadding,
          },
        },
        nextSibling: '',
      }));

      const hintSection = new HintSection(defaultSectionOptions, initialCm);

      hintSection.setupListScrollingPadding();

      expect(hintSection.listContainer.firstChild.style.paddingRight).toBe(initialPadding);
    });

    it('should modify right padding', () => {
      const firstChild = {
        style: {
          paddingRight: initialPadding,
        },
      };

      jest.spyOn(document, 'createElement').mockImplementationOnce(() => ({
        scrollHeight: 15,
        clientHeight: 6,
        nextSibling: firstChild,
        firstChild,
      }));

      const hintSection = new HintSection(defaultSectionOptions, initialCm);

      hintSection.setupListScrollingPadding();

      expect(hintSection.listContainer.firstChild.style.paddingRight).toBe(`${nativeBarWidth}${unit}`);
    });
  });

  describe('getListNodeAt', () => {
    it('should return appropriate element', () => {
      const childNode = { test: 'test' };
      const index = 0;

      jest.spyOn(document, 'createElement').mockImplementationOnce(() => ({
        childNodes: [childNode],
      }));

      const hintSection = new HintSection(defaultSectionOptions, cm);

      expect(hintSection.getListNodeAt(index)).toEqual(childNode);
    });
  });

  describe('calculateNextHintIndex', () => {
    const childNodes = [{}, {}];
    const createElementMocked = () => ({
      childNodes,
      appendChild: () => {},
    });

    describe('when "nextIndex" bigger then number of nodes', () => {
      const nextActiveHintIndex = 5;

      it('should return correct index if "avoidWrap" is true', () => {
        jest.spyOn(document, 'createElement').mockImplementationOnce(createElementMocked);

        const avoidWrap = true;
        const expectedResult = childNodes.length - 1;
        const hintSection = new HintSection(defaultSectionOptions, cm);

        expect(
          hintSection.calculateNextHintIndex(nextActiveHintIndex, avoidWrap)
        ).toBe(expectedResult);
      });

      it('should return correct index if "avoidWrap" is false', () => {
        jest.spyOn(document, 'createElement').mockImplementationOnce(createElementMocked);

        const avoidWrap = false;
        const expectedResult = 0;
        const hintSection = new HintSection(defaultSectionOptions, cm);

        expect(
          hintSection.calculateNextHintIndex(nextActiveHintIndex, avoidWrap)
        ).toBe(expectedResult);
      });
    });

    describe('when "nextIndex" bigger then 0 and smaller then number of nodes', () => {
      const nextActiveHintIndex = 1;

      it('should return correct index', () => {
        jest.spyOn(document, 'createElement').mockImplementationOnce(createElementMocked);

        const avoidWrap = true;
        const hintSection = new HintSection(defaultSectionOptions, cm);

        expect(
          hintSection.calculateNextHintIndex(nextActiveHintIndex, avoidWrap)
        ).toBe(nextActiveHintIndex);
      });
    });

    describe('when "nextIndex" smaller then 0', () => {
      const nextActiveHintIndex = -5;

      it('should return correct index if "avoidWrap" is true', () => {
        jest.spyOn(document, 'createElement').mockImplementationOnce(createElementMocked);

        const avoidWrap = true;
        const expectedResult = 0;
        const hintSection = new HintSection(defaultSectionOptions, cm);

        expect(
          hintSection.calculateNextHintIndex(nextActiveHintIndex, avoidWrap)
        ).toBe(expectedResult);
      });

      it('should return correct index if "avoidWrap" is false', () => {
        jest.spyOn(document, 'createElement').mockImplementationOnce(createElementMocked);

        const avoidWrap = false;
        const expectedResult = childNodes.length - 1;
        const hintSection = new HintSection(defaultSectionOptions, cm);

        expect(
          hintSection.calculateNextHintIndex(nextActiveHintIndex, avoidWrap)
        ).toBe(expectedResult);
      });
    });
  });

  describe('changeActive', () => {
    describe('when next "hintNode" is not available', () => {
      const toggleMock = jest.fn();
      const firstChildNode = {
        classList: {
          toggle: toggleMock,
        },
      };
      const nextIndex = 1;
      const createElementMocked = () => ({
        childNodes: [firstChildNode],
      });

      it('should trigger "toggle" with correct arguments', () => {
        jest.spyOn(document, 'createElement').mockImplementationOnce(createElementMocked);

        const hintSection = new HintSection(defaultSectionOptions, cm);

        hintSection.changeActive(nextIndex);

        expect(toggleMock).toHaveBeenCalledWith(ACTIVE_HINT_ELEMENT_CLASS, false);
      });

      it('should return undefined if there is no next node', () => {
        jest.spyOn(document, 'createElement').mockImplementationOnce(createElementMocked);

        const hintSection = new HintSection(defaultSectionOptions, cm);

        expect(hintSection.changeActive(nextIndex)).toBeUndefined();
      });
    });

    describe('when "hintNode.offsetTop" bigger than container "scrollTop"', () => {
      const offsetTop = 10;
      const offsetHeight = 10;
      const scrollTop = 8;
      const clientHeight = 0;
      const firstChildNode = {
        classList: {
          toggle: () => {},
        },
      };
      const lastChildNode = {
        offsetTop,
        offsetHeight,
        classList: {
          toggle: () => {},
        },
      };
      const nextIndex = 1;
      const createElementMocked = () => ({
        scrollTop,
        clientHeight,
        childNodes: [firstChildNode, lastChildNode],
      });

      it('should correctly set "listContainer.scrollTop" value', () => {
        jest.spyOn(document, 'createElement').mockImplementationOnce(createElementMocked);

        const hintSection = new HintSection(defaultSectionOptions, cm);
        const expectedResult = 23;

        hintSection.changeActive(nextIndex);

        expect(hintSection.listContainer.scrollTop).toBe(expectedResult);
      });
    });

    describe('when next "hintNode" is  available', () => {
      const toggleMock = jest.fn();
      const offsetTop = 10;
      const offsetHeight = 10;
      const scrollTop = 20;
      const clientHeight = 0;
      const firstChildNode = {
        classList: {
          toggle: () => {},
        },
      };
      const lastChildNode = {
        offsetTop,
        offsetHeight,
        classList: {
          toggle: toggleMock,
        },
      };
      const nextIndex = 1;
      const createElementMocked = () => ({
        scrollTop,
        clientHeight,
        childNodes: [firstChildNode, lastChildNode],
      });

      it('should trigger "toggle" with correct arguments', () => {
        jest.spyOn(document, 'createElement').mockImplementationOnce(createElementMocked);

        const hintSection = new HintSection(defaultSectionOptions, cm);

        hintSection.changeActive(nextIndex);

        expect(toggleMock).toHaveBeenCalledWith(ACTIVE_HINT_ELEMENT_CLASS, true);
      });

      it('should correctly set "listContainer.scrollTop" value', () => {
        jest.spyOn(document, 'createElement').mockImplementationOnce(createElementMocked);

        const hintSection = new HintSection(defaultSectionOptions, cm);
        const expectedResult = 7;

        hintSection.changeActive(nextIndex);

        expect(hintSection.listContainer.scrollTop).toBe(expectedResult);
      });
    });

    describe('when "clientHeight" has big value', () => {
      const toggleMock = jest.fn();
      const offsetTop = 20;
      const offsetHeight = 10;
      const scrollTop = 10;
      const clientHeight = 200;
      const firstChildNode = {
        classList: {
          toggle: () => {},
        },
      };
      const lastChildNode = {
        offsetTop,
        offsetHeight,
        classList: {
          toggle: toggleMock,
        },
      };
      const nextIndex = 1;
      const createElementMocked = () => ({
        scrollTop,
        clientHeight,
        childNodes: [firstChildNode, lastChildNode],
      });

      it('should not change "listContainer.scrollTop" value', () => {
        jest.spyOn(document, 'createElement').mockImplementationOnce(createElementMocked);

        const hintSection = new HintSection(defaultSectionOptions, cm);

        hintSection.changeActive(nextIndex);

        expect(hintSection.listContainer.scrollTop).toBe(scrollTop);
      });
    });
  });

  describe('setSelectedHintIndex', () => {
    it('should set index to instance', () => {
      const index = 10;
      const hintSection = new HintSection(defaultSectionOptions, cm);

      hintSection.setSelectedHintIndex(index);

      expect(hintSection.selectedHintIndex).toBe(index);
    });
  });

  describe('listNodes', () => {
    it('should return appropriate element', () => {
      const childNodes = [{ test: 'test' }];

      jest.spyOn(document, 'createElement').mockImplementationOnce(() => ({
        childNodes,
      }));

      const hintSection = new HintSection(defaultSectionOptions, cm);

      expect(hintSection.listNodes).toEqual(childNodes);
    });
  });

  describe('isSelectedByIndex', () => {
    it('should return true if indexes are the same', () => {
      const index = 0;
      const hintSection = new HintSection(defaultSectionOptions, cm);

      expect(hintSection.isSelectedByIndex(index)).toBe(true);
    });

    it('should return false if indexes are different', () => {
      const index = 1;
      const hintSection = new HintSection(defaultSectionOptions, cm);

      expect(hintSection.isSelectedByIndex(index)).toBe(false);
    });
  });
});
