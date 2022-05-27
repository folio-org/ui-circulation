import Schedule from './Schedule';
import {
  commonClassCheckWithoutProps,
  commonClassCheckForEachProp,
  commonClassCheckForAllProps,
} from '../../../../test/jest/helpers';

describe('Schedule', () => {
  const testData = {
    from: 'testFrom',
    to: 'testTo',
    due: 'testDue',
  };

  commonClassCheckWithoutProps(Schedule);

  commonClassCheckForEachProp(Schedule, testData);

  commonClassCheckForAllProps(Schedule, testData);
});
