import {
  render,
} from '@folio/jest-config-stripes/testing-library/react';

import {
  TitleManager,
} from '@folio/stripes/core';

import TitleLevelRequests from './TitleLevelRequests';
import TitleLevelRequestsForm from './TitleLevelRequestsForm';
import {
  getInitialValues,
  normalizeData,
} from './utils';
import {
  CirculationSettingsConfig,
} from '../../../settings/components';

import {
  CONFIG_NAMES,
} from '../../../constants';

jest.mock('@folio/stripes/core', () => ({
  TitleManager: jest.fn(({ children }) => <>{children}</>),
}));
jest.mock('./TitleLevelRequestsForm', () => jest.fn(() => null));
jest.mock('../../../settings/components', () => ({
  CirculationSettingsConfig: jest.fn(() => null),
}));

const labelIds = {
  generalTitle: 'ui-circulation.settings.title.general',
  titleLevelRequestsTitle: 'ui-circulation.settings.title.titleLevelRequests',
  paneTitle: 'ui-circulation.settings.titleLevelRequests.paneTitle',
};

describe('TitleLevelRequests', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    render(<TitleLevelRequests />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render TitleManager with correct props', () => {
    expect(TitleManager).toHaveBeenCalledWith(
      expect.objectContaining({
        page: labelIds.generalTitle,
        record: labelIds.titleLevelRequestsTitle,
      }),
      {}
    );
  });

  it('should render CirculationSettingsConfig with correct props', () => {
    expect(CirculationSettingsConfig).toHaveBeenCalledWith(
      expect.objectContaining({
        label: labelIds.paneTitle,
        configName: CONFIG_NAMES.TLR,
        configFormComponent: TitleLevelRequestsForm,
        getInitialValues,
        onBeforeSave: normalizeData,
      }),
      {}
    );
  });
});
