import { render } from '@folio/jest-config-stripes/testing-library/react';
import { ConfigManager } from '@folio/stripes/smart-components';
import { TitleManager } from '@folio/stripes/core';

import TLRPatronNotices from './TLRPatronNotices';
import TLRPatronNoticesForm from './TLRPatronNoticesForm';
import {
  getInitialValues,
  normalizeData,
} from './utils';
import {
  CONFIG_NAMES,
  SCOPES,
} from '../../constants';

describe('TLRPatronNotices', () => {
  const mockedStripes = {
    connect: jest.fn((component) => component),
  };
  const labelIds = {
    generalTitle: 'ui-circulation.settings.title.general',
    tlrPatronNoticesTitle: 'ui-circulation.settings.title.tlrPatronNotices',
    paneTitle: 'ui-circulation.settings.tlrPatronNotices.paneTitle',
  };

  beforeEach(() => {
    render(
      <TLRPatronNotices
        stripes={mockedStripes}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should connect ConfigManager to stripes', () => {
    expect(mockedStripes.connect).toHaveBeenLastCalledWith(ConfigManager);
  });

  it('should trigger ConfigManager with correct props', () => {
    const expectedResult = {
      label: labelIds.paneTitle,
      scope: SCOPES.CIRCULATION,
      configName: CONFIG_NAMES.REGULAR_TLR,
      configFormComponent: TLRPatronNoticesForm,
      stripes: mockedStripes,
      getInitialValues,
      onBeforeSave: normalizeData,
    };

    expect(ConfigManager).toHaveBeenLastCalledWith(expectedResult, {});
  });

  it('should trigger TitleManager with correct props', () => {
    const expectedProps = {
      page: labelIds.generalTitle,
      record: labelIds.tlrPatronNoticesTitle,
    };

    expect(TitleManager).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
  });
});
