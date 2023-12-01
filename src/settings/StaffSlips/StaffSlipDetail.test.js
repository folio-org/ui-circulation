import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';

import {
  Accordion,
  AccordionSet,
  AccordionStatus,
  ExpandAllButton,
} from '@folio/stripes/components';
import buildStripes from '../../../test/jest/__mock__/stripes.mock';

import StaffSlipDetail from './StaffSlipDetail';
import { Metadata } from '../components';

jest.mock('../components', () => ({
  Metadata: jest.fn(() => null),
}));
jest.mock('./components/ViewSections', () => ({
  StaffSlipAboutSection: jest.fn(() => 'StaffSlipAboutSection'),
  StaffSlipTemplateContentSection: jest.fn(() => 'StaffSlipTemplateContentSection'),
}));

const testStripes = buildStripes();

describe('StaffSlipDetail', () => {
  const labelIds = {
    staffSlipsGeneralInformation: 'ui-circulation.settings.staffSlips.generalInformation',
    staffSlipsTemplateContent: 'ui-circulation.settings.staffSlips.templateContent',
  };
  const testInitialValues = {
    name: 'testNameValue',
    description: 'testDescriptionValue',
    template: 'testTemplateValue',
    metadata: 'testMetadata'
  };
  const testDefaultProps = {
    initialValues: testInitialValues,
    stripes: testStripes,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('with default props', () => {
    beforeEach(() => {
      render(
        <StaffSlipDetail {...testDefaultProps} />
      );
    });

    it('should trigger "AccordionStatus" component', () => {
      expect(AccordionStatus).toHaveBeenCalled();
    });

    it('should render ExpandAllButton component', () => {
      expect(ExpandAllButton).toHaveBeenCalled();
    });

    it('should render AccordionSet component', () => {
      expect(AccordionSet).toHaveBeenCalled();
    });

    it('should render Accordion component 2 times', () => {
      expect(Accordion).toHaveBeenCalledTimes(2);
    });

    it('should render "General information" label', () => {
      expect(screen.getByText(labelIds.staffSlipsGeneralInformation)).toBeDefined();
    });

    it('should render "Template content" label', () => {
      expect(screen.getByText(labelIds.staffSlipsTemplateContent)).toBeDefined();
    });

    it('should call Metadata component', () => {
      expect(Metadata).toHaveBeenCalledWith(expect.objectContaining({
        connect: testStripes.connect,
        metadata: testDefaultProps.initialValues.metadata,
      }), {});
    });

    it('should display StaffSlipAboutSection', () => {
      expect(screen.getByText('StaffSlipAboutSection')).toBeVisible();
    });
  });
});
