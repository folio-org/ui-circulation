export const addSpaceToCMRules = (rule, position) => {
  switch (position) {
    case 'before':
      return ` ${rule}`;
    case 'after':
      return `${rule} `;
    default:
      return rule;
  }
};
