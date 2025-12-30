import {
  render,
} from '@folio/jest-config-stripes/testing-library/react';

import {
  TitleManager,
} from '@folio/stripes/core';

import PrintHoldRequests from './PrintHoldRequests';
import PrintHoldRequestsForm from './PrintHoldRequestsForm';
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
jest.mock('./PrintHoldRequestsForm', () => jest.fn(() => null));
jest.mock('../components', () => ({
  CirculationSettingsConfig: jest.fn(() => null),
}));

const labelIds = {
  generalTitle: 'ui-circulation.settings.title.general',
  printHoldRequestsTitle: 'ui-circulation.settings.title.printHoldRequests',
  paneTitle: 'ui-circulation.settings.PrintHoldRequests.paneTitle',
};

describe('PrintHoldRequests', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    render(<PrintHoldRequests />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render TitleManager with correct props', () => {
    expect(TitleManager).toHaveBeenCalledWith(
      expect.objectContaining({
        page: labelIds.generalTitle,
        record: labelIds.printHoldRequestsTitle,
      }),
      {}
    );
  });

  it('should render CirculationSettingsConfig with correct props', () => {
    expect(CirculationSettingsConfig).toHaveBeenCalledWith(
      expect.objectContaining({
        label: labelIds.paneTitle,
        configName: CONFIG_NAMES.PRINT_HOLD_REQUESTS,
        configFormComponent: PrintHoldRequestsForm,
        getInitialValues,
        onBeforeSave: normalizeData,
      }),
      {}
    );
  });
});
