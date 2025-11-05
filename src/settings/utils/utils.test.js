import {
  LAYERS,
  isAddLayer,
  isEditLayer,
  validateUniqueNameById,
  getRecordName,
  getConsortiumTlrPermission,
  getLastRecordValue,
  getExcludeTenants,
  getNormalizeData,
  getDataOptions,
} from './utils';
import {
  CONSORTIUM_TITLE_LEVEL_REQUESTS,
} from '../../constants';

describe('utils', () => {
  describe('isAddLayer', () => {
    it('should return true if layer is add', () => {
      expect(isAddLayer(LAYERS.ADD)).toBe(true);
    });

    it('should return false if layer is not add', () => {
      expect(isAddLayer('any')).toBe(false);
    });

    it('should return false if layer is not provided', () => {
      expect(isAddLayer()).toBe(false);
    });
  });

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

  describe('getRecordName', () => {
    const testTitle = 'testTitle';
    const recordId = 'recordId';
    const entryList = [
      {
        id: recordId,
        name: 'Record Name',
      }
    ];
    const formatMessage = jest.fn(() => testTitle);
    const optionNameId = 'ui-circulation.settings.optionNameId';

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('When edit record', () => {
      const location = {
        pathname: `pathname/${recordId}`,
        search: `?layer=${LAYERS.EDIT}`,
      };

      it('should call formatMessage to get edit record title', () => {
        const expectedArgs = [
          {
            id: 'ui-circulation.settings.title.editRecord',
          },
          {
            name: entryList[0].name,
          },
        ];

        getRecordName({
          entryList,
          location,
          formatMessage,
          optionNameId,
        });

        expect(formatMessage).toHaveBeenCalledWith(...expectedArgs);
      });
    });

    describe('When create record', () => {
      const location = {
        pathname: 'pathname',
        search: `?layer=${LAYERS.ADD}`,
      };

      it('should call formatMessage to get create record title', () => {
        const expectedArgs = [
          {
            id: 'ui-circulation.settings.title.newRecord',
          },
          {
            name: testTitle.toLowerCase(),
          },
        ];

        getRecordName({
          entryList,
          location,
          formatMessage,
          optionNameId,
        });

        expect(formatMessage).toHaveBeenCalledWith(...expectedArgs);
      });
    });

    describe('When duplicate record', () => {
      const location = {
        pathname: 'pathname',
        search: `?layer=${LAYERS.CLONE}`,
      };

      it('should call formatMessage to get duplicate record title', () => {
        const expectedArgs = [
          {
            id: 'ui-circulation.settings.title.newRecord',
          },
          {
            name: testTitle.toLowerCase(),
          },
        ];

        getRecordName({
          entryList,
          location,
          formatMessage,
          optionNameId,
        });

        expect(formatMessage).toHaveBeenCalledWith(...expectedArgs);
      });
    });

    describe('When selected record', () => {
      const location = {
        pathname: `pathname/${recordId}`,
        search: '',
      };

      it('should return selected record title', () => {
        const recordTitle = getRecordName({
          entryList,
          location,
          formatMessage,
          optionNameId,
        });

        expect(recordTitle).toBe(entryList[0].name);
      });
    });

    describe('When selected menu option', () => {
      const location = {
        pathname: 'pathname',
        search: '',
      };

      it('should call formatMessage to get menu option title', () => {
        const expectedArgs = [
          {
            id: optionNameId,
          },
          {
            optionNumber: 2,
          }
        ];

        getRecordName({
          entryList,
          location,
          formatMessage,
          optionNameId,
        });

        expect(formatMessage).toHaveBeenCalledWith(...expectedArgs);
      });
    });
  });

  describe('getConsortiumTlrPermission', () => {
    describe('when consortia and ecs-tlr interfaces are presented', () => {
      const stripes = {
        hasInterface: jest.fn(() => true),
      };

      it('should return consortium edit permission', () => {
        const result = getConsortiumTlrPermission(stripes);
        const consortiumViewPermission = 'tlr.consortium-tlr.view';

        expect(result).toBe(consortiumViewPermission);
      });
    });

    describe('when consortia and ecs-tlr interfaces are not presented', () => {
      const stripes = {
        hasInterface: jest.fn(() => false),
      };

      it('should return no permission value', () => {
        const result = getConsortiumTlrPermission(stripes);
        const noConsortiumPermission = 'noPermission';

        expect(result).toBe(noConsortiumPermission);
      });
    });
  });

  describe('getLastRecordValue', () => {
    describe('When there is records array', () => {
      it('should return last element', () => {
        const resource = {
          records: [
            {
              ecsTlrFeatureEnabled: true,
            },
            {
              ecsTlrFeatureEnabled: false,
            }
          ],
        };
        const result = getLastRecordValue(resource);

        expect(result).toEqual(resource.records[1]);
      });
    });

    describe('When there is no records array', () => {
      it('should return null', () => {
        const resource = {};
        const result = getLastRecordValue(resource);

        expect(result).toBeNull();
      });
    });
  });

  describe('getExcludeTenants', () => {
    it('should return an empty array if no tenants or excludeTenantIds are provided', () => {
      const result = getExcludeTenants();

      expect(result).toEqual([]);
    });

    it('should filter tenants based on excludeTenantIds and return formatted objects', () => {
      const tenants = [
        { id: '1', name: 'Tenant A' },
        { id: '2', name: 'Tenant B' },
      ];
      const excludeTenantIds = ['1'];
      const result = getExcludeTenants(excludeTenantIds, tenants);

      expect(result).toEqual([{ label: 'Tenant A', value: '1' }]);
    });

    it('should return an empty array if excludeTenantIds does not match any tenant', () => {
      const tenants = [
        { id: '1', name: 'Tenant A' },
        { id: '2', name: 'Tenant B' },
      ];
      const excludeTenantIds = ['3'];
      const result = getExcludeTenants(excludeTenantIds, tenants);

      expect(result).toEqual([]);
    });
  });

  describe('getNormalizeData', () => {
    it('should return normalized data with empty excludeFromEcsRequestLendingTenantSearch if ecsTlrFeatureEnabled is false', () => {
      const data = {
        [CONSORTIUM_TITLE_LEVEL_REQUESTS.ECS_TLR_ENABLED]: false,
        [CONSORTIUM_TITLE_LEVEL_REQUESTS.EXCLUDE_FROM_ECS_REQUEST_LENDING_TENANT_SEARCH]: [{ value: '1' }],
      };
      const result = getNormalizeData(data);

      expect(result).toEqual({
        ecsTlrFeatureEnabled: false,
        excludeFromEcsRequestLendingTenantSearch: [],
      });
    });

    it('should return normalized data with mapped excludeFromEcsRequestLendingTenantSearch if ecsTlrFeatureEnabled is true', () => {
      const data = {
        [CONSORTIUM_TITLE_LEVEL_REQUESTS.ECS_TLR_ENABLED]: true,
        [CONSORTIUM_TITLE_LEVEL_REQUESTS.EXCLUDE_FROM_ECS_REQUEST_LENDING_TENANT_SEARCH]: [{ value: '1' }, { value: '2' }],
      };
      const result = getNormalizeData(data);

      expect(result).toEqual({
        ecsTlrFeatureEnabled: true,
        excludeFromEcsRequestLendingTenantSearch: ['1', '2'],
      });
    });

    it('should handle missing excludeFromEcsRequestLendingTenantSearch', () => {
      const data = {
        [CONSORTIUM_TITLE_LEVEL_REQUESTS.ECS_TLR_ENABLED]: true,
      };
      const result = getNormalizeData(data);

      expect(result).toEqual({
        ecsTlrFeatureEnabled: true,
        excludeFromEcsRequestLendingTenantSearch: [],
      });
    });
  });

  describe('getDataOptions', () => {
    it('should return an empty array if no tenants are provided', () => {
      const result = getDataOptions();

      expect(result).toEqual([]);
    });

    it('should map tenants to an array of objects with label and value properties', () => {
      const tenants = [
        { id: '1', name: 'Tenant A' },
        { id: '2', name: 'Tenant B' },
      ];
      const result = getDataOptions(tenants);

      expect(result).toEqual([
        { label: 'Tenant A', value: '1' },
        { label: 'Tenant B', value: '2' },
      ]);
    });
  });
});
