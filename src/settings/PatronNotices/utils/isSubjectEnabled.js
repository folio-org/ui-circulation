import { NOTICE_FORMATS } from '../../../constants';

export const isSubjectEnabled = (format) => {
  return format === NOTICE_FORMATS.EMAIL;
};
