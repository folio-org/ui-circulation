import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
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
    intl: intlShape.isRequired,
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

  translate(id) {
    return this.props.intl.formatMessage({
      id: `ui-circulation.settings.staffSlips.${id}`
    });
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

    return (
      <div>
        <Row>
          <Col xs={8}>
            <KeyValue label={this.translate('name')} value={staffSlip.name} />
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <KeyValue label={this.translate('active')} value={staffSlip.active ? this.translate('yes') : this.translate('no')} />
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <KeyValue label={this.translate('description')} value={staffSlip.description} />
          </Col>
        </Row>
        <Row bottom="xs">
          <Col xs={9}>
            {this.translate('display')}
          </Col>
          <Col xs={3}>
            <Row className={css.preview}>
              <Col>
                <Button bottomMargin0 onClick={this.openPreviewDialog}>Preview</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className="ql-editor" ref={this.editorRef}>
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

export default injectIntl(StaffSlipDetail);
