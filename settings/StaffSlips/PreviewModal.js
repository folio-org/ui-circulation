import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import Barcode from 'react-barcode';
import HtmlToReact, { Parser } from 'html-to-react';
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

    const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);

    this.demoData = {
      'Item title': 'Hello',
      'Item barcode': '<Barcode/>',
      'Item call number': '67822233223',
      'Patron last name': 'Brown',
      'Patron first name': 'John',
      'Transaction Id': '10111222323222',
      'Hold expiration': '10/10/2018',
      'itemBarcode': '5901234123457',
    };

    this.rules = [
      {
        replaceChildren: true,
        shouldProcessNode: node => node.name === 'barcode',
        processNode: () => (<Barcode value={this.demoData.itemBarcode} format="EAN13" />),
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
        <div className="ql-editor">
          {contentComponent}
        </div>
        <br />
        <Row>
          <Col xs>
            <Button onClick={onClose} id="clickable-close-preview">{closeLabel}</Button>
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default injectIntl(PreviewModal);
