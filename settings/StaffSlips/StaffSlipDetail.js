import React from 'react';
import PropTypes from 'prop-types';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import StaffSlipEditor from './StaffSlipEditor';
import HtmlToReact, { Parser } from 'html-to-react';
import Button from '@folio/stripes-components/lib/Button';
import formCss from '@folio/stripes-components/lib/sharedStyles/form.css';
import css from './StaffSlipDetail.css';
import { formats } from './formats.js';
import { template } from './util';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import PreviewModal from './PreviewModal';

class StaffSlipDetail extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
      intl: PropTypes.object.isRequired,
    }).isRequired,
    initialValues: PropTypes.object,
  };

  translate(id) {
    return this.props.stripes.intl.formatMessage({
      id: `ui-circulation.settings.staffSlips.${id}`
    });
  }

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

    const staffSlip = this.props.initialValues;
    const tmpl = template(staffSlip.template || '');
    const componentStr = tmpl(this.previewFormat);
    const contentComponent = this.parser.parseWithInstructions(componentStr, () => true, this.rules);

    return (
      <div>
        <Row>
          <Col xs={8}>
            <KeyValue label={this.translate('name')} value={staffSlip.name} />
          </Col>
        </Row>
        <Row>
          <Col xs={8}>
            <KeyValue label={this.translate('active')} value={staffSlip.active ? this.translate('yes') : this.translate('no') } />
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
            <div className={css.detail} ref={this.editorRef}>
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
