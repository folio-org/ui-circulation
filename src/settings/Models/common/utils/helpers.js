import { some } from 'lodash';

const isValidItemSelected = (options, selectedId) => {
  return some(options, ({ id }) => id === selectedId);
};

export default { isValidItemSelected };
