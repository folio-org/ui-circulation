import { render } from '@folio/jest-config-stripes/testing-library/react';
import { TitleManager } from '@folio/stripes/core';

import Circulation from '.';

const props = {
  stripes: {},
};
const labelIds = {
  generalTitle: 'ui-circulation.settings.title.general',
};

jest.mock('./settings/utils/utils', () => ({
  getConsortiumTlrPermission: jest.fn(),
}));

describe('Circulation', () => {
  beforeEach(() => {
    render(
      <Circulation
        {...props}
      />
    );
  });

  it('should trigger TitleManager with correct props', () => {
    const expectedProps = {
      page: labelIds.generalTitle,
    };

    expect(TitleManager).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
  });
});
