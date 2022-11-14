import {
  LAYERS,
  isEditLayer,
  validateUniqueNameById,
} from './utils';

describe('utils', () => {
  describe('isEditLayer', () => {
    it('should return true if layer is edit', () => {
      expect(isEditLayer(LAYERS.EDIT)).toBe(true);
    });

    it('should return false if layer is not edit', () => {
      expect(isEditLayer('any')).toBe(false);
    });

    it('should return false if layer is not provided', () => {
      expect(isEditLayer()).toBe(false);
    });
  });

  describe('validateUniqueNameById', () => {
    const currentName = 'currentName';
    const previousId = 'previousId';
    const getByName = jest.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve({}),
      });
    });
    const selector = 'selector';
    const errorKey = 'errorKey';
    const props = {
      currentName,
      previousId,
      getByName,
      selector,
      errorKey,
    };

    it('should call getByName with currentName', () => {
      validateUniqueNameById(props);

      expect(getByName).toHaveBeenCalledWith(currentName);
    });

    it('should not return error', async () => {
      const getByNameMock = jest.fn(() => {
        return Promise.resolve({
          json: () => Promise.resolve({
            [selector]: [{
              id: previousId,
              name: currentName,
            }],
          }),
        });
      });

      expect(await validateUniqueNameById({
        ...props,
        getByName: getByNameMock,
      })).toBeUndefined();
    });

    it('should return error', async () => {
      const getByNameMock = jest.fn(() => {
        return Promise.resolve({
          json: () => Promise.resolve({
            [selector]: [{
              id: 'notPreviousId',
              name: currentName,
            }],
          }),
        });
      });

      expect(await validateUniqueNameById({
        ...props,
        getByName: getByNameMock,
      })).toEqual(expect.objectContaining({
        props: {
          id: 'ui-circulation.errorKey',
        },
      }));
    });
  });
});
