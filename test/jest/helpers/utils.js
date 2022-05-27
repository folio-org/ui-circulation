export const componentPropsCheck = (Component, testId, expectedProps, partialCompare = false) => {
  const propertiesForCompare = Component.mock.calls
    .reverse()
    .find(item => item?.[0]?.['data-testid'] === testId);

  const resultExpectedProps = partialCompare
    ? expect.objectContaining(expectedProps)
    : {
      ...expectedProps,
      'data-testid': testId,
    };

  expect(propertiesForCompare[0]).toStrictEqual(resultExpectedProps);
};

export const commonClassCheckWithoutProps = (Class, defaultProps = {}) => {
  it('should have correct values if nothing was passed', () => {
    const classInstance = new Class();

    Object.keys(classInstance).forEach(instanceKey => {
      expect(classInstance[instanceKey]).toBe(defaultProps[instanceKey] ? defaultProps[instanceKey] : undefined);
    });
  });
};

export const commonClassCheckForEachProp = (Class, data) => {
  const passedDataKeys = Object.keys(data || {});

  passedDataKeys.forEach(dataKey => {
    it(`should have correct values if only "${dataKey}" passed`, () => {
      const classInstance = new Class({ [dataKey]: data[dataKey] });

      Object.keys(classInstance).forEach(instanceKey => {
        expect(classInstance[instanceKey]).toBe(instanceKey === dataKey ? data[dataKey] : undefined);
      });
    });
  });
};

export const commonClassCheckForAllProps = (Class, data) => {
  const classInstance = new Class(data);

  it('should have correct values when fully data passed', () => {
    expect(classInstance).toEqual(data);
  });
};
