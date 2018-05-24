import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import '!style-loader!css-loader!react-quill/dist/quill.snow.css';

class StaffSlipEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(editorState) {
    this.setState({
      editorState,
    });
  };

  render() {
    return (
      <ReactQuill value={this.state.text} onChange={this.onChange} />
    )
  }
}

export default StaffSlipEditor;
