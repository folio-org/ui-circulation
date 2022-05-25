import fines from './fines';
import { FINE_POLICY_PATH } from '../../../constants/Validation/fine-policy';

const finesTest = (finePolicy, shouldValidateFields) => {
  Object.values(FINE_POLICY_PATH).forEach(path => {
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
      FINE_POLICY_PATH.OVERDUE_FINE_INTERVAL_ID,
      FINE_POLICY_PATH.MAX_OVERDUE_FINE,
    ]);
  });

  it('should validate correct fields if "isOverdueRecallFine" returns true', () => {
    finesTest({
      ...defaultFinePolicy,
      isOverdueRecallFine: () => true,
    }, [
      FINE_POLICY_PATH.OVERDUE_RECALL_FINE_INTERVAL_ID,
      FINE_POLICY_PATH.MAX_OVERDUE_RECALL_FINE,
    ]);
  });

  it(`should validate correct fields if "isIntervalSelected" returns true for "${FINE_POLICY_PATH.OVERDUE_FINE_INTERVAL_ID}"`, () => {
    finesTest({
      ...defaultFinePolicy,
      isIntervalSelected: (path) => path === FINE_POLICY_PATH.OVERDUE_FINE_INTERVAL_ID,
    }, [FINE_POLICY_PATH.OVERDUE_FINE_QUANTITY]);
  });

  it(`should validate correct fields if "isIntervalSelected" returns true for "${FINE_POLICY_PATH.OVERDUE_RECALL_FINE_INTERVAL_ID}"`, () => {
    finesTest({
      ...defaultFinePolicy,
      isIntervalSelected: (path) => path === FINE_POLICY_PATH.OVERDUE_RECALL_FINE_INTERVAL_ID,
    }, [FINE_POLICY_PATH.OVERDUE_RECALL_FINE_QUANTITY]);
  });

  [
    FINE_POLICY_PATH.OVERDUE_FINE_QUANTITY,
    FINE_POLICY_PATH.OVERDUE_RECALL_FINE_QUANTITY,
    FINE_POLICY_PATH.MAX_OVERDUE_FINE,
    FINE_POLICY_PATH.MAX_OVERDUE_RECALL_FINE,
  ].forEach(currentPath => {
    it(`should validate correct fields if "hasNonZeroValue" returns true for "${currentPath}"`, () => {
      finesTest({
        ...defaultFinePolicy,
        hasNonZeroValue: (path) => path === currentPath,
      }, [currentPath]);
    });
  });
});
