import Metadata from './Metadata';
import {
  commonClassCheckForEachProp,
  commonClassCheckForAllProps,
} from '../../../../test/jest/helpers/utils';

describe('Metadata', () => {
  const testData = {
    createdByUserId: 'testCreatedByUserId',
    createdDate: 'testCreatedDate',
    updatedByUserId: 'testUpdatedByUserId',
    updatedDate: 'testUpdatedDate',
  };

  commonClassCheckForEachProp(Metadata, testData);

  commonClassCheckForAllProps(Metadata, testData);
});
