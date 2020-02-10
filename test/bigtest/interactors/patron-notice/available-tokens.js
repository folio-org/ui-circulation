import {
  interactor,
  collection,
} from '@bigtest/interactor';

@interactor class AvailableTokens {
  items = collection('input[type="checkbox"]');
}

export default AvailableTokens;
