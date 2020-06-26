import React from 'react';
import PropTypes from 'prop-types';
import HtmlToReact, { Parser } from 'html-to-react';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Col,
  KeyValue,
  Row,
} from '@folio/stripes/components';
import { PreviewModal, tokensReducer } from '@folio/stripes-template-editor';

import tokens from './tokens';
import css from './StaffSlipDetail.css';

class StaffSlipDetail extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
    this.parser = new Parser();

    this.rules = [
      {
        shouldProcessNode: () => true,
        processNode: processNodeDefinitions.processDefaultNode,
      }
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
    const { initialValues: staffSlip } = this.props;

    const parsedEmailTemplate = this.parser.parseWithInstructions(staffSlip.template, () => true, this.rules);

    return (
      <div data-test-staff-slip-details>
        <Row>
          <Col xs={12}>
            <div data-test-staff-slip-name>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.staffSlips.name" />}
                value={staffSlip.name}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.staffSlips.description" />}
              value={staffSlip.description}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={9}>
            <FormattedMessage id="ui-circulation.settings.staffSlips.display" />
          </Col>
          <Col xs={3}>
            <Row className={css.preview}>
              <Col>
                <Button
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
            xs={12}
            className="editor-preview"
            data-test-staff-slip-content
          >
            {parsedEmailTemplate}
          </Col>
        </Row>
        <PreviewModal
          open={openPreview}
          header={
            <FormattedMessage
              id="ui-circulation.settings.staffSlips.view.previewLabel"
              values={{ name: staffSlip.name }}
            />
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

export default StaffSlipDetail;
