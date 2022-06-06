import React from 'react';
import {
  render,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

import { EntryManager } from '@folio/stripes/smart-components';

import StaffSlipDetail from './StaffSlipDetail';
import StaffSlipForm from './StaffSlipForm';
import StaffSlipManager from './StaffSlipManager';

jest.mock('./StaffSlipDetail', () => jest.fn(() => null));
jest.mock('./StaffSlipForm', () => jest.fn(() => null));

describe('StaffSlipManager', () => {
  const labelIds = {
    staffSlips: 'ui-circulation.settings.index.staffSlips',
    staffSlipTokenHeader: 'ui-circulation.settings.staffSlips.staffSlipTokenHeader',
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
