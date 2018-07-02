import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';

import formCss from '@folio/stripes-components/lib/sharedStyles/form.css';
import css from './StaffSlipEditor.css';

// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!react-quill/dist/quill.snow.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
import '!style-loader!css-loader!./quillCustom.css';

import PreviewModal from './PreviewModal';

class StaffSlipEditor extends Component {
  static propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.insertToken = this.insertToken.bind(this);
    this.openPreviewDialog = this.openPreviewDialog.bind(this);
    this.closePreviewDialog = this.closePreviewDialog.bind(this);

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
          [{
            token: [
              'Item title', 'Item barcode', 'Item call number',
              'Patron last name', 'Patron first name',
              'Transaction Id', 'Hold expiration'
            ]
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
    document.querySelector('.ql-token .ql-picker-label').innerHTML = '\{ \}';
  }

  onChange(template) {
    if (template !== this.props.input.value) {
      this.props.input.onChange(template);
      this.setState({ template });
    }
  }

  openPreviewDialog() {
    this.setState({ openDialog: true });
  }

  closePreviewDialog() {
    this.setState({ openDialog: false });
  }

  insertToken(value) {
    if (!value) return;
    const tag = `{${value}}`;
    const editor = this.quill.getEditor();
    const cursorPosition = editor.getSelection().index;
    editor.insertText(cursorPosition, tag);
    editor.setSelection(cursorPosition + tag.length);
  }

  translate(id) {
    return this.props.stripes.intl.formatMessage({
      id: `ui-circulation.settings.staffSlips.${id}`
    });
  }

  render() {
    const { template, openDialog } = this.state;
    const { label, input: { value }, name } = this.props;

    return (
      <div>
        <Row>
          <Col xs={12}>
            <Row bottom="xs">
              <Col xs={9}>
                <label htmlFor="editor" className={formCss.label}>{label}</label>
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
                <ReactQuill
                  id="editor"
                  value={value}
                  ref={(ref) => { this.quill = ref; }}
                  onChange={this.onChange}
                  modules={this.modules}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        {openDialog &&
          <PreviewModal
            previewTemplate={template || value}
            open={openDialog}
            onClose={this.closePreviewDialog}
          />
        }
      </div>
    );
  }
}

export default StaffSlipEditor;
