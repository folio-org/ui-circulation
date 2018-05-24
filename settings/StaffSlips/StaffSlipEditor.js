import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import '!style-loader!css-loader!react-quill/dist/quill.snow.css';
import '!style-loader!css-loader!./StaffSlipEditor.css';

const Toolbar = () => (
  <div id="toolbar">
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <select className="ql-insertCustomTags">
      <option value="1">One</option>
      <option value="2">Two</option>
    </select>
  </div>
);

class StaffSlipEditor extends Component {
  static insertCustomTags(text) {
    if (!text) return;

    const tag = "{" + text + "}";
    const cursorPosition = this.quill.getSelection().index;
    this.quill.insertText(cursorPosition, tag);
    this.quill.setSelection(cursorPosition + tag.length);
  }

  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.onChange = this.onChange.bind(this);
  }

  onChange(text) {
    this.setState({ text });
  };

  render() {
    return (
      <div>
        <div id="toolbar">
          <button className="ql-bold"></button>
          <button className="ql-italic"></button>
          <select className="ql-insertCustomTags">
            <option value="">Insert token</option>
            <option value="Item title">Item title</option>
            <option value="Item barcode">Item barcode</option>
            <option value="Item call number">Item call number</option>
            <option value="Item barcode">Item type</option>
            <option value="Patron last name">Patron last name</option>
            <option value="Patron first name">Patron first name</option>
            <option value="Transaction Id">Transaction ID</option>
            <option value="Hold Expiration">Hold expiration</option>
          </select>
        </div>
        <ReactQuill
          value={this.state.text}
          onChange={this.onChange}
          modules={StaffSlipEditor.modules}
        />
      </div>
    )
  }
}

StaffSlipEditor.modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      insertCustomTags: StaffSlipEditor.insertCustomTags
    }
  }
}

export default StaffSlipEditor;
