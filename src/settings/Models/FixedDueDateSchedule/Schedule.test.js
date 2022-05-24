import Schedule from './Schedule';
import {
  commonClassCheckForEachProp,
  commonClassCheckForAllProps,
} from '../../../../test/jest/helpers';

describe('Schedule', () => {
  const testData = {
    from: 'testFrom',
    to: 'testTo',
    due: 'testDue',
  };

  commonClassCheckForEachProp(Schedule, testData);

  commonClassCheckForAllProps(Schedule, testData);
});
