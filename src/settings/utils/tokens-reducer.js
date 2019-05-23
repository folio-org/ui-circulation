import { reduce } from 'lodash';

export default (tokens) => {
  return reduce(tokens, (acc, category) => {
    return { ...acc, ...category };
  }, {});
};
