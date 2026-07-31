import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
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
import { getNoticeFormat } from '../../../utils';
import { NOTICE_FORMATS } from '../../../../../constants';

const noticeFormatLabelIds = {
  [NOTICE_FORMATS.PRINT]: 'ui-circulation.settings.patronNotices.printOnly',
  [NOTICE_FORMATS.TEXT_MESSAGE]: 'ui-circulation.settings.patronNotices.textMessage',
  [NOTICE_FORMATS.EMAIL]: 'ui-circulation.settings.patronNotices.email',
};

const PatronNoticeEmailSection = ({ notice, locale, emailTemplate }) => {
  const intl = useIntl();

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

  const noticeFormatLabel = intl.formatMessage({ id: noticeFormatLabelIds[getNoticeFormat(notice)] });

  const togglePreviewDialog = () => {
    setOpenPreview(!openPreview);
  };

  return (
    <div data-testid="emailAccordionContent">
      <Row>
        <Col
          xs={8}
          data-testid="noticeFormat"
        >
          <KeyValue
            label={<FormattedMessage id="ui-circulation.settings.patronNotices.noticeFormat" />}
            value={noticeFormatLabel}
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
