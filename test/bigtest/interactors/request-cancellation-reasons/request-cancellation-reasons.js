import {
  interactor,
  isPresent,
  count
} from '@bigtest/interactor';

@interactor class RCReasons {
  hasList = isPresent('#editList-request-cancellation-reasons');
  rcCount = count('[class^="editListRow---"]');
}

export default new RCReasons({ scope: 'form', timeout: 5000 });
