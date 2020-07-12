import { reduce } from 'lodash';

const getSectionTokens = (section) => {
  return reduce(section, (tokensList, { token, previewValue }) => {
    return { ...tokensList, ...{ [token]: previewValue } };
  }, {});
};

export default (tokens) => {
  return reduce(tokens, (tokensList, section) => {
    return { ...tokensList, ...getSectionTokens(section) };
  }, {});
};
