import getTemplates from './get-templates';

describe('NoticePolicy utils', () => {
  describe('getTemplates', () => {
    const templateWithInvalidCategory = {
      id: 'thirdTestId',
      name: 'thirdTestName',
      category: 'unallowedCategory',
      active: true,
    };
    const inactiveTemplate = {
      id: 'secondTestId',
      name: 'secondTestName',
      category: 'testCategory',
      active: false,
    };
    const validTemplate = {
      id: 'firstTestId',
      name: 'firstTestName',
      category: 'testCategory',
      active: true,
    };
    const mockedCategories = ['testCategory'];
    const transformedTemplate = {
      value: 'firstTestId',
      label: 'firstTestName',
    };

    it('should remove template with invalid category', () => {
      expect(getTemplates([templateWithInvalidCategory], mockedCategories)).toEqual([]);
    });

    it('should remove inactive template', () => {
      expect(getTemplates([inactiveTemplate], mockedCategories)).toEqual([]);
    });

    it('should transform valid template correctly', () => {
      expect(getTemplates([validTemplate], mockedCategories)).toEqual([transformedTemplate]);
    });

    it('should return empty array if templates was not passed', () => {
      expect(getTemplates(undefined, mockedCategories)).toEqual([]);
    });

    it('should return empty array if "allowedCategories" is not passed', () => {
      expect(getTemplates(validTemplate)).toEqual([]);
    });

    it('should process data correctly', () => {
      const dataForTest = [
        templateWithInvalidCategory,
        inactiveTemplate,
        validTemplate,
      ];

      expect(getTemplates(dataForTest, mockedCategories)).toEqual([transformedTemplate]);
    });
  });
});
