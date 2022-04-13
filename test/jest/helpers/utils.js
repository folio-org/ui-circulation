/* eslint-disable import/prefer-default-export */
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
