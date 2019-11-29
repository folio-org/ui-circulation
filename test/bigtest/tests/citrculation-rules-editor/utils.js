export const removeDisplayedHints = () => {
  const hints = document.getElementsByClassName('CodeMirror-hints');

  for (let i = 0; i < hints.length; i++) {
    hints[i].parentNode.removeChild(hints[i]);
  }
};

// shows hints with custom 'customKeys' handlers like 'handleBackspace' attached
export const showHintsWithAttachedCustomKeysHandlers = async (editor, editorValue) => {
  await editor.setValue(editorValue, { showHint: false });
  await editor.textArea.focus();
};
