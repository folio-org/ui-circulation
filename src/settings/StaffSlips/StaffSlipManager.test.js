import {
  render,
} from '@folio/jest-config-stripes/testing-library/react';

import { EntryManager } from '@folio/stripes/smart-components';
import { TitleManager } from '@folio/stripes/core';

import StaffSlipDetail from './StaffSlipDetail';
import StaffSlipForm from './StaffSlipForm';
import StaffSlipManager from './StaffSlipManager';
import { getRecordName } from '../utils/utils';
import {sortBy} from "lodash";

const recordName = 'recordName';

jest.mock('./StaffSlipDetail', () => jest.fn(() => null));
jest.mock('./StaffSlipForm', () => jest.fn(() => null));
jest.mock('../utils/utils', () => ({
  getRecordName: jest.fn(() => recordName),
}));

describe('StaffSlipManager', () => {
  const labelIds = {
    staffSlips: 'ui-circulation.settings.index.staffSlips',
    staffSlipTokenHeader: 'ui-circulation.settings.staffSlips.staffSlipTokenHeader',
    generalTitle: 'ui-circulation.settings.title.general',
    optionNameId: 'ui-circulation.settings.title.staffSlips',
  };
  const testMutator = {
    entries: {
      POST: jest.fn(),
      PUT: jest.fn(),
      DELETE: jest.fn(),
    },
  };
  const testResources = {
    entries: {
      records: [{
        name: 'Pasha',
      }, {
        name: 'Zelda',
      }, {
        name: 'Alex',
      }],
    },
  };
  const testDefaultProps = {
    mutator: testMutator,
    resources: testResources,
    location: {
      pathname: 'pathname',
    },
  };

  afterEach(() => {
    EntryManager.mockClear();
  });

  describe('with default props', () => {
    it('should render "EntryManager" component', () => {
      render(
        <StaffSlipManager {...testDefaultProps} />
      );

      const expectedEntryList = [{
        name: 'Alex',
      }, {
        name: 'Pasha',
      }, {
        name: 'Zelda',
      }];

      expect(EntryManager).toHaveBeenCalledWith(expect.objectContaining({
        parentMutator: testMutator,
        entryList: expectedEntryList,
        detailComponent: StaffSlipDetail,
        paneTitle: labelIds.staffSlips,
        entryLabel: labelIds.staffSlipTokenHeader,
        entryFormComponent: StaffSlipForm,
        nameKey: 'name',
        permissions: {
          put: 'ui-circulation.settings.staff-slips',
          post: 'ui-circulation.settings.staff-slips.post',
          delete: 'ui-circulation.settings.staff-slips.delete',
        },
      }), {});
    });

    it('should trigger TitleManager with correct props', () => {
      render(
        <StaffSlipManager
          {...testDefaultProps}
        />
      );

      const expectedProps = {
        page: labelIds.generalTitle,
        record: recordName,
      };

      expect(TitleManager).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
    });

    it('should get record name', () => {
      render(
        <StaffSlipManager
          {...testDefaultProps}
        />
      );

      const expectedArg = {
        entryList: sortBy(testDefaultProps.resources.entries.records, 'name'),
        location: testDefaultProps.location,
        formatMessage: expect.any(Function),
        optionNameId: labelIds.optionNameId,
      };

      expect(getRecordName).toHaveBeenCalledWith(expectedArg);
    });

    it('should render "EntryManager" component when entries resource is not passed', () => {
      const { entries, ...restResources } = testResources; // eslint-disable-line no-unused-vars
      render(
        <StaffSlipManager
          {...testDefaultProps}
          resources={restResources}
        />
      );

      const expectedEntryList = [];

      expect(EntryManager).toHaveBeenCalledWith(expect.objectContaining({
        entryList: expectedEntryList,
      }), {});
    });

    it('should render "EntryManager" component when entries resource has no records', () => {
      render(
        <StaffSlipManager
          {...testDefaultProps}
          resources={{
            ...testResources,
            entries: {},
          }}
        />
      );

      const expectedEntryList = [];

      expect(EntryManager).toHaveBeenCalledWith(expect.objectContaining({
        entryList: expectedEntryList,
      }), {});
    });
  });
});
