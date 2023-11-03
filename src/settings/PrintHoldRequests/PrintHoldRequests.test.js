import {
  render,
} from '@folio/jest-config-stripes/testing-library/react';

import { ConfigManager } from '@folio/stripes/smart-components';

import PrintHoldRequests from './PrintHoldRequests';
import PrintHoldRequestsForm from './PrintHoldRequestsForm';
import {
  getInitialValues,
  normalizeData,
} from './utils';
import {
  MODULE_NAMES,
  CONFIG_NAMES,
} from '../../constants';

describe('PrintHoldRequests', () => {
  const paneTitleLabelId = 'ui-circulation.settings.PrintHoldRequests.paneTitle';
  const mockedStripes = {
    connect: jest.fn((component) => component),
  };

  beforeEach(() => {
    render(
      <PrintHoldRequests
        stripes={mockedStripes}
      />
    );
  });

  afterEach(() => {
    ConfigManager.mockClear();
    mockedStripes.connect.mockClear();
  });

  it('should connect "ConfigManager" to stripes', () => {
    expect(mockedStripes.connect).toHaveBeenLastCalledWith(ConfigManager);
  });

  it('should execute "ConfigManager" with passed props', () => {
    const expectedResult = {
      label: paneTitleLabelId,
      moduleName: MODULE_NAMES.SETTINGS,
      configName: CONFIG_NAMES.PRINT_HOLD_REQUESTS,
      configFormComponent: PrintHoldRequestsForm,
      stripes: mockedStripes,
      getInitialValues,
      onBeforeSave: normalizeData,
    };

    expect(ConfigManager).toHaveBeenLastCalledWith(expectedResult, {});
  });
});
