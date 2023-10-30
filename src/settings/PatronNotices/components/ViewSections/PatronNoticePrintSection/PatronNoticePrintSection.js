import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HtmlToReact, { Parser } from 'html-to-react';
import { FormattedMessage } from 'react-intl';

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

const PatronNoticePrintSection = ({ notice, locale, printTemplate }) => {
  const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
  const parser = new Parser();
  const rules = [
    {
      shouldProcessNode: () => true,
      processNode: processNodeDefinitions.processDefaultNode,
    }
  ];
  const tokens = getTokens(locale);

  const parsedPrintTemplate = parser.parseWithInstructions(printTemplate, () => true, rules);
  const [openPreview, setOpenPreview] = useState(false);

  const togglePreviewDialog = () => {
    setOpenPreview(!openPreview);
  };

  return (
    <div data-testid="printAccordionContent">
      <Row>
        <Col xsOffset={8} xs={4}>
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
            value={parsedPrintTemplate}
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
        previewTemplate={printTemplate}
        previewFormat={tokensReducer(tokens)}
        onClose={togglePreviewDialog}
      />
    </div>
  );
};

PatronNoticePrintSection.propTypes = {
  notice: PropTypes.object.isRequired,
  locale: PropTypes.string,
  printTemplate: PropTypes.string
};

export default PatronNoticePrintSection;
