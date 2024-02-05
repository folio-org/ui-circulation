import {
  render,
} from '@folio/jest-config-stripes/testing-library/react';
import { TitleManager } from '@folio/stripes/core';
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
  const labelIds = {
    generalTitle: 'ui-circulation.settings.title.general',
    printHoldRequestsTitle: 'ui-circulation.settings.title.printHoldRequests',
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

  it('should trigger TitleManager with correct props', () => {
    const expectedProps = {
      page: labelIds.generalTitle,
      record: labelIds.printHoldRequestsTitle,
    };

    expect(TitleManager).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
  });
});
