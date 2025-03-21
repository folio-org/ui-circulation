import {
  NOT_SELECTED,
  TITLE_LEVEL_REQUESTS,
} from '../../../constants';

export const TITLE_LEVEL_REQUESTS_DEFAULT_VALUES = {
  [TITLE_LEVEL_REQUESTS.TLR_ENABLED]: false,
  [TITLE_LEVEL_REQUESTS.CREATE_TLR_BY_DEFAULT]: false,
  [TITLE_LEVEL_REQUESTS.TLR_HOLD_SHOULD_FOLLOW_CIRCULATION_RULES]: false,
  [TITLE_LEVEL_REQUESTS.CONFIRMATION_TEMPLATE]: NOT_SELECTED,
  [TITLE_LEVEL_REQUESTS.CANCELLATION_TEMPLATE]: NOT_SELECTED,
  [TITLE_LEVEL_REQUESTS.EXPIRATION_TEMPLATE]: NOT_SELECTED,
};
