import { resolveNoticeFormatFieldValues } from './resolveNoticeFormatFieldValues';
import { NOTICE_FORMATS } from '../../../constants';

describe('resolveNoticeFormatFieldValues', () => {
  it('should return the cached values for the format when present', () => {
    const cache = {
      [NOTICE_FORMATS.TEXT_MESSAGE]: {
        header: '',
        body: 'cached text message body',
      },
    };

    const result = resolveNoticeFormatFieldValues(NOTICE_FORMATS.TEXT_MESSAGE, cache, {});

    expect(result).toEqual({
      header: '',
      body: 'cached text message body',
    });
  });

  it('should prefer cached values over the initial values for the email format', () => {
    const cache = {
      [NOTICE_FORMATS.EMAIL]: {
        header: 'cached subject',
        body: 'cached body',
      },
    };
    const initialValues = {
      localizedTemplates: {
        en: {
          header: 'initial subject',
          body: 'initial body',
        },
      },
    };

    const result = resolveNoticeFormatFieldValues(NOTICE_FORMATS.EMAIL, cache, initialValues);

    expect(result).toEqual({
      header: 'cached subject',
      body: 'cached body',
    });
  });

  it('should fall back to the initial values for the email format when not cached', () => {
    const initialValues = {
      localizedTemplates: {
        en: {
          header: 'initial subject',
          body: 'initial body',
        },
      },
    };

    const result = resolveNoticeFormatFieldValues(NOTICE_FORMATS.EMAIL, {}, initialValues);

    expect(result).toEqual({
      header: 'initial subject',
      body: 'initial body',
    });
  });

  it('should fall back to blank values for the email format when neither cache nor initial values are set', () => {
    const result = resolveNoticeFormatFieldValues(NOTICE_FORMATS.EMAIL, {}, {});

    expect(result).toEqual({
      header: '',
      body: '',
    });
  });

  it('should fall back to blank values for the email format when initial values are undefined', () => {
    const result = resolveNoticeFormatFieldValues(NOTICE_FORMATS.EMAIL, {}, undefined);

    expect(result).toEqual({
      header: '',
      body: '',
    });
  });

  it('should fall back to blank values for a non-email format when not cached', () => {
    const initialValues = {
      localizedTemplates: {
        en: {
          header: 'initial subject',
          body: 'initial body',
        },
      },
    };

    const result = resolveNoticeFormatFieldValues(NOTICE_FORMATS.PRINT, {}, initialValues);

    expect(result).toEqual({
      header: '',
      body: '',
    });
  });

  it('should fall back to blank values when no format is selected', () => {
    const result = resolveNoticeFormatFieldValues('', {}, {});

    expect(result).toEqual({
      header: '',
      body: '',
    });
  });
});
