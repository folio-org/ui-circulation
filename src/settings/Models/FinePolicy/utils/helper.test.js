import helpers from './helpers';

describe('FinePolicy helpers', () => {
  it('"isValidItemSelected" should return true if some matches', () => {
    const selectedId = 'selectedId';
    const options = [
      { id: 'test' },
      { id: selectedId },
    ];
    expect(helpers.isValidItemSelected(options, selectedId)).toEqual(true);
  });

  it('"isValidItemSelected" should return false if there is no matches', () => {
    const selectedId = 'selectedId';
    const options = [
      { id: 'test' },
      { id: 'test_2' },
    ];
    expect(helpers.isValidItemSelected(options, selectedId)).toEqual(false);
  });
});
