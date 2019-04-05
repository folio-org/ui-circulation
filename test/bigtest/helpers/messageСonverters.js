import translation from '../../../translations/ui-circulation/en';
import { intervalPeriods } from '../../../src/constants';

export const getOptionsRepresentation = (array, value) => {
  const { label } = array.find((element) => {
    return element.value === value;
  });

  return translation[label.slice(label.indexOf('.') + 1)];
};

export const getBooleanRepresentation = (flag) => {
  return flag
    ? translation['settings.loanPolicy.yes']
    : translation['settings.loanPolicy.no'];
};

export const getPeriodRepresentation = (period) => {
  const interval = getOptionsRepresentation(intervalPeriods, period.intervalId);

  return `${period.duration} ${interval}`;
};

export const getRequiredLabel = (text) => `${text} *`;

export const toLowercaseReplaceAllSpaces = (text, newSubstr = '-') => text.toLowerCase()
  .split(' ')
  .join(newSubstr);
