import { dayjs } from '@folio/stripes/components';

import { DATE_FORMAT_WITHOUT_TIME } from './constantsForMoment';

const generatePreviewDateValue = (locale, formatToTransform = DATE_FORMAT_WITHOUT_TIME) => (
  dayjs().locale(locale).format(formatToTransform)
);

export default generatePreviewDateValue;
