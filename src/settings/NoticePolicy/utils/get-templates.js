import { reduce } from 'lodash';

export default (templates = [], categoryName = '') => {
  return reduce(templates, (items, { id, name, category }) => {
    if (category === categoryName) {
      items.push({ value: id, label: name });
    }

    return items;
  }, []);
};
