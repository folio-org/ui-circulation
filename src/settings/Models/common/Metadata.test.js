import Metadata from './Metadata';
import { commonClassCheck } from '../../../../test/jest/helpers/utils';

const testMetadata = commonClassCheck.bind(null, Metadata);

describe('Metadata', () => {
  testMetadata();

  testMetadata({ createdByUserId: 'testCreatedByUserId' });

  testMetadata({ createdDate: 'testCreatedDate' });

  testMetadata({ updatedByUserId: 'testUpdatedByUserId' });

  testMetadata({ updatedDate: 'testUpdatedDate' });
});
