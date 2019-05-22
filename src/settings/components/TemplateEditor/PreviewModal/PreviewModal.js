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

import templateResolver from '../../../utils/template-resolver';
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
          <FormattedMessage id="ui-circulation.settings.common.close" />
        </Button>
        <ReactToPrint
          trigger={() => (
            <Button
              buttonStyle="primary"
              marginBottom0
            >
              <FormattedMessage id="ui-circulation.settings.common.print" />
            </Button>
          )}
          content={() => this.editorRef.current}
        />
      </div>
    );

    const footer = (
      <React.Fragment>
        <Button
          buttonStyle="primary"
          marginBottom0
          onClick={onClose}
        >
          <FormattedMessage id="ui-circulation.settings.common.close" />
        </Button>
      </React.Fragment>
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
          className="ql-editor"
          ref={this.editorRef}
        >
          {contentComponent}
        </div>
      </Modal>
    );
  }
}

export default PreviewModal;
