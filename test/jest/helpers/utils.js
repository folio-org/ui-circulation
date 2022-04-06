/* eslint-disable import/prefer-default-export */
export const componentPropsCheck = (Component, testId, expectedProps, partialCompare = false) => {
  const propertiesForCompare = Component.mock.calls
    .reverse()
    .find(item => item[0]['data-testid'] === testId);

  if (partialCompare) {
    expect(propertiesForCompare[0]).toStrictEqual(expect.objectContaining(expectedProps));
  } else {
    expect(propertiesForCompare[0]).toStrictEqual({
      ...expectedProps,
      'data-testid': testId,
    });
  }
};
