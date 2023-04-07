import sectionConfigGenerator from './section-config-generator';

describe('sectionConfigGenerator', () => {
  const isRecurring = jest.fn(() => false);
  const isBeforeOrAfter = jest.fn(() => false);
  const isSendOptionsAvailable = jest.fn(() => false);
  const isLoanDueDateTimeSelected = jest.fn(() => false);
  const isLostItemFeesSelected = jest.fn(() => false);
  const isFrequencyAvailable = jest.fn(() => false);
  const allowedIds = ['id'];
  const sectionKey = 'sectionKey';
  const policy = {
    [sectionKey]: [{
      isRecurring,
      sendOptions: {
        isBeforeOrAfter,
        isSendOptionsAvailable,
        isLoanDueDateTimeSelected,
        isLostItemFeesSelected,
        isFrequencyAvailable,
      },
    }],
  };

  beforeAll(() => {
    sectionConfigGenerator(policy, sectionKey, allowedIds);
  });

  it('should trigger "isRecurring"', () => {
    expect(isRecurring).toHaveBeenCalled();
  });

  it('should trigger "isBeforeOrAfter"', () => {
    expect(isBeforeOrAfter).toHaveBeenCalled();
  });

  it('should trigger "isSendOptionsAvailable" with correct argument', () => {
    expect(isSendOptionsAvailable).toHaveBeenCalledWith(allowedIds);
  });

  it('should trigger "isLoanDueDateTimeSelected"', () => {
    expect(isLoanDueDateTimeSelected).toHaveBeenCalled();
  });

  it('should trigger "isLostItemFeesSelected"', () => {
    expect(isLostItemFeesSelected).toHaveBeenCalled();
  });

  it('should trigger "isFrequencyAvailable" with correct argument', () => {
    expect(isFrequencyAvailable).toHaveBeenCalledWith(allowedIds);
  });

  describe('when "isSendOptionsAvailable" returns false', () => {
    let config;

    beforeAll(() => {
      config = sectionConfigGenerator(policy, sectionKey, allowedIds);
    });

    describe('when "isBeforeOrAfter" returns false', () => {
      it('should not validate "sendOptions.sendBy.duration"', () => {
        expect(config[`${sectionKey}[0].sendOptions.sendBy.duration`].shouldValidate).toBe(false);
      });

      it('should not validate "sendOptions.sendBy.intervalId"', () => {
        expect(config[`${sectionKey}[0].sendOptions.sendBy.intervalId`].shouldValidate).toBe(false);
      });
    });

    describe('when "isRecurring" returns false', () => {
      it('should not validate ".sendOptions.sendEvery.duration"', () => {
        expect(config[`${sectionKey}[0].sendOptions.sendEvery.duration`].shouldValidate).toBe(false);
      });

      it('should not validate ".sendOptions.sendEvery.intervalId"', () => {
        expect(config[`${sectionKey}[0].sendOptions.sendEvery.intervalId`].shouldValidate).toBe(false);
      });
    });
  });

  describe('when "isSendOptionsAvailable" returns true', () => {
    let config;
    const configPolicy = {
      [sectionKey]: [{
        isRecurring: jest.fn(() => true),
        sendOptions: {
          isBeforeOrAfter: jest.fn(() => true),
          isSendOptionsAvailable: jest.fn(() => true),
          isLoanDueDateTimeSelected,
          isFrequencyAvailable,
          isLostItemFeesSelected,
        },
      }],
    };

    beforeAll(() => {
      config = sectionConfigGenerator(configPolicy, sectionKey, allowedIds);
    });

    describe('when "isBeforeOrAfter" returns true', () => {
      it('should not validate "sendOptions.sendBy.duration"', () => {
        expect(config[`${sectionKey}[0].sendOptions.sendBy.duration`].shouldValidate).toBe(true);
      });

      it('should not validate "sendOptions.sendBy.intervalId"', () => {
        expect(config[`${sectionKey}[0].sendOptions.sendBy.intervalId`].shouldValidate).toBe(true);
      });
    });

    describe('when "isRecurring" returns true', () => {
      it('should not validate ".sendOptions.sendEvery.duration"', () => {
        expect(config[`${sectionKey}[0].sendOptions.sendEvery.duration`].shouldValidate).toBe(true);
      });

      it('should not validate ".sendOptions.sendEvery.intervalId"', () => {
        expect(config[`${sectionKey}[0].sendOptions.sendEvery.intervalId`].shouldValidate).toBe(true);
      });
    });
  });

  describe('when "isLoanDueDateTimeSelected" and "isLostItemFeesSelected" return true', () => {
    let config;

    beforeAll(() => {
      config = sectionConfigGenerator({
        [sectionKey]: [{
          isRecurring,
          sendOptions: {
            isBeforeOrAfter,
            isSendOptionsAvailable,
            isFrequencyAvailable,
            isLoanDueDateTimeSelected: () => true,
            isLostItemFeesSelected: () => true,
          },
        }],
      }, sectionKey, allowedIds);
    });

    it('should not validate ".realTime"', () => {
      expect(config[`${sectionKey}[0].realTime`].shouldValidate).toBe(true);
    });

    it('should not validate ".realTime"', () => {
      expect(config[`${sectionKey}[0].realTime`].shouldValidate).toBe(true);
    });
  });

  describe('when "isLoanDueDateTimeSelected" and "isLostItemFeesSelected" return false', () => {
    let config;

    beforeAll(() => {
      config = sectionConfigGenerator(policy, sectionKey, allowedIds);
    });

    it('should not validate ".realTime"', () => {
      expect(config[`${sectionKey}[0].realTime`].shouldValidate).toBe(false);
    });

    it('should not validate ".realTime"', () => {
      expect(config[`${sectionKey}[0].realTime`].shouldValidate).toBe(false);
    });
  });
});
