import React from 'react';
import PropTypes from 'prop-types';
import HtmlToReact, { Parser } from 'html-to-react';
import {
  FormattedMessage,
  injectIntl,
} from 'react-intl';

import {
  Button,
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';
import { PreviewModal, tokensReducer } from '@folio/stripes-template-editor';

import getTokens from './tokens';
import css from './StaffSlipDetail.css';

class StaffSlipDetail extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
    this.parser = new Parser();

    this.rules = [
      {
        shouldProcessNode: () => true,
        processNode: processNodeDefinitions.processDefaultNode,
      },
    ];

    this.state = {
      openPreview: false,
    };
  }

  openPreviewDialog = () => {
    this.setState({ openPreview: true });
  };

  closePreviewDialog = () => {
    this.setState({ openPreview: false });
  };

  render() {
    const { openPreview } = this.state;
    const {
      initialValues: staffSlip,
      intl: {
        formatMessage,
        locale,
      },
    } = this.props;

    const tokens = getTokens(locale);
    const parsedEmailTemplate = this.parser.parseWithInstructions(staffSlip.template, () => true, this.rules);

    return (
      <div data-test-staff-slip-details>
        <Row>
          <Col xs={12}>
            <div data-test-staff-slip-name>
              <KeyValue
                label={formatMessage({ id: 'ui-circulation.settings.staffSlips.name' })}
                value={staffSlip.name}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <KeyValue
              label={formatMessage({ id: 'ui-circulation.settings.staffSlips.description' })}
              value={staffSlip.description}
            />
          </Col>
        </Row>
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
                  onClick={this.openPreviewDialog}
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
          onClose={this.closePreviewDialog}
        />
      </div>
    );
  }
}

export default injectIntl(StaffSlipDetail);
