import {
  render,
} from '@folio/jest-config-stripes/testing-library/react';

import {
  TitleManager,
} from '@folio/stripes/core';

import TLRPatronNotices from './TLRPatronNotices';
import TLRPatronNoticesForm from './TLRPatronNoticesForm';
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
jest.mock('./TLRPatronNoticesForm', () => jest.fn(() => null));
jest.mock('../components', () => ({
  CirculationSettingsConfig: jest.fn(() => null),
}));

const labelIds = {
  generalTitle: 'ui-circulation.settings.title.general',
  tlrPatronNoticesTitle: 'ui-circulation.settings.title.tlrPatronNotices',
  paneTitle: 'ui-circulation.settings.tlrPatronNotices.paneTitle',
};

describe('TLRPatronNotices', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    render(<TLRPatronNotices />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render TitleManager with correct props', () => {
    expect(TitleManager).toHaveBeenCalledWith(
      expect.objectContaining({
        page: labelIds.generalTitle,
        record: labelIds.tlrPatronNoticesTitle,
      }),
      {}
    );
  });

  it('should render CirculationSettingsConfig with correct props', () => {
    expect(CirculationSettingsConfig).toHaveBeenCalledWith(
      expect.objectContaining({
        label: labelIds.paneTitle,
        configName: CONFIG_NAMES.REGULAR_TLR,
        configFormComponent: TLRPatronNoticesForm,
        getInitialValues,
        onBeforeSave: normalizeData,
      }),
      {}
    );
  });
});
