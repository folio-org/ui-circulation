import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
  injectIntl,
} from 'react-intl';
import HtmlToReact, { Parser } from 'html-to-react';

import {
  Button,
  Col,
  Row,
} from '@folio/stripes/components';
import { PreviewModal, tokensReducer } from '@folio/stripes-template-editor';
import css from '../../../StaffSlipDetail.css';
import getTokens from '../../../tokens';

const StaffSlipTemplateContentSection = ({ intl, staffSlip }) => {
  const {
    formatMessage,
    locale,
  } = intl;
  const tokens = getTokens(locale);

  const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
  const rules = [
    {
      shouldProcessNode: () => true,
      processNode: processNodeDefinitions.processDefaultNode,
    },
  ];

  const parser = new Parser();
  const parsedEmailTemplate = parser.parseWithInstructions(staffSlip.template, () => true, rules);

  const [openPreview, setOpenPreview] = useState(false);

  const togglePreviewDialog = () => {
    setOpenPreview(!openPreview);
  };

  return (
    <div>
      <Row>
        <Col
          data-testid="staffSlipsDisplayCol"
          xs={9}
        >
          <FormattedMessage id="ui-circulation.settings.staffSlips.display" />
        </Col>
        <Col xs={3}>
          <Row className={css.preview}>
            <Col>
              <Button
                data-testid="staffSlipsPreviewButton"
                data-test-open-preview-btn
                bottomMargin0
                onClick={togglePreviewDialog}
              >
                <FormattedMessage id="ui-circulation.settings.staffSlips.preview" />
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col
          data-testid="emailTemplateCol"
          xs={12}
          className="editor-preview"
          data-test-staff-slip-content
        >
          {parsedEmailTemplate}
        </Col>
      </Row>
      <PreviewModal
        data-testid="previewModal"
        open={openPreview}
        header={
            formatMessage({
              id: 'ui-circulation.settings.staffSlips.view.previewLabel',
            }, { name: staffSlip.name })
          }
        previewTemplate={staffSlip.template}
        previewFormat={tokensReducer(tokens)}
        printable
        onClose={togglePreviewDialog}
      />
    </div>
  );
};

StaffSlipTemplateContentSection.propTypes = {
  intl: PropTypes.object.isRequired,
  staffSlip: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    template: PropTypes.string,
  }).isRequired,
};
export default injectIntl(StaffSlipTemplateContentSection);
