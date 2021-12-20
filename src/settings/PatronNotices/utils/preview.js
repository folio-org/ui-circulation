import moment from 'moment';

import { DATE_FORMAT_WITHOUT_TIME } from './constantsForMoment';

const generatePreviewDateValue = (locale, formatToTransform = DATE_FORMAT_WITHOUT_TIME) => (
  moment().locale(locale).format(formatToTransform)
);

export default generatePreviewDateValue;
