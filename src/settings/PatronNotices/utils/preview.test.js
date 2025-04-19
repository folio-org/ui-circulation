import { dayjs } from '@folio/stripes/components';

import generatePreviewDateValue from './preview';

import {
  DATE_FORMAT_WITHOUT_TIME,
  DATE_FORMAT_WITH_TIME,
  LOCALE_FOR_TESTS,
} from './constantsForMoment';

describe('generatePreviewDateValue', () => {
  dayjs.mockImplementation(() => ({
    locale: jest.fn(() => ({
      format: jest.fn(),
    })),
  }));

  it('should return formated date for passed locale in short format when second prop is not passed', () => {
    const expectedResult = dayjs().locale(LOCALE_FOR_TESTS).format(DATE_FORMAT_WITHOUT_TIME);

    expect(generatePreviewDateValue(LOCALE_FOR_TESTS)).toEqual(expectedResult);
  });

  it('should return formated date for passed locale in short format', () => {
    const expectedResult = dayjs().locale(LOCALE_FOR_TESTS).format(DATE_FORMAT_WITHOUT_TIME);

    expect(generatePreviewDateValue(LOCALE_FOR_TESTS, DATE_FORMAT_WITHOUT_TIME)).toEqual(expectedResult);
  });

  it('should return formated date for passed locale in long format', () => {
    const expectedResult = dayjs().locale(LOCALE_FOR_TESTS).format(DATE_FORMAT_WITH_TIME);

    expect(generatePreviewDateValue(LOCALE_FOR_TESTS, DATE_FORMAT_WITH_TIME)).toEqual(expectedResult);
  });
});
