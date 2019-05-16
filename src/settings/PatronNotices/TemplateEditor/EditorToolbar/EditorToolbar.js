import React from 'react';

class EditorToolbar extends React.Component {
  render() {
    return (
      <div id="toolbar">
        <span className="ql-formats">
          <button type="button" className="ql-bold" />
          <button type="button" className="ql-italic" />
          <button type="button" className="ql-underline" />
        </span>
        <span className="ql-formats">
          <button type="button" className="ql-list" value="ordered" />
          <button type="button" className="ql-list" value="bullet" />
        </span>
        <span className="ql-formats">
          <button type="button" className="ql-indent" value="-1" />
          <button type="button" className="ql-indent" value="+1" />
        </span>
        <span className="ql-formats">
          <select className="ql-size">
            <option value="small" />
            <option selected />
            <option value="large" />
            <option value="huge" />
          </select>
        </span>
        <span className="ql-formats">
          <button type="button" className="ql-align" value="" />
          <button type="button" className="ql-align" value="center" />
          <button type="button" className="ql-align" value="right" />
          <button type="button" className="ql-align" value="justify" />
        </span>
        <span className="ql-formats">
          <button type="button" className="ql-link" />
        </span>
        <span className="ql-formats">
          <button type="button" className="ql-token">
            {'{ }'}
          </button>
        </span>
      </div>
    );
  }
}

export default EditorToolbar;
