import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import '!style-loader!css-loader!react-quill/dist/quill.snow.css';
import '!style-loader!css-loader!./StaffSlipEditor.css';

class StaffSlipEditor extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.insertToken = this.insertToken.bind(this);
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
          undo: function(value) {
            this.quill.history.undo();
          },
          redo: function(value) {
            this.quill.history.redo();
          }
        }
      }
    };
  }

  componentDidMount() {
    Array.prototype.slice.call(
      document.querySelectorAll('.ql-token .ql-picker-item')
    ).forEach(item => item.textContent = item.dataset.value);
    document.querySelector('.ql-token .ql-picker-label').innerHTML = '\{ \}';
  }

  onChange(text) {
    if (text !== this.props.input.value) {
      this.props.input.onChange(text);
    }
  };

  insertToken(value) {
    if (!value) return;
    const tag = `{${value}}`;
    const editor = this.quill.getEditor();
    const cursorPosition = editor.getSelection().index;
    editor.insertText(cursorPosition, tag);
    editor.setSelection(cursorPosition + tag.length);
  }

  render() {
    return (
      <ReactQuill
        value={this.props.input.value}
        ref={(ref) => { this.quill = ref; }}
        onChange={this.onChange}
        modules={this.modules}
      />
    );
  }
}

export default StaffSlipEditor;
