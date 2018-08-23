import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import Barcode from 'react-barcode';
import HtmlToReact, { Parser } from 'html-to-react';
import ReactToPrint from "react-to-print";

import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import Modal from '@folio/stripes-components/lib/Modal';

import { template } from './util';

class PreviewModal extends React.Component {
  static propTypes = {
    intl: intlShape,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    previewTemplate: PropTypes.string,
  };

  constructor() {
    super();

    this.editorRef = React.createRef();
    const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);

    this.demoData = {
      'Item title': '',
      'Item barcode': '<Barcode/>',
      'Item call number': ' Call number:',
      'Requester last name': ' Requester Last name:',
      'Requester first name': ' Requester First name:',
      'Transaction Id': ' Transaction Id:',
      'Hold expiration': ' Hold expiration:',
    };

    this.rules = [
      {
        replaceChildren: true,
        shouldProcessNode: node => node.name === 'barcode',
        processNode: (node, children) => <Barcode value={children[0] ? children[0].trim() : ' '} format="EAN13" />,
      },
      {
        shouldProcessNode: () => true,
        processNode: processNodeDefinitions.processDefaultNode,
      }
    ];

    this.parser = new Parser();
  }

  render() {
    const { open, onClose, previewTemplate, intl } = this.props;
    const closeLabel = intl.formatMessage({ id: 'ui-circulation.settings.staffSlips.close' });
    const heading = intl.formatMessage({ id: 'ui-circulation.settings.staffSlips.previewLabel' });

    const tmpl = template(previewTemplate || '');
    const componentStr = tmpl(this.demoData);
    const contentComponent = this.parser.parseWithInstructions(componentStr, () => true, this.rules);

    return (
      <Modal
        open={open}
        label={heading}
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
            <ReactToPrint trigger={() => <Button buttonStyle="primary">Print</Button>} content={() => this.editorRef.current} />
            <Button onClick={onClose} id="clickable-close-preview">{closeLabel}</Button>
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default injectIntl(PreviewModal);
