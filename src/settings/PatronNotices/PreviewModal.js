import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import Barcode from 'react-barcode';
import HtmlToReact, { Parser } from 'html-to-react';
import ReactToPrint from 'react-to-print';
import {
  Button,
  Col,
  Modal,
  Row,
} from '@folio/stripes/components';

import formats from './formats';
import { template } from './util';

class PreviewModal extends React.Component {
  static propTypes = {
    intl: intlShape,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    previewTemplate: PropTypes.string,
    printable: PropTypes.bool,
    slipType: PropTypes.string,
  };

  static defaultProps = {
    printable: false,
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

  render() {
    const { open, onClose, previewTemplate, intl, printable } = this.props;
    const heading = intl.formatMessage({ id: 'ui-circulation.settings.staffSlips.previewLabel' });

    const tmpl = template(previewTemplate || '');
    const componentStr = tmpl(this.previewFormat);
    const contentComponent = this.parser.parseWithInstructions(componentStr, () => true, this.rules);

    return (
      <Modal
        open={open}
        label={heading}
        id="preview-modal"
        size="medium"
        showHeader
        dismissible
        closeOnBackgroundClick
        onClose={onClose}
      >
        <div className="ql-editor" ref={this.editorRef}>
          {contentComponent}
        </div>
        <br />
        <Row>
          <Col xs>
            {printable &&
              <ReactToPrint trigger={() => <Button buttonStyle="primary">Print</Button>} content={() => this.editorRef.current} />
            }
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default injectIntl(PreviewModal);
