import lostItemFee from './lost-item-fee';

describe('lostItemFee', () => {
  const basicLostItemPolicy = {
    hasInterval: () => true,
    hasValue: () => true,
    hasPassedValue: () => true,
    hasPositiveValue: () => true,
    isRquiredLostItemCharge: () => true,
    hasNonZeroValue: () => true,
  };

  describe('"itemAgedLostOverdue.duration"', () => {
    describe('when "hasValue" and "hasInterval" return true', () => {
      const {
        'itemAgedLostOverdue.duration': {
          rules,
          shouldValidate,
        },
      } = lostItemFee(basicLostItemPolicy);

      it('should return correct "rules" property', () => {
        const expectedResult = ['chargeAmountItemSystemSelected', 'hasPatronBilledAfterAgedToLostValue', 'hasAmount', 'isIntegerGreaterThanOrEqualToZero'];

        expect(rules).toEqual(expectedResult);
      });

      it('should return "shouldValidate" property equals true', () => {
        expect(shouldValidate).toBe(true);
      });
    });

    describe('when "hasValue" and "hasInterval" return false and "hasPassedValue" returns true', () => {
      it('should return "shouldValidate" property equals true', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasValue: () => false,
          hasInterval: () => false,
        };
        const {
          'itemAgedLostOverdue.duration': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(true);
      });
    });

    describe('when "hasValue", "hasInterval" and "hasPassedValue" return false', () => {
      it('should return "shouldValidate" property equals false', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasValue: () => false,
          hasInterval: () => false,
          hasPassedValue: () => false,
        };
        const {
          'itemAgedLostOverdue.duration': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(false);
      });
    });

    describe('when only one call of "hasValue" returns true', () => {
      it('should return "shouldValidate" property equals true', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasValue: jest.fn()
            .mockReturnValue(false)
            .mockReturnValueOnce(true),
          hasInterval: () => false,
          hasPassedValue: () => false,
        };
        const {
          'itemAgedLostOverdue.duration': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(true);
      });
    });
  });

  describe('"itemAgedLostOverdue.intervalId"', () => {
    describe('when "hasValue" returns true', () => {
      const {
        'itemAgedLostOverdue.intervalId': {
          rules,
          shouldValidate,
        },
      } = lostItemFee(basicLostItemPolicy);

      it('should return correct "rules" property', () => {
        const expectedResult = ['isNotEmptySelect'];

        expect(rules).toEqual(expectedResult);
      });

      it('should return "shouldValidate" property equals true', () => {
        expect(shouldValidate).toBe(true);
      });
    });

    describe('when "hasValue" returns false', () => {
      it('should return "shouldValidate" property equals false', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasValue: () => false,
        };
        const {
          'itemAgedLostOverdue.intervalId': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(false);
      });
    });
  });

  describe('"patronBilledAfterAgedLost.duration"', () => {
    describe('when "hasValue" and "hasInterval" return true', () => {
      const {
        'patronBilledAfterAgedLost.duration': {
          rules,
          shouldValidate,
        },
      } = lostItemFee(basicLostItemPolicy);

      it('should return correct "rules" property', () => {
        const expectedResult = ['hasAmount', 'isIntegerGreaterThanOrEqualToZero'];

        expect(rules).toEqual(expectedResult);
      });

      it('should return "shouldValidate" property equals true', () => {
        expect(shouldValidate).toBe(true);
      });
    });

    describe('when "hasValue" and "hasInterval" return false', () => {
      it('should return "shouldValidate" property equals false', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasValue: () => false,
          hasInterval: () => false,
        };
        const {
          'patronBilledAfterAgedLost.duration': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(false);
      });
    });

    describe('when "hasValue" returns true and "hasInterval" returns false', () => {
      it('should return "shouldValidate" property equals true', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasInterval: () => false,
        };
        const {
          'patronBilledAfterAgedLost.duration': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(true);
      });
    });

    describe('when "hasValue" returns false and "hasInterval" returns true', () => {
      it('should return "shouldValidate" property equals true', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasValue: () => false,
        };
        const {
          'patronBilledAfterAgedLost.duration': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(true);
      });
    });
  });

  describe('"patronBilledAfterAgedLost.intervalId"', () => {
    describe('when "hasValue" returns true', () => {
      const {
        'patronBilledAfterAgedLost.intervalId': {
          rules,
          shouldValidate,
        },
      } = lostItemFee(basicLostItemPolicy);

      it('should return correct "rules" property', () => {
        const expectedResult = ['isNotEmptySelect'];

        expect(rules).toEqual(expectedResult);
      });

      it('should return "shouldValidate" property equals true', () => {
        expect(shouldValidate).toBe(true);
      });
    });

    describe('when "hasValue" returns false', () => {
      it('should return "shouldValidate" property equals false', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasValue: () => false,
        };
        const {
          'patronBilledAfterAgedLost.intervalId': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(false);
      });
    });
  });

  describe('"recalledItemAgedLostOverdue.duration"', () => {
    describe('when "hasValue" and "hasInterval" return true', () => {
      const {
        'recalledItemAgedLostOverdue.duration': {
          rules,
          shouldValidate,
        },
      } = lostItemFee(basicLostItemPolicy);

      it('should return correct "rules" property', () => {
        const expectedResult = ['chargeAmountItemSystemSelected', 'hasPatronBilledAfterRecalledAgedToLostValue', 'hasAmount', 'isIntegerGreaterThanOrEqualToZero'];

        expect(rules).toEqual(expectedResult);
      });

      it('should return "shouldValidate" property equals true', () => {
        expect(shouldValidate).toBe(true);
      });
    });

    describe('when "hasValue" and "hasInterval" return false and "hasPassedValue" returns true', () => {
      it('should return "shouldValidate" property equals true', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasValue: () => false,
          hasInterval: () => false,
        };
        const {
          'recalledItemAgedLostOverdue.duration': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(true);
      });
    });

    describe('when "hasValue", "hasInterval" and "hasPassedValue" return false', () => {
      it('should return "shouldValidate" property equals false', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasValue: () => false,
          hasInterval: () => false,
          hasPassedValue: () => false,
        };
        const {
          'recalledItemAgedLostOverdue.duration': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(false);
      });
    });
  });

  describe('"recalledItemAgedLostOverdue.intervalId"', () => {
    describe('when "hasValue" returns true', () => {
      const {
        'recalledItemAgedLostOverdue.intervalId': {
          rules,
          shouldValidate,
        },
      } = lostItemFee(basicLostItemPolicy);

      it('should return correct "rules" property', () => {
        const expectedResult = ['isNotEmptySelect'];

        expect(rules).toEqual(expectedResult);
      });

      it('should return "shouldValidate" property equals true', () => {
        expect(shouldValidate).toBe(true);
      });
    });

    describe('when "hasValue" returns false', () => {
      it('should return "shouldValidate" property equals false', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasValue: () => false,
        };
        const {
          'recalledItemAgedLostOverdue.intervalId': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(false);
      });
    });
  });

  describe('"patronBilledAfterRecalledItemAgedLost.duration"', () => {
    describe('when "hasInterval" returns true', () => {
      const {
        'patronBilledAfterRecalledItemAgedLost.duration': {
          rules,
          shouldValidate,
        },
      } = lostItemFee(basicLostItemPolicy);

      it('should return correct "rules" property', () => {
        const expectedResult = ['hasAmount', 'isIntegerGreaterThanOrEqualToZero'];

        expect(rules).toEqual(expectedResult);
      });

      it('should return "shouldValidate" property equals true', () => {
        expect(shouldValidate).toBe(true);
      });
    });

    describe('when "hasInterval" returns false', () => {
      it('should return "shouldValidate" property equals false', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasInterval: () => false,
        };
        const {
          'patronBilledAfterRecalledItemAgedLost.duration': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(false);
      });
    });
  });

  describe('"patronBilledAfterRecalledItemAgedLost.intervalId"', () => {
    describe('when "hasValue" returns true', () => {
      const {
        'patronBilledAfterRecalledItemAgedLost.intervalId': {
          rules,
          shouldValidate,
        },
      } = lostItemFee(basicLostItemPolicy);

      it('should return correct "rules" property', () => {
        const expectedResult = ['isNotEmptySelect'];

        expect(rules).toEqual(expectedResult);
      });

      it('should return "shouldValidate" property equals true', () => {
        expect(shouldValidate).toBe(true);
      });
    });

    describe('when "hasValue" returns false', () => {
      it('should return "shouldValidate" property equals false', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasValue: () => false,
        };
        const {
          'patronBilledAfterRecalledItemAgedLost.intervalId': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(false);
      });
    });
  });

  describe('"lostItemProcessingFee"', () => {
    describe('when "hasPassedValue" and "hasNonZeroValue" return true', () => {
      const {
        'lostItemProcessingFee': {
          rules,
          shouldValidate,
        },
      } = lostItemFee(basicLostItemPolicy);

      it('should return correct "rules" property', () => {
        const expectedResult = ['isFloatGreaterThanOrEqualToZero', 'hasNoChargeLostItemProcessingFee'];

        expect(rules).toEqual(expectedResult);
      });

      it('should return "shouldValidate" property equals true', () => {
        expect(shouldValidate).toBe(true);
      });
    });

    describe('when "hasPassedValue" and "hasNonZeroValue" return false', () => {
      it('should return "shouldValidate" property equals false', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasPassedValue: () => false,
          hasNonZeroValue: () => false,
        };
        const {
          'lostItemProcessingFee': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(false);
      });
    });

    describe('when only first call of "hasPassedValue" returns true and "hasNonZeroValue" returns false', () => {
      it('should return "shouldValidate" property equals true', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasPassedValue: jest.fn()
            .mockReturnValue(true)
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(false),
          hasNonZeroValue: () => false,
        };
        const {
          'lostItemProcessingFee': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(true);
      });
    });

    describe('when only second call of "hasPassedValue" returns true and "hasNonZeroValue" returns false', () => {
      it('should return "shouldValidate" property equals true', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasPassedValue: jest.fn()
            .mockReturnValue(true)
            .mockReturnValueOnce(false),
          hasNonZeroValue: () => false,
        };
        const {
          'lostItemProcessingFee': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(true);
      });
    });
  });

  describe('"returnedLostItemProcessingFee"', () => {
    describe('when "hasPassedValue" returns true', () => {
      const {
        'returnedLostItemProcessingFee': {
          rules,
          shouldValidate,
        },
      } = lostItemFee(basicLostItemPolicy);

      it('should return correct "rules" property', () => {
        const expectedResult = ['hasLostItemProcessingFeeValue'];

        expect(rules).toEqual(expectedResult);
      });

      it('should return "shouldValidate" property equals true', () => {
        expect(shouldValidate).toBe(true);
      });
    });

    describe('when "hasPassedValue" returns false', () => {
      it('should return "shouldValidate" property equals false', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasPassedValue: () => false,
        };
        const {
          'returnedLostItemProcessingFee': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(false);
      });
    });
  });

  describe('"chargeAmountItemPatron"', () => {
    describe('when "hasPassedValue" returns true', () => {
      const {
        'chargeAmountItemPatron': {
          rules,
          shouldValidate,
        },
      } = lostItemFee(basicLostItemPolicy);

      it('should return correct "rules" property', () => {
        const expectedResult = ['hasLostItemProcessingFeeValue'];

        expect(rules).toEqual(expectedResult);
      });

      it('should return "shouldValidate" property equals true', () => {
        expect(shouldValidate).toBe(true);
      });
    });

    describe('when "hasPassedValue" returns false', () => {
      it('should return "shouldValidate" property equals false', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasPassedValue: () => false,
        };
        const {
          'chargeAmountItemPatron': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(false);
      });
    });
  });

  describe('"chargeAmountItemPatron"', () => {
    describe('when "hasPassedValue" and "hasPositiveValue" return true', () => {
      const {
        'chargeAmountItemSystem': {
          rules,
          shouldValidate,
        },
      } = lostItemFee(basicLostItemPolicy);

      it('should return correct "rules" property', () => {
        const expectedResult = ['hasPositiveLostItemProcessingFeeAndItemsAgedToLostAfterOverdue', 'hasInvalidLostItemPolicyFee'];

        expect(rules).toEqual(expectedResult);
      });

      it('should return "shouldValidate" property equals false', () => {
        expect(shouldValidate).toBe(false);
      });
    });

    describe('when "hasPassedValue" and "hasPositiveValue" return false', () => {
      it('should return "shouldValidate" property equals false', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasPassedValue: () => false,
          hasPositiveValue: () => false,
        };
        const {
          'chargeAmountItemSystem': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(false);
      });
    });

    describe('when "hasPassedValue" returns true and "hasPositiveValue" returns false', () => {
      it('should return "shouldValidate" property equals true', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasPositiveValue: () => false,
        };
        const {
          'chargeAmountItemSystem': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(true);
      });
    });

    describe('when "hasPassedValue" returns false and "hasPositiveValue" returns true', () => {
      it('should return "shouldValidate" property equals false', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasPassedValue: () => false,
        };
        const {
          'chargeAmountItemSystem': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(false);
      });
    });
  });

  describe('"chargeAmountItem.amount"', () => {
    describe('when "hasPassedValue" and "hasPositiveValue" return true', () => {
      const {
        'chargeAmountItem.amount': {
          rules,
          shouldValidate,
        },
      } = lostItemFee(basicLostItemPolicy);

      it('should return correct "rules" property', () => {
        const expectedResult = ['hasPositiveItemsAgedToLostAfterOverdueAmount'];

        expect(rules).toEqual(expectedResult);
      });

      it('should return "shouldValidate" property equals true', () => {
        expect(shouldValidate).toBe(true);
      });
    });

    describe('when "hasPassedValue" and "hasPositiveValue" return false', () => {
      it('should return "shouldValidate" property equals false', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasPassedValue: () => false,
          hasPositiveValue: () => false,
        };
        const {
          'chargeAmountItem.amount': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(false);
      });
    });

    describe('when only one "hasPositiveValue" returns true and "hasPassedValue" returns false', () => {
      it('should return "shouldValidate" property equals false', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasPositiveValue: jest.fn()
            .mockReturnValue(false)
            .mockReturnValueOnce(true),
          hasPassedValue: () => false,
        };
        const {
          'chargeAmountItem.amount': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(false);
      });
    });

    describe('when only one "hasPositiveValue" returns true and "hasPassedValue" returns true', () => {
      it('should return "shouldValidate" property equals true', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasPositiveValue: jest.fn()
            .mockReturnValue(false)
            .mockReturnValueOnce(true),
        };
        const {
          'chargeAmountItem.amount': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(true);
      });
    });
  });

  describe('"lostItemChargeFeeFine.duration"', () => {
    describe('when "isRquiredLostItemCharge" and "hasInterval" return true', () => {
      const {
        'lostItemChargeFeeFine.duration': {
          rules,
          shouldValidate,
        },
      } = lostItemFee(basicLostItemPolicy);

      it('should return correct "rules" property', () => {
        const expectedResult = ['isNotEmptyLostItem', 'hasAmount', 'isIntegerGreaterThanOrEqualToZero'];

        expect(rules).toEqual(expectedResult);
      });

      it('should return "shouldValidate" property equals true', () => {
        expect(shouldValidate).toBe(true);
      });
    });

    describe('when "isRquiredLostItemCharge" and "hasInterval" return false', () => {
      it('should return "shouldValidate" property equals false', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasInterval: () => false,
          isRquiredLostItemCharge: () => false,
        };
        const {
          'lostItemChargeFeeFine.duration': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(false);
      });
    });

    describe('when "hasInterval" returns true and "isRquiredLostItemCharge" returns false', () => {
      it('should return "shouldValidate" property equals true', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          isRquiredLostItemCharge: () => false,
        };
        const {
          'lostItemChargeFeeFine.duration': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(true);
      });
    });

    describe('when "hasInterval" returns false and "isRquiredLostItemCharge" returns true', () => {
      it('should return "shouldValidate" property equals true', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasInterval: () => false,
        };
        const {
          'lostItemChargeFeeFine.duration': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(true);
      });
    });
  });

  describe('"lostItemChargeFeeFine.intervalId"', () => {
    describe('when "hasValue" returns true', () => {
      const {
        'lostItemChargeFeeFine.intervalId': {
          rules,
          shouldValidate,
        },
      } = lostItemFee(basicLostItemPolicy);

      it('should return correct "rules" property', () => {
        const expectedResult = ['isNotEmptySelect'];

        expect(rules).toEqual(expectedResult);
      });

      it('should return "shouldValidate" property equals true', () => {
        expect(shouldValidate).toBe(true);
      });
    });

    describe('when "hasValue" returns false', () => {
      it('should return "shouldValidate" property equals false', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasValue: () => false,
        };
        const {
          'lostItemChargeFeeFine.intervalId': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(false);
      });
    });
  });

  describe('"replacementProcessingFee"', () => {
    describe('when "hasValue" and "hasPositiveValue" return true', () => {
      const {
        'replacementProcessingFee': {
          rules,
          shouldValidate,
        },
      } = lostItemFee(basicLostItemPolicy);

      it('should return correct "rules" property', () => {
        const expectedResult = ['hasPositiveReplacementProcessingFee', 'isFloatGreaterThanOrEqualToZero'];

        expect(rules).toEqual(expectedResult);
      });

      it('should return "shouldValidate" property equals true', () => {
        expect(shouldValidate).toBe(true);
      });
    });

    describe('when "hasValue" and "hasPositiveValue" return false', () => {
      it('should return "shouldValidate" property equals false', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasValue: () => false,
          hasPositiveValue: () => false,
        };
        const {
          'replacementProcessingFee': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(false);
      });
    });

    describe('when "hasValue" returns true and "hasPositiveValue" returns false', () => {
      it('should return "shouldValidate" property equals true', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasPositiveValue: () => false,
        };
        const {
          'replacementProcessingFee': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(true);
      });
    });

    describe('when "hasValue" returns false and "hasPositiveValue" returns true', () => {
      it('should return "shouldValidate" property equals true', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasValue: () => false,
        };
        const {
          'replacementProcessingFee': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(true);
      });
    });
  });

  describe('"replacedLostItemProcessingFee"', () => {
    describe('when "hasPassedValue" returns true', () => {
      const {
        'replacedLostItemProcessingFee': {
          rules,
          shouldValidate,
        },
      } = lostItemFee(basicLostItemPolicy);

      it('should return correct "rules" property', () => {
        const expectedResult = ['hasReplacementAllowedAndPositiveLostItemPolicyFee', 'hasReplacementAllowedAndNegativeLostItemPolicyFee', 'hasNegativeReplacementAllowedAndPositiveLostItemPolicyFee'];

        expect(rules).toEqual(expectedResult);
      });

      it('should return "shouldValidate" property equals true', () => {
        expect(shouldValidate).toBe(true);
      });
    });

    describe('when "hasPassedValue" returns false', () => {
      it('should return "shouldValidate" property equals false', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasPassedValue: () => false,
        };
        const {
          'replacedLostItemProcessingFee': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(false);
      });
    });
  });

  describe('"feesFinesShallRefunded.duration"', () => {
    describe('when "hasValue" and "hasInterval" return true', () => {
      const {
        'feesFinesShallRefunded.duration': {
          rules,
          shouldValidate,
        },
      } = lostItemFee(basicLostItemPolicy);

      it('should return correct "rules" property', () => {
        const expectedResult = ['hasAmount', 'isIntegerGreaterThanOrEqualToZero'];

        expect(rules).toEqual(expectedResult);
      });

      it('should return "shouldValidate" property equals true', () => {
        expect(shouldValidate).toBe(true);
      });
    });

    describe('when "hasValue" and "hasInterval" return false', () => {
      it('should return "shouldValidate" property equals false', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasValue: () => false,
          hasInterval: () => false,
        };
        const {
          'feesFinesShallRefunded.duration': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(false);
      });
    });

    describe('when "hasValue" returns true and "hasInterval" returns false', () => {
      it('should return "shouldValidate" property equals true', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasInterval: () => false,
        };
        const {
          'feesFinesShallRefunded.duration': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(true);
      });
    });

    describe('when "hasValue" returns false and "hasInterval" returns true', () => {
      it('should return "shouldValidate" property equals true', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasValue: () => false,
        };
        const {
          'feesFinesShallRefunded.duration': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(true);
      });
    });
  });

  describe('"feesFinesShallRefunded.intervalId"', () => {
    describe('when "hasValue" returns true', () => {
      const {
        'feesFinesShallRefunded.intervalId': {
          rules,
          shouldValidate,
        },
      } = lostItemFee(basicLostItemPolicy);

      it('should return correct "rules" property', () => {
        const expectedResult = ['isNotEmptySelect'];

        expect(rules).toEqual(expectedResult);
      });

      it('should return "shouldValidate" property equals true', () => {
        expect(shouldValidate).toBe(true);
      });
    });

    describe('when "hasValue" returns false', () => {
      it('should return "shouldValidate" property equals false', () => {
        const lostItemPolicy = {
          ...basicLostItemPolicy,
          hasValue: () => false,
        };
        const {
          'feesFinesShallRefunded.intervalId': {
            shouldValidate,
          },
        } = lostItemFee(lostItemPolicy);

        expect(shouldValidate).toBe(false);
      });
    });
  });
});
