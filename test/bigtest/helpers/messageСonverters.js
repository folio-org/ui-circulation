import translation from '../../../translations/ui-circulation/en';

export const getOptionsRepresentation = (array, value) => {
  const { label } = array.find((element) => {
    return element.value === value;
  });

  return label;
};

export const getBooleanRepresentation = (flag) => {
  return flag
    ? translation['settings.loanPolicy.yes']
    : translation['settings.loanPolicy.no'];
};

export const getRequiredLabel = (text) => `${text} *`;
