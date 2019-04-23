import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ReactQuill from 'react-quill';
import {
  Button,
  Col,
  Row,
} from '@folio/stripes/components';
// import formCss from '@folio/stripes-components/lib/sharedStyles/form.css';


// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!react-quill/dist/quill.snow.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!./quillCustom.css';

import PreviewModal from './PreviewModal';
import css from './PatronNoticeEditor.css';

class PatronNoticeEditor extends Component {
  static propTypes = {
    input: PropTypes.object,
    label: PropTypes.object,
    tokens: PropTypes.arrayOf(PropTypes.string),
    meta: PropTypes.shape({
      touched: PropTypes.bool.isRequired,
      submitFailed: PropTypes.bool.isRequired,
      valid: PropTypes.bool.isRequired,
      error: PropTypes.node.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.insertToken = this.insertToken.bind(this);
    this.openPreviewDialog = this.openPreviewDialog.bind(this);
    this.closePreviewDialog = this.closePreviewDialog.bind(this);
    this.token = props.tokens;

    this.modules = {
      history: {
        delay: 1000,
        userOnly: false
      },
      toolbar: {
        container:
        [
          ['undo', 'redo'],
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
          ['link'],
          [{
            token: this.token
          }]
        ],
        handlers: {
          token: this.insertToken,
          undo: () => this.quill.history.undo(),
          redo: () => this.quill.history.redo()
        }
      }
    };

    this.state = { openDialog: false };
  }

  componentDidMount() {
    Array.prototype.slice.call(document.querySelectorAll('.ql-token .ql-picker-item'))
    // eslint-disable-next-line no-return-assign
      .forEach(item => (item.textContent = item.dataset.value));
    // eslint-disable-next-line no-useless-escape
    document.querySelector('.ql-token .ql-picker-label').innerHTML = '\{\ \}';
  }

  onChange(template) {
    if (template !== this.props.input.value) {
      this.props.input.onChange(template);
      this.setState({ template });
    }
  }

  onBlur() {
    const {
      input: {
        value,
        onBlur,
      },
    } = this.props;

    onBlur(value);
  }

  openPreviewDialog() {
    this.setState({ openDialog: true });
  }

  closePreviewDialog() {
    this.setState({ openDialog: false });
  }

  insertToken(value) {
    if (!value) return;

    let tag;
    let insertionLength;
    // If the value selected is a special iterator (e.g. #items), print an
    // opening and closing tag and position the cursor between them. Otherwise,
    // print a single tag and move the cursor to the end.
    if (value.indexOf('#') === 0) {
      tag = `{{${value}}}\n\n{{/${value.substring(1)}}}`;
      insertionLength = value.length + 5;
    } else {
      tag = `{{${value}}}`;
      insertionLength = tag.length;
    }

    const editor = this.quill.getEditor();
    const cursorPosition = editor.getSelection().index;
    editor.insertText(cursorPosition, tag);
    editor.setSelection(cursorPosition + insertionLength);
  }

  render() {
    const { template, openDialog } = this.state;
    const {
      label,
      input: {
        value,
      },
      meta: {
        submitFailed,
        valid,
        touched,
      }
    } = this.props;

    return (
      <div>
        <Row>
          <Col xs={12}>
            <Row bottom="xs">
              <Col xs={9}>
                <label
                  htmlFor="editor"
                  className={css.label}
                >
                  {label}
                </label>
              </Col>
              <Col xs={3}>
                <Row className={css.preview}>
                  <Col>
                    <Button bottomMargin0 onClick={this.openPreviewDialog}><FormattedMessage id="ui-circulation.settings.patronNotices.preview" /></Button>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <ReactQuill
                  id="patron-notice-editor"
                  value={value}
                  ref={(ref) => { this.quill = ref; }}
                  onChange={this.onChange}
                  onBlur={this.onBlur}
                  modules={this.modules}
                  {... (touched || submitFailed) && !valid ? { className: css.error } : {}}
                />
              </Col>
            </Row>
            { (touched || submitFailed) && !valid &&
              <Row>
                <Col
                  id="patron-notice-error-container"
                  xs={12}
                  className={css.errorMessage}
                >
                  {this.props.meta.error}
                </Col>
              </Row>
            }
          </Col>
        </Row>
        {openDialog &&
          <PreviewModal
            previewTemplate={template || value}
            open={openDialog}
            onClose={this.closePreviewDialog}
            slipType="Any"
          />
        }
      </div>
    );
  }
}

export default PatronNoticeEditor;
