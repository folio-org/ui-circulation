import helpers from './helpers';

describe('FinePolicy helpers', () => {
  const selector1 = 'selector1';
  const options = [
    { id: 'selector1' },
    { id: 'selector2' },
  ];

  it('"isValidItemSelected" should return true if some matches', () => {
    expect(helpers.isValidItemSelected(options, selector1)).toEqual(true);
  });

  it('"isValidItemSelected" should return false if there is no matches', () => {
    expect(helpers.isValidItemSelected(options, 'selector3')).toEqual(false);
  });
});
