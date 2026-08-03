import { isSubjectEnabled } from './isSubjectEnabled';
import { NOTICE_FORMATS } from '../../../constants';

describe('isSubjectEnabled', () => {
  it('should return true for the email format', () => {
    expect(isSubjectEnabled(NOTICE_FORMATS.EMAIL)).toBe(true);
  });

  it('should return false for the print format', () => {
    expect(isSubjectEnabled(NOTICE_FORMATS.PRINT)).toBe(false);
  });

  it('should return false for the text message format', () => {
    expect(isSubjectEnabled(NOTICE_FORMATS.TEXT_MESSAGE)).toBe(false);
  });

  it('should return false when no format is provided', () => {
    expect(isSubjectEnabled(undefined)).toBe(false);
  });
});
