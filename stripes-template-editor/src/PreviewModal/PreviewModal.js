import React from 'react';
import ReactToPrint from 'react-to-print';
import PropTypes from 'prop-types';
import Barcode from 'react-barcode';
import HtmlToReact, { Parser } from 'html-to-react';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Modal,
} from '@folio/stripes/components';

import templateResolver from '../template-resolver';
import css from './PreviewModal.css';

class PreviewModal extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    printable: PropTypes.bool,
    previewTemplate: PropTypes.string,
    header: PropTypes.node.isRequired,
    previewFormat: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    previewTemplate: '',
    printable: false,
  };

  constructor(props) {
    super(props);

    this.editorRef = React.createRef();
    const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
    this.rules = [
      {
        replaceChildren: true,
        shouldProcessNode: node => node.name === 'barcode',
        processNode: (node, [previewValue]) => (<Barcode value={previewValue ? previewValue.trim() : ' '} />),
      },
      {
        shouldProcessNode: () => true,
        processNode: processNodeDefinitions.processDefaultNode,
      }
    ];

    this.parser = new Parser();
  }

  renderFooter = () => {
    const {
      printable,
      onClose,
    } = this.props;

    const printableFooter = (
      <div className={css.footer}>
        <Button
          data-test-close-tokens-modal
          marginBottom0
          onClick={onClose}
        >
          <FormattedMessage id="stripes-core.button.close" />
        </Button>
        <ReactToPrint
          removeAfterPrint
          trigger={() => (
            <Button
              data-test-print-modal-template
              buttonStyle="primary"
              marginBottom0
            >
              <FormattedMessage id="stripes-template-editor.print" />
            </Button>
          )}
          content={() => this.editorRef.current}
        />
      </div>
    );

    const footer = (
      <>
        <Button
          buttonStyle="primary"
          marginBottom0
          onClick={onClose}
        >
          <FormattedMessage id="stripes-template-editor.close" />
        </Button>
      </>
    );

    return printable ? printableFooter : footer;
  };

  render() {
    const {
      open,
      previewTemplate,
      previewFormat,
      header,
    } = this.props;

    const tmpl = templateResolver(previewTemplate);
    const componentStr = tmpl(previewFormat);
    const contentComponent = this.parser.parseWithInstructions(componentStr, () => true, this.rules);

    return (
      <Modal
        open={open}
        label={header}
        id="preview-modal"
        size="medium"
        footer={this.renderFooter()}
      >
        <div
          className="editor-preview"
          ref={this.editorRef}
        >
          {contentComponent}
        </div>
      </Modal>
    );
  }
}

export default PreviewModal;
