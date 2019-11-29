import {
  describe,
  it,
} from '@bigtest/mocha';
import { faker } from '@bigtest/mirage';
import { expect } from 'chai';

import {
  convertIdsToNames,
  convertNamesToIds,
} from '../../../../src/settings/utils/rules-string-convertors';
import {
  RULES_TYPE,
  POLICY,
} from '../../../../src/constants';

describe('Rules string convertors', () => {
  const generateCode = (type, number) => {
    return type + number;
  };

  const generateRecords = (recordsAmount) => {
    const typeSymbols = [...Object.values(RULES_TYPE), ...Object.values(POLICY)];
    const records = {};

    typeSymbols.forEach((currentSymbol) => {
      records[currentSymbol] = {};

      for (let i = 0; i < recordsAmount; i++) {
        records[currentSymbol][generateCode(currentSymbol, i)] = faker.random.uuid();
      }
    });

    return records;
  };

  const generateCriteriaString = (type, recordNumber, records, isCodeUsed) => {
    const criteriaValue = isCodeUsed ? generateCode(type, recordNumber) : records[type][generateCode(type, recordNumber)];

    return `${type} ${criteriaValue}`;
  };

  const generatePoliciesString = (recordNumber, records, isCodeUsed) => {
    let policiesString = '';

    Object.values(POLICY).forEach((policy) => {
      policiesString += `${generateCriteriaString(policy, recordNumber, records, isCodeUsed)} `;
    });

    return policiesString;
  };

  const generateRule = (type, records, isCodeUsed = false, recordNumber = 0) => {
    const criteria = generateCriteriaString(type, recordNumber, records, isCodeUsed);
    const policiesString = generatePoliciesString(recordNumber, records, isCodeUsed);

    return `${criteria} : ${policiesString}`;
  };

  const recordsAmount = 2;
  const records = generateRecords(recordsAmount);

  it('should convert ids to names correctly for all policy and criteria types', () => {
    const criteriaTypeSymbols = Object.values(RULES_TYPE);
    let idsString = '';
    let namesString = '';

    criteriaTypeSymbols.forEach((criteriaTypeSymbol) => {
      idsString += `${generateRule(criteriaTypeSymbol, records)}\n`;
      namesString += `${generateRule(criteriaTypeSymbol, records, true)}\n`;
    });

    expect(convertIdsToNames(idsString, records)).to.equal(namesString);
  });

  it('should left priority line as it is', () => {
    const namesString = 'priority: t, s, c, b, a, m, g';

    expect(convertNamesToIds(namesString, records)).to.equal(namesString);
  });

  it('should convert names to ids correctly for all policy and criteria types', () => {
    const criteriaTypeSymbols = Object.values(RULES_TYPE);
    let idsString = '';
    let namesString = '';

    criteriaTypeSymbols.forEach((criteriaTypeSymbol) => {
      idsString += `${generateRule(criteriaTypeSymbol, records)}\n`;
      namesString += `${generateRule(criteriaTypeSymbol, records, true)}\n`;
    });

    expect(convertNamesToIds(namesString, records)).to.equal(idsString);
  });

  it('should handle comment lines correctly', () => {
    const { MATERIAL } = RULES_TYPE;
    const rule = generateRule(MATERIAL, records);
    const slashCommentLine = `/${rule}`;
    const dashCommentLine = '#Rule header';
    const namesString = `${slashCommentLine} \n ${rule} \n ${dashCommentLine}`;
    const idsString = `${slashCommentLine} \n ${generateRule(MATERIAL, records)} \n ${dashCommentLine}`;

    expect(convertNamesToIds(namesString, records)).to.equal(idsString);
  });

  it('should handle negotiation correctly', () => {
    const { MATERIAL } = RULES_TYPE;
    const recordNumber = 0;
    const recordCode = generateCode(MATERIAL, recordNumber);
    const namesString = `${MATERIAL} !${recordCode}: ${generatePoliciesString(recordNumber, records, true)}`;
    const idsString = `${MATERIAL} !${records[MATERIAL][recordCode]}: ${generatePoliciesString(recordNumber, records)}`;

    expect(convertNamesToIds(namesString, records)).to.equal(idsString);
  });

  it('should handle plus sign correctly', () => {
    const {
      MATERIAL,
      INSTITUTION,
    } = RULES_TYPE;
    const recordNumber = 0;
    const materialTypeCode = generateCode(MATERIAL, recordNumber);
    const materialTypeId = records[MATERIAL][materialTypeCode];
    const institutionCode = generateCode(INSTITUTION, recordNumber);
    const institutionId = records[INSTITUTION][institutionCode];
    const policiesNamesString = generatePoliciesString(recordNumber, records, true);
    const policiesIdsString = generatePoliciesString(recordNumber, records);
    const namesString = `${MATERIAL} ${materialTypeCode} + ${INSTITUTION} ${institutionCode}: ${policiesNamesString}`;
    const idsString = `${MATERIAL} ${materialTypeId} + ${INSTITUTION} ${institutionId}: ${policiesIdsString}`;

    expect(convertNamesToIds(namesString, records)).to.equal(idsString);
  });

  it('should handle multiple criteria names separated by space', () => {
    const { MATERIAL } = RULES_TYPE;
    const recordCode = generateCode(MATERIAL, 0);
    const record2Code = generateCode(MATERIAL, 1);
    const materialTypes = records[MATERIAL];
    const namesString = `${MATERIAL} ${recordCode} ${record2Code}: ${generatePoliciesString(0, records, true)}`;
    const idsString = `${MATERIAL} ${materialTypes[recordCode]} ${materialTypes[record2Code]}: ${generatePoliciesString(0, records)}`;

    expect(convertNamesToIds(namesString, records)).to.equal(idsString);
  });
});
