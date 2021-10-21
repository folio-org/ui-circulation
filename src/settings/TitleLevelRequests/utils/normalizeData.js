import { TITLE_LEVEL_REQUESTS_DEFAULT_VALUES } from '../../../constants';

const normalizeData = (value) => {
  return (
    value.titleLevelRequestsFeatureEnabled
      ? JSON.stringify(value)
      : JSON.stringify(TITLE_LEVEL_REQUESTS_DEFAULT_VALUES)
  );
};

export default normalizeData;
