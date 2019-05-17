import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import {
  isEmpty,
  isNull,
  forEach,
} from 'lodash';

import {
  Col,
  Row,
} from '@folio/stripes/components';

import TokensModal from './TokensModal';
import EditorToolbar from './EditorToolbar';
import PreviewModal from '../PreviewModal';
import ControlHeader from './ControlHeader';
import ValidationContainer from './ValidationContainer';

// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!react-quill/dist/quill.snow.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!./quillCustom.css';
import css from './TemplateEditor.css';

class TemplateEditor extends React.Component {
  static propTypes = {
    input: PropTypes.object,
    label: PropTypes.object,
    tokens: PropTypes.arrayOf(PropTypes.string),
    meta: PropTypes.shape({
      touched: PropTypes.bool.isRequired,
      submitFailed: PropTypes.bool.isRequired,
      valid: PropTypes.bool.isRequired,
      error: PropTypes.node,
    }).isRequired,
    list: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.quill = React.createRef();

    this.modules = {
      toolbar: {
        container: '#toolbar',
        handlers: {
          token: this.openTokenDialog,
        }
      }
    };

    this.state = {
      openDialog: false,
      showTokensDialog: false,
      cursorPosition: null,
    };
  }

  onChange = (value) => {
    const { onChange } = this.props.input;
    const { cursorPosition } = this.state;

    onChange(value);

    if (!isNull(cursorPosition)) {
      this.quill.current.editor.setSelection(cursorPosition);
      this.setState({ cursorPosition: null });
    }
  }

  onBlur = () => {
    const {
      input: {
        value,
        onBlur,
      },
    } = this.props;

    onBlur(value);
  }

  openPreviewDialog = () => {
    this.setState({ openDialog: true });
  }

  closePreviewDialog = () => {
    this.setState({ openDialog: false });
  }

  openTokenDialog = () => {
    this.setState({ showTokensDialog: true });
  };

  closeTokenDialog = () => {
    this.setState({ showTokensDialog: false });
    this.quill.current.focus();
  };

  insertTokens = (tokens = []) => {
    if (isEmpty(tokens)) {
      return;
    }

    let tags = '';

    forEach(tokens, (token) => {
      tags += `{{${token}}}`;
    });

    const editor = this.quill.current.getEditor();
    const { index: cursorPosition } = editor.getSelection();
    editor.insertText(cursorPosition, tags);
    this.setState({ cursorPosition: cursorPosition + tags.length });
  };

  render() {
    const {
      openDialog,
      showTokensDialog,
    } = this.state;

    const {
      label,
      tokens,
      input: { value },
      list,
      meta: {
        submitFailed,
        valid,
        touched,
        error,
      },
    } = this.props;

    const invalid = (touched || submitFailed) && !valid && !showTokensDialog;

    return (
      <React.Fragment>
        <Row>
          <Col xs={12}>
            <ControlHeader
              label={label}
              onPreviewClick={this.openPreviewDialog}
            />
            <Row>
              <Col xs={12}>
                <div {... invalid ? { className: css.error } : {}}>
                  <EditorToolbar />
                  <ReactQuill
                    id="patron-notice-editor"
                    value={value}
                    ref={this.quill}
                    modules={this.modules}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                  />
                </div>
              </Col>
            </Row>
            { invalid && <ValidationContainer error={error} /> }
          </Col>
        </Row>
        <PreviewModal
          open={openDialog}
          slipType="Any"
          previewTemplate={value}
          onClose={this.closePreviewDialog}
        />
        <TokensModal
          isOpen={showTokensDialog}
          tokens={tokens}
          list={list}
          onAdd={this.insertTokens}
          onCancel={this.closeTokenDialog}
        />
      </React.Fragment>
    );
  }
}

export default TemplateEditor;
