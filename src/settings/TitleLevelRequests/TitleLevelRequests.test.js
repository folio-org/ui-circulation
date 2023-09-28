import {
  render,
} from '@folio/jest-config-stripes/testing-library/react';

import { ConfigManager } from '@folio/stripes/smart-components';
import TitleLevelRequests from './TitleLevelRequests';
import TitleLevelRequestsForm from './TitleLevelRequestsForm';
import {
  getInitialValues,
  normalizeData,
} from './utils';
import {
  MODULE_NAMES,
  CONFIG_NAMES,
} from '../../constants';

describe('TitleLevelRequests', () => {
  const paneTitleLabelId = 'ui-circulation.settings.titleLevelRequests.paneTitle';
  const mockedStripes = {
    connect: jest.fn((component) => component),
  };

  beforeEach(() => {
    render(
      <TitleLevelRequests
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
      configName: CONFIG_NAMES.TLR,
      configFormComponent: TitleLevelRequestsForm,
      stripes: mockedStripes,
      getInitialValues,
      onBeforeSave: normalizeData,
    };

    expect(ConfigManager).toHaveBeenLastCalledWith(expectedResult, {});
  });
});
