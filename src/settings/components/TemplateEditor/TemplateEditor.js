import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill, { Quill } from 'react-quill';

import {
  isNull,
  forEach,
  includes,
} from 'lodash';

import {
  Col,
  Row,
} from '@folio/stripes/components';

import TokensModal from './TokensModal';
import EditorToolbar from './EditorToolbar';
import PreviewModal from './PreviewModal';
import ControlHeader from './ControlHeader';
import ValidationContainer from './ValidationContainer';

import tokensReducer from '../../utils/tokens-reducer';
import IndentStyle from './Attributors/indent';

// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!react-quill/dist/quill.snow.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!./quillCustom.css';
import css from './TemplateEditor.css';

const AlignStyle = Quill.import('attributors/style/align');
const SizeStyle = Quill.import('attributors/style/size');

Quill.register(IndentStyle, true);
Quill.register(AlignStyle, true);
Quill.register(SizeStyle, true);

class TemplateEditor extends React.Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.node.isRequired,
    meta: PropTypes.object.isRequired,
    tokens: PropTypes.object.isRequired,
    tokensList: PropTypes.func.isRequired,
    previewModalHeader: PropTypes.node.isRequired,
    printable: PropTypes.bool,
  };

  static defaultProps = {
    printable: false,
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

  insertTokens = (tokens = {}) => {
    forEach(tokens, (tokensGroup) => {
      if (tokensGroup.isLoopSelected) {
        this.insertRepeatingTokens(tokensGroup.tokens, tokensGroup.tag);
      } else {
        this.insertRegualarTokens(tokensGroup.tokens);
      }
    });
  };

  insertRegualarTokens = (tokens) => {
    let tags = '';

    forEach(tokens, (token) => {
      tags += `{{${token}}}`;
    });

    const editor = this.quill.current.getEditor();
    const { index: cursorPosition } = editor.getSelection();
    editor.insertText(cursorPosition, tags);
    this.setState({ cursorPosition: cursorPosition + tags.length });
  };

  insertRepeatingTokens = (tokens, tag) => {
    let tags = '';
    const startTag = `{{#${tag}}}`;
    const endTag = `{{/${tag}}}`;

    const editor = this.quill.current.getEditor();
    const editorContent = editor.getText();
    const loopExists = includes(editorContent, startTag) && includes(editorContent, endTag);

    if (loopExists) {
      forEach(tokens, (token) => {
        tags += `{{${token}}}\n`;
      });
    } else {
      tags = `${startTag}`;
      forEach(tokens, (token) => {
        tags += `\n{{${token}}}`;
      });
      tags += `\n${endTag}`;
    }

    const cursorPosition = loopExists ? editorContent.indexOf(endTag) : editor.getSelection().index;
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
      tokensList,
      meta: {
        submitFailed,
        valid,
        touched,
        error,
      },
      previewModalHeader,
      printable,
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
                    id="template-editor"
                    className={css.editor}
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
          header={previewModalHeader}
          previewFormat={tokensReducer(tokens)}
          previewTemplate={value}
          printable={printable}
          onClose={this.closePreviewDialog}
        />
        <TokensModal
          isOpen={showTokensDialog}
          tokens={tokens}
          list={tokensList}
          onAdd={this.insertTokens}
          onCancel={this.closeTokenDialog}
        />
      </React.Fragment>
    );
  }
}

export default TemplateEditor;
