import React from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
} from 'react-intl';

const EditorToolbar = ({
  intl: {
    formatMessage,
  }
}) => {
  return (
    <div id="toolbar">
      <span className="ql-formats">
        <button
          type="button"
          aria-label={formatMessage({ id: 'stripes-template-editor.toolbar.text.bold' })}
          className="ql-bold"
        />
        <button
          type="button"
          aria-label={formatMessage({ id: 'stripes-template-editor.toolbar.text.italic' })}
          className="ql-italic"
        />
        <button
          type="button"
          aria-label={formatMessage({ id: 'stripes-template-editor.toolbar.text.underline' })}
          className="ql-underline"
        />
      </span>
      <span className="ql-formats">
        <button
          type="button"
          aria-label={formatMessage({ id: 'stripes-template-editor.toolbar.list.ordered' })}
          className="ql-list"
          value="ordered"
        />
        <button
          type="button"
          aria-label={formatMessage({ id: 'stripes-template-editor.toolbar.list.bullet' })}
          className="ql-list"
          value="bullet"
        />
      </span>
      <span className="ql-formats">
        <button
          type="button"
          aria-label={formatMessage({ id: 'stripes-template-editor.toolbar.indent.decrease' })}
          className="ql-indent"
          value="-1"
        />
        <button
          type="button"
          aria-label={formatMessage({ id: 'stripes-template-editor.toolbar.indent.increase' })}
          data-test-increase-indent
          className="ql-indent"
          value="+1"
        />
      </span>
      <span className="ql-formats">
        <select className="ql-size">
          <option
            aria-label={formatMessage({ id: 'stripes-template-editor.toolbar.size.small' })}
            value="10px"
          />
          <option
            aria-label={formatMessage({ id: 'stripes-template-editor.toolbar.size.normal' })}
            defaultValue
          />
          <option
            aria-label={formatMessage({ id: 'stripes-template-editor.toolbar.size.large' })}
            value="18px"
          />
          <option
            aria-label={formatMessage({ id: 'stripes-template-editor.toolbar.size.huge' })}
            value="32px"
          />
        </select>
      </span>
      <span className="ql-formats">
        <button
          type="button"
          aria-label={formatMessage({ id: 'stripes-template-editor.toolbar.align.noAlign' })}
          className="ql-align"
          value=""
        />
        <button
          type="button"
          aria-label={formatMessage({ id: 'stripes-template-editor.toolbar.align.center' })}
          className="ql-align"
          value="center"
        />
        <button
          type="button"
          aria-label={formatMessage({ id: 'stripes-template-editor.toolbar.align.right' })}
          className="ql-align"
          value="right"
        />
        <button
          type="button"
          aria-label={formatMessage({ id: 'stripes-template-editor.toolbar.align.justify' })}
          className="ql-align"
          value="justify"
        />
      </span>
      <span className="ql-formats">
        <button
          type="button"
          aria-label={formatMessage({ id: 'stripes-template-editor.toolbar.link' })}
          className="ql-link"
        />
      </span>
      <span className="ql-formats">
        <button
          data-test-teplate-editor-tokens
          type="button"
          className="ql-token"
        >
          {'{ }'}
        </button>
      </span>
    </div>
  );
};

EditorToolbar.propTypes = {
  intl: PropTypes.object,
};

export default injectIntl(EditorToolbar);
