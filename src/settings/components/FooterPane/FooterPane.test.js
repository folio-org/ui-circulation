import {
  render,
  cleanup,
  getByText,
} from '@folio/jest-config-stripes/testing-library/react';

import { runAxeTest } from '@folio/stripes-testing';

import FooterPane from './FooterPane';

const renderFooterPane = ({
  onCancel = jest.fn(),
  isSaveButtonDisabled = true,
  isSaveButtonAvailable = true,
}) => render(
  <FooterPane
    onCancel={onCancel}
    isSaveButtonDisabled={isSaveButtonDisabled}
    isSaveButtonAvailable={isSaveButtonAvailable}
  />
);

describe('Footer Pane', () => {
  let footerPane;
  beforeEach(() => {
    footerPane = renderFooterPane({});
  });

  afterEach(cleanup);

  it('should render with no axe errors', async () => {
    await runAxeTest({
      rootNode: document.body,
    });
  });

  it('should be rendered', () => {
    const { container } = footerPane;
    const footerContent = container.querySelector('.footerContent');

    expect(container).toBeVisible();
    expect(footerContent).toBeVisible();
  });

  it('should contain submit and cancel buttons', () => {
    const { container } = footerPane;
    const buttons = container.querySelectorAll('[data-test-button]');

    expect(buttons[0]).toBeVisible();
    expect(buttons[1]).toBeVisible();
  });

  it('should have proper labels', () => {
    const { container } = footerPane;

    expect(getByText(container, 'ui-circulation.settings.common.cancel')).toBeTruthy();
    expect(getByText(container, /saveAndClose/)).toBeTruthy();
  });
});
