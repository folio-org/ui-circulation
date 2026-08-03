import { NOTICE_FORMATS } from '../../../constants';

// Previously there were only two notice formats: print and email.
// The new "noticeFormat" field was added to support text message notices.
// The "printOnly" flag is a legacy field that was used to determine if
// the notice format was print or email (`printOnly: true` → print, else → email).
// The "getNoticeFormat" function checks for the new "noticeFormat" field first,
// and if it doesn't exist, it falls back to the legacy "printOnly" flag
// to determine the notice format.
export const getNoticeFormat = (notice = {}) => {
  const { additionalProperties } = notice;

  if (additionalProperties?.noticeFormat) {
    return additionalProperties.noticeFormat;
  }

  if (additionalProperties?.printOnly) {
    return NOTICE_FORMATS.PRINT;
  }

  return NOTICE_FORMATS.EMAIL;
};
