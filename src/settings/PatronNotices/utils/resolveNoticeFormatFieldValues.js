import { NOTICE_FORMATS } from '../../../constants';

// Restores the "Subject"/"Body" values that were present the last time the given
// notice format was selected, so toggling between formats doesn't discard content
// the user already entered. Falls back to the template's original values on the
// first switch to email, or to blank values for any other not-yet-visited format.
export const resolveNoticeFormatFieldValues = (format, cache, initialValues) => {
  const cachedValues = cache[format];

  if (cachedValues) {
    return cachedValues;
  }

  if (format === NOTICE_FORMATS.EMAIL) {
    return {
      header: initialValues?.localizedTemplates?.en?.header ?? '',
      body: initialValues?.localizedTemplates?.en?.body ?? '',
    };
  }

  return {
    header: '',
    body: '',
  };
};
