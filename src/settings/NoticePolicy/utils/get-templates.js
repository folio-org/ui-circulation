import { reduce } from 'lodash';

export default (templates = [], allowedCategories = []) => {
  return reduce(templates, (items, { id, name, category, active }) => {
    if (active && allowedCategories.includes(category)) {
      items.push({ value: id, label: name });
    }

    return items;
  }, []);
};
