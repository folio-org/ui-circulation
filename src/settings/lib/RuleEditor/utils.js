const addIndentToEditorRules = (rule, position) => {
  switch (position) {
    case 'before':
      return ` ${rule}`;
    case 'after':
      return `${rule} `;
    default:
      return rule;
  }
};

export default addIndentToEditorRules;
