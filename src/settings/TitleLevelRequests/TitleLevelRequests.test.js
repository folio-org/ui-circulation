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
} from '../components';

import {
  CONFIG_NAMES,
} from '../../constants';

jest.mock('@folio/stripes/core', () => ({
  TitleManager: jest.fn(({ children }) => <>{children}</>),
}));
jest.mock('./TitleLevelRequestsForm', () => jest.fn(() => null));
jest.mock('../components', () => ({
  CirculationSettingsConfig: jest.fn(() => null),
}));

const labelIds = {
  generalTitle: 'ui-circulation.settings.title.general',
  titleLevelRequestsTlrTitle: 'ui-circulation.settings.title.titleLevelRequestsTlr',
  paneTitle: 'ui-circulation.settings.titleLevelRequestsTlr.paneTitle',
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
        record: labelIds.titleLevelRequestsTlrTitle,
      }),
      {}
    );
  });

  it('should render CirculationSettingsConfig with correct props', () => {
    expect(CirculationSettingsConfig).toHaveBeenCalledWith(
      expect.objectContaining({
        label: labelIds.paneTitle,
        configName: CONFIG_NAMES.GENERAL_TLR,
        configFormComponent: TitleLevelRequestsForm,
        getInitialValues,
        onBeforeSave: normalizeData,
      }),
      {}
    );
  });
});
