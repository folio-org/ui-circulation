import {
  interactor,
  scoped,
  collection,
  property,
} from '@bigtest/interactor';

import AvailableTokens from './available-tokens';

@interactor class TokensModal {
  defaultScope = '[data-test-template-editor-tokens-modal]';

  addTokensBtn = scoped('[data-test-add-tokens]');
  cancelBtn = scoped('[data-test-close-tokens-modal]');
  availbaleTokens = collection('[data-test-available-tokens]', AvailableTokens);
  multipleTokens = scoped('[data-test-multiple-tokens]');

  isAddTokenBtnDisabled = property('[data-test-add-tokens]', 'disabled');
}

export default TokensModal;
