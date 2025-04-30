import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import HtmlToReact, { Parser } from 'html-to-react';
import DOMPurify from 'dompurify';

import {
  Button,
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';
import {
  PreviewModal,
  tokensReducer,
} from '@folio/stripes-template-editor';

import getTokens from '../../../tokens';

const PatronNoticeEmailSection = ({ notice, locale, emailTemplate }) => {
  const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
  const parser = new Parser();
  const rules = [
    {
      shouldProcessNode: () => true,
      processNode: processNodeDefinitions.processDefaultNode,
    }
  ];
  const tokens = getTokens(locale);
  const purifyEmailTemplate = DOMPurify.sanitize(emailTemplate);
  const parsedEmailTemplate = parser.parseWithInstructions(purifyEmailTemplate, () => true, rules);
  const [openPreview, setOpenPreview] = useState(false);

  const togglePreviewDialog = () => {
    setOpenPreview(!openPreview);
  };

  return (
    <div data-testid="emailAccordionContent">
      <Row>
        <Col
          xs={8}
          data-testid="patronNoticeSubject"
        >
          <KeyValue
            label={<FormattedMessage id="ui-circulation.settings.patronNotices.subject" />}
            value={notice.localizedTemplates.en.header}
          />
        </Col>
        <Col xs={4}>
          <Button onClick={togglePreviewDialog}>
            <FormattedMessage id="ui-circulation.settings.patronNotices.preview" />
          </Button>
        </Col>
      </Row>
      <Row>
        <Col
          xs={12}
          data-testid="patronNoticeBody"
        >
          <KeyValue
            label={<FormattedMessage id="ui-circulation.settings.patronNotices.body" />}
            value={parsedEmailTemplate}
          />
        </Col>
      </Row>
      <PreviewModal
        open={openPreview}
        header={
          <FormattedMessage
            id="ui-circulation.settings.patronNotices.view.previewHeader"
            values={{ name: notice.name }}
          />
        }
        previewTemplate={emailTemplate}
        previewFormat={tokensReducer(tokens)}
        onClose={togglePreviewDialog}
      />
    </div>
  );
};

PatronNoticeEmailSection.propTypes = {
  notice: PropTypes.shape({
    name: PropTypes.string,
    localizedTemplates: PropTypes.shape({
      en: PropTypes.shape({
        header: PropTypes.string,
      }),
    }),
  }).isRequired,
  locale: PropTypes.string,
  emailTemplate: PropTypes.string
};

export default PatronNoticeEmailSection;
