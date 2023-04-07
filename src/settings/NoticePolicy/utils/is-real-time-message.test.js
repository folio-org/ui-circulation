import isRealTimeMessage from './is-real-time-message';

describe('isRealTimeMessage', () => {
  const sendOptions = {
    isLoanDueDateTimeSelected: jest.fn(),
    isLostItemFeesSelected: jest.fn(),
  };

  describe('when "isLoanDueDateTimeSelected" and "isLostItemFeesSelected" return false', () => {
    sendOptions.isLoanDueDateTimeSelected.mockReturnValueOnce(false);
    sendOptions.isLostItemFeesSelected.mockReturnValueOnce(false);

    it('should return false', () => {
      expect(isRealTimeMessage(sendOptions)).toBe(false);
    });
  });

  describe('when "isLoanDueDateTimeSelected" and "isLostItemFeesSelected" return true', () => {
    sendOptions.isLoanDueDateTimeSelected.mockReturnValueOnce(true);
    sendOptions.isLostItemFeesSelected.mockReturnValueOnce(true);

    it('should return true', () => {
      expect(isRealTimeMessage(sendOptions)).toBe(true);
    });
  });

  describe('when "isLoanDueDateTimeSelected" returns true and "isLostItemFeesSelected" returns false', () => {
    sendOptions.isLoanDueDateTimeSelected.mockReturnValueOnce(true);
    sendOptions.isLostItemFeesSelected.mockReturnValueOnce(false);

    it('should return true', () => {
      expect(isRealTimeMessage(sendOptions)).toBe(true);
    });
  });

  describe('when "isLoanDueDateTimeSelected" returns false and "isLostItemFeesSelected" returns true', () => {
    sendOptions.isLoanDueDateTimeSelected.mockReturnValueOnce(false);
    sendOptions.isLostItemFeesSelected.mockReturnValueOnce(true);

    it('should return true', () => {
      expect(isRealTimeMessage(sendOptions)).toBe(true);
    });
  });
});
