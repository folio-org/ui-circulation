import React from 'react';
import { render, cleanup } from '@testing-library/react';

import '../../../../test/jest/__mock__';
import CancelButton from './CancelButton';

const renderCancelButton = (props) => {
  const { onCancel = jest.fn() } = props;

  return render(
    <CancelButton
      onCancel={onCancel}
    />
  );
};

const labelIds = {
  closeEntryDialog: 'ui-circulation.settings.common.closeEntryDialog',
};

describe('Cancel Button', () => {
  let renderButton;
  beforeEach(() => {
    renderButton = renderCancelButton({});
  });

  afterEach(cleanup);

  it('should be rendered', () => {
    const { container, queryByLabelText } = renderButton;
    const iconCancelButton = container.querySelector('[data-test-cancel-icon-button]');

    expect(container).toBeVisible();
    expect(iconCancelButton).toBeVisible();
    expect(queryByLabelText(labelIds.closeEntryDialog)).toBeTruthy();
  });
});
