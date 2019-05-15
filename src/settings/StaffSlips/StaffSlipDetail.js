import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, Col, KeyValue, Row } from '@folio/stripes/components';
import HtmlToReact, { Parser } from 'html-to-react';

import formats from './formats';
import PreviewModal from './PreviewModal';

import css from './StaffSlipDetail.css';

class StaffSlipDetail extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
    initialValues: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    this.openPreviewDialog = this.openPreviewDialog.bind(this);
    this.closePreviewDialog = this.closePreviewDialog.bind(this);
    const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);

    this.previewFormat = formats[props.initialValues.name];
    this.rules = [
      {
        shouldProcessNode: () => true,
        processNode: processNodeDefinitions.processDefaultNode,
      }
    ];

    this.state = { openDialog: false };
    this.parser = new Parser();
  }

  openPreviewDialog() {
    this.setState({ openDialog: true });
  }

  closePreviewDialog() {
    this.setState({ openDialog: false });
  }

  render() {
    const { openDialog } = this.state;
    const { initialValues: staffSlip } = this.props;
    const contentComponent = this.parser.parseWithInstructions(staffSlip.template, () => true, this.rules);
    const isActiveValue = staffSlip.active
      ? <FormattedMessage id="ui-circulation.settings.staffSlips.yes" />
      : <FormattedMessage id="ui-circulation.settings.staffSlips.no" />;

    return (
      <div data-test-staff-slip-details>
        <Row>
          <Col xs={8}>
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.staffSlips.name" />}
              value={staffSlip.name}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.staffSlips.active" />}
              value={isActiveValue}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.staffSlips.description" />}
              value={staffSlip.description}
            />
          </Col>
        </Row>
        <Row bottom="xs">
          <Col xs={9}>
            <FormattedMessage id="ui-circulation.settings.staffSlips.display" />
          </Col>
          <Col xs={3}>
            <Row className={css.preview}>
              <Col>
                <Button data-test-open-preview-btn bottomMargin0 onClick={this.openPreviewDialog}>
                  <FormattedMessage id="ui-circulation.settings.staffSlips.preview" />
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div data-test-staff-slip-content className="ql-editor" ref={this.editorRef}>
              {contentComponent}
            </div>
          </Col>
        </Row>
        {openDialog &&
          <PreviewModal
            previewTemplate={staffSlip.template}
            open={openDialog}
            onClose={this.closePreviewDialog}
            slipType={staffSlip.name}
          />
        }
      </div>
    );
  }
}

export default StaffSlipDetail;
