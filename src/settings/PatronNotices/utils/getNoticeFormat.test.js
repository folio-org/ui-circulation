import { getNoticeFormat } from './getNoticeFormat';
import { NOTICE_FORMATS } from '../../../constants';

describe('getNoticeFormat', () => {
  it('should return "noticeFormat" when it is set', () => {
    const notice = {
      additionalProperties: {
        noticeFormat: NOTICE_FORMATS.TEXT_MESSAGE,
      },
    };

    expect(getNoticeFormat(notice)).toBe(NOTICE_FORMATS.TEXT_MESSAGE);
  });

  it('should return "print" when "printOnly" is true and "noticeFormat" is not set', () => {
    const notice = {
      additionalProperties: {
        printOnly: true,
      },
    };

    expect(getNoticeFormat(notice)).toBe(NOTICE_FORMATS.PRINT);
  });

  it('should return "email" when neither "noticeFormat" nor "printOnly" is set', () => {
    const notice = {
      additionalProperties: {},
    };

    expect(getNoticeFormat(notice)).toBe(NOTICE_FORMATS.EMAIL);
  });

  it('should return "email" when "additionalProperties" is missing', () => {
    expect(getNoticeFormat({})).toBe(NOTICE_FORMATS.EMAIL);
  });

  it('should return "email" when called without arguments', () => {
    expect(getNoticeFormat()).toBe(NOTICE_FORMATS.EMAIL);
  });

  it('should prefer "noticeFormat" over "printOnly" when both are set', () => {
    const notice = {
      additionalProperties: {
        noticeFormat: NOTICE_FORMATS.EMAIL,
        printOnly: true,
      },
    };

    expect(getNoticeFormat(notice)).toBe(NOTICE_FORMATS.EMAIL);
  });
});
