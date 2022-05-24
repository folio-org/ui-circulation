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

export const commonClassCheck = (Class, data) => {
  const classInstance = new Class(data);
  const passedDataKeys = Object.keys(data || {});

  it(`should have correct values if ${passedDataKeys[0] ? `only "${passedDataKeys[0]}"` : 'nothing'} passed`, () => {
    Object.keys(classInstance).forEach(key => {
      expect(classInstance[key]).toBe(passedDataKeys.includes(key) ? data[key] : undefined);
    });
  });
};
