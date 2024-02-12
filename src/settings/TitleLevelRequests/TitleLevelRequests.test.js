import {
  render,
} from '@folio/jest-config-stripes/testing-library/react';
import { ConfigManager } from '@folio/stripes/smart-components';
import { TitleManager } from '@folio/stripes/core';

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

describe.skip('TitleLevelRequests', () => {
  const paneTitleLabelId = 'ui-circulation.settings.titleLevelRequests.paneTitle';
  const mockedStripes = {
    connect: jest.fn((component) => component),
  };
  const labelIds = {
    generalTitle: 'ui-circulation.settings.title.general',
    titleLevelRequestsTitle: 'ui-circulation.settings.title.titleLevelRequests',
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

  it('should trigger TitleManager with correct props', () => {
    const expectedProps = {
      page: labelIds.generalTitle,
      record: labelIds.titleLevelRequestsTitle,
    };

    expect(TitleManager).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
  });
});
