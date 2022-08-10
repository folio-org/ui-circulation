import { isString } from 'lodash';

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

function fetchHints(hint, cm, options, callback) {
  if (hint.async) {
    return hint(cm, callback, options);
  }

  const result = hint(cm, options);
  const isPromise = result && result.then;

  if (isPromise) {
    return result.then(callback);
  }

  return callback(result);
}

function getApplicableHelpers(cm, helpers) {
  if (!cm.somethingSelected()) {
    return helpers;
  }

  return helpers.filter(helper => helper.supportsSelection);
}

function isTextInputField(element) {
  return element && element.tagName.toLowerCase() === 'input' && element.type === 'text';
}

function isChildTextInputField(container, element) {
  return isTextInputField(element) && container.contains(element);
}

function isAnyItem(itemId) {
  return itemId && itemId.includes('any');
}

function createContainer(className = '') {
  const divElement = document.createElement('div');

  divElement.className = className;

  return divElement;
}

function createHeader(text, className = '') {
  const header = createContainer(className);

  header.innerHTML = text;

  return header;
}

function getText(completion) {
  return isString(completion) ? completion : completion.text;
}

function showHint(cm, getHints, options) {
  if (!getHints) {
    return cm.showHint(options);
  }

  if (options && options.async) getHints.async = true;

  const newOptions = { hint: getHints, ...options };

  return cm.showHint(newOptions);
}

export default {
  addIndentToEditorRules,
  fetchHints,
  getApplicableHelpers,
  isTextInputField,
  isChildTextInputField,
  isAnyItem,
  createContainer,
  createHeader,
  getText,
  showHint,
};
