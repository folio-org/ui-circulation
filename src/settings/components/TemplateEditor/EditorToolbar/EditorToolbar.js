import React from 'react';

const EditorToolbar = () => {
  return (
    <div id="toolbar">
      <span className="ql-formats">
        <button type="button" aria-label="bold" className="ql-bold" />
        <button type="button" aria-label="italic" className="ql-italic" />
        <button type="button" aria-label="underline" className="ql-underline" />
      </span>
      <span className="ql-formats">
        <button type="button" aria-label="ordered list" className="ql-list" value="ordered" />
        <button type="button" aria-label="bugllet list" className="ql-list" value="bullet" />
      </span>
      <span className="ql-formats">
        <button type="button" aria-label="decrease indent" className="ql-indent" value="-1" />
        <button type="button" aria-label="increase indent" data-test-increase-indent className="ql-indent" value="+1" />
      </span>
      <span className="ql-formats">
        <select className="ql-size">
          <option aria-label="10 pixels" value="10px" />
          <option aria-label="default size" defaultValue />
          <option aria-label="18 pixels" value="18px" />
          <option aria-label="32 pixels" value="32px" />
        </select>
      </span>
      <span className="ql-formats">
        <button type="button" aria-label="no align" className="ql-align" value="" />
        <button type="button" aria-label="center" className="ql-align" value="center" />
        <button type="button" aria-label="right" className="ql-align" value="right" />
        <button type="button" aria-label="justify" className="ql-align" value="justify" />
      </span>
      <span className="ql-formats">
        <button type="button" aria-label="link" className="ql-link" />
      </span>
      <span className="ql-formats">
        <button data-test-teplate-editor-tokens type="button" className="ql-token">
          {'{ }'}
        </button>
      </span>
    </div>
  );
};

export default EditorToolbar;
