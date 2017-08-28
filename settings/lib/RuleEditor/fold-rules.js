const initFoldRules = (CodeMirror) => {
  CodeMirror.registerHelper('fold', 'rules', function (cm, start) {
    // if we don't find a starting '#' character in the line indicating a new rule, return...
    let text = cm.getLine(start.line);
    if (!/^\s*#/.test(text)) return;

    let lastLineInFold = null;
    // loop through lines...
    for (var i = start.line + 1, end = cm.lastLine(); i <= end; ++i) {
      text = cm.getLine(i)
      if (!/^\s*#/.test(text)) { // if a line doesn't begin with '#', include it..
        lastLineInFold = i;
      } else { // if we find a rule's title line, break the loop
        break;
      }
    }

    // return the pair of positions representing the starting line and ending line of fold-able section.
    if (lastLineInFold) return {
      from: CodeMirror.Pos(start.line, cm.getLine(start.line).length),
      to: CodeMirror.Pos(lastLineInFold, cm.getLine(lastLineInFold).length)
    };
  });
}

export default initFoldRules;