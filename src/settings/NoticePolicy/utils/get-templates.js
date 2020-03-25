import { reduce } from 'lodash';

export default (templates = [], categoryName = '') => {
  return reduce(templates, (items, { id, name, category, active }) => {
    if (category === categoryName && active) {
      items.push({ value: id, label: name });
    }

    return items;
  }, []);
};
