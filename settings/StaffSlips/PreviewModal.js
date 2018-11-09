import React from 'react';
import PropTypes from 'prop-types';
import Barcode from 'react-barcode';
import HtmlToReact, { Parser } from 'html-to-react';
import ReactToPrint from 'react-to-print';
import { FormattedMessage } from 'react-intl';
import { Button, Col, Modal, Row } from '@folio/stripes/components';
import formats from './formats';
import { template } from './util';

class PreviewModal extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    previewTemplate: PropTypes.string,
    slipType: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.editorRef = React.createRef();
    const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
    this.previewFormat = formats[props.slipType];
    this.rules = [
      {
        replaceChildren: true,
        shouldProcessNode: node => node.name === 'barcode',
        processNode: (node, children) => (<Barcode value={children[0] ? children[0].trim() : ' '} />),
      },
      {
        shouldProcessNode: () => true,
        processNode: processNodeDefinitions.processDefaultNode,
      }
    ];

    this.parser = new Parser();
  }

  getButtonPrint = () => {
    return (
      <Button buttonStyle="primary">
        <FormattedMessage id="ui-circulation.settings.staffSlips.print" />
      </Button>
    );
  }

  render() {
    const {
      open,
      onClose,
      previewTemplate,
    } = this.props;

    const tmpl = template(previewTemplate || '');
    const componentStr = tmpl(this.previewFormat);
    const contentComponent = this.parser.parseWithInstructions(componentStr, () => true, this.rules);

    return (
      <Modal
        open={open}
        label={<FormattedMessage id="ui-circulation.settings.staffSlips.previewLabel" />}
        id="preview-modal"
        scope="module"
        size="medium"
        showHeader
      >
        <div className="ql-editor" ref={this.editorRef}>
          {contentComponent}
        </div>
        <br />
        <Row>
          <Col xs>
            <ReactToPrint
              trigger={this.getButtonPrint}
              content={() => this.editorRef.current}
            />
            <Button
              onClick={onClose}
              id="clickable-close-preview"
            >
              <FormattedMessage id="ui-circulation.settings.staffSlips.close" />
            </Button>
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default PreviewModal;
