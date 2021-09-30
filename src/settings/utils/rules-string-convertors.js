import {
  get,
  has,
  forEach,
} from 'lodash';

import {
  POLICY,
  RULES_TYPE,
  EDITOR_KEYWORD,
  EDITOR_SPECIAL_SYMBOL,
} from '../../constants';

export function isPriorityLine(lineContent) {
  return lineContent.includes(EDITOR_KEYWORD.PRIORITY);
}

export function isCommentSymbol(symbol) {
  const {
    HASH,
    SLASH,
  } = EDITOR_SPECIAL_SYMBOL;

  return symbol === HASH || symbol === SLASH;
}

export function isWordsSeparatingSymbol(symbol) {
  const {
    PLUS,
    COLON,
  } = EDITOR_SPECIAL_SYMBOL;

  return symbol === ' ' || symbol === PLUS || symbol === COLON;
}

export function convertNamesToIdsInLine(line, records, itemsTypes) {
  if (isPriorityLine(line)) return line;

  let replacedString = '';
  let currentType = '';
  let currentWord = '';

  for (let i = 0; i < line.length; i++) {
    const currentCharacter = line[i];

    if (isCommentSymbol(currentCharacter)) {
      replacedString += line.substring(i);

      return replacedString;
    }

    const isWordsSeparator = isWordsSeparatingSymbol(currentCharacter);
    const isLastSymbol = i === line.length - 1;

    if (isLastSymbol && !isWordsSeparator && currentWord) {
      currentWord += currentCharacter;
    }

    if (isWordsSeparator || isLastSymbol) {
      if (currentWord) {
        if (currentType) {
          const itemPath = `${currentType}.${currentWord}`;

          if (has(records, itemPath)) {
            replacedString += get(records, itemPath);
            currentWord = '';
          }
        }

        if (itemsTypes.includes(currentWord)) {
          currentType = currentWord;
        }

        replacedString += currentWord;
        currentWord = '';
      }

      if (isWordsSeparator) {
        replacedString += currentCharacter;
      }
    } else if (!currentWord && currentCharacter === EDITOR_SPECIAL_SYMBOL.NEGATION) {
      replacedString += currentCharacter;
    } else {
      currentWord += currentCharacter;
    }
  }

  return replacedString;
}

export function convertNamesToIds(rulesStr, records) {
  const lines = rulesStr.split('\n');
  const itemsTypes = [...Object.values(POLICY), ...Object.values(RULES_TYPE)];
  let replacedString = '';

  for (let i = 0; i < lines.length; i++) {
    replacedString += convertNamesToIdsInLine(lines[i], records, itemsTypes);

    if (i !== lines.length - 1) {
      replacedString += '\n';
    }
  }

  return replacedString;
}

export function convertIdsToNames(rulesStr, records) {
  let convertedString = rulesStr;

  forEach(records, (currentTypeRecords) => {
    forEach(currentTypeRecords, (id, code) => {
      const re = new RegExp(id, 'g');

      convertedString = convertedString.replace(re, code);
    });
  });

  return convertedString;
}
