import fines from './fines';
import { PATH } from '../../../constants/Validation/fine-policy';

const finesTest = (finePolicy, shouldValidateFields) => {
  Object.values(PATH).forEach(path => {
    const resultPolicy = fines(finePolicy);

    expect(resultPolicy[path].shouldValidate).toBe(['name', ...shouldValidateFields].includes(path));
  });
};

const defaultFinePolicy = {
  hasNonZeroValue: () => false,
  isIntervalSelected: () => false,
  isOverdueFine: () => false,
  isOverdueRecallFine: () => false,
};

describe('fines', () => {
  it('should validate "name" field in any case', () => {
    finesTest(defaultFinePolicy, []);
  });

  it('should validate correct fields if "isOverdueFine" returns true', () => {
    finesTest({
      ...defaultFinePolicy,
      isOverdueFine: () => true,
    }, [
      PATH.OVERDUE_FINE_INTERVAL_ID,
      PATH.MAX_OVERDUE_FINE,
    ]);
  });

  it('should validate correct fields if "isOverdueRecallFine" returns true', () => {
    finesTest({
      ...defaultFinePolicy,
      isOverdueRecallFine: () => true,
    }, [
      PATH.OVERDUE_RECALL_FINE_INTERVAL_ID,
      PATH.MAX_OVERDUE_RECALL_FINE,
    ]);
  });

  it(`should validate correct fields if "isIntervalSelected" returns true for "${PATH.OVERDUE_FINE_INTERVAL_ID}"`, () => {
    finesTest({
      ...defaultFinePolicy,
      isIntervalSelected: (path) => path === PATH.OVERDUE_FINE_INTERVAL_ID,
    }, [PATH.OVERDUE_FINE_QUANTITY]);
  });

  it(`should validate correct fields if "isIntervalSelected" returns true for "${PATH.OVERDUE_RECALL_FINE_INTERVAL_ID}"`, () => {
    finesTest({
      ...defaultFinePolicy,
      isIntervalSelected: (path) => path === PATH.OVERDUE_RECALL_FINE_INTERVAL_ID,
    }, [PATH.OVERDUE_RECALL_FINE_QUANTITY]);
  });

  [
    PATH.OVERDUE_FINE_QUANTITY,
    PATH.OVERDUE_RECALL_FINE_QUANTITY,
    PATH.MAX_OVERDUE_FINE,
    PATH.MAX_OVERDUE_RECALL_FINE,
  ].forEach(currentPath => {
    it(`should validate correct fields if "hasNonZeroValue" returns true for "${currentPath}"`, () => {
      finesTest({
        ...defaultFinePolicy,
        hasNonZeroValue: (path) => path === currentPath,
      }, [currentPath]);
    });
  });
});
