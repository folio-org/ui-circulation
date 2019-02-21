import { interactor, text } from '@bigtest/interactor';
import {
  TextFieldInteractor,
  SelectInteractor,
} from '@folio/stripes/components';

export default interactor(class Period {
  duration = new TextFieldInteractor('[data-test-period-duration]');
  interval = new SelectInteractor('[data-test-period-interval]');
  label = text('[data-test-period-label]');

  // in case of using existing interactors first input on the page is selected, cause they are not scoped
  fillAndBlurDuration(value) {
    return this.scoped('[data-test-period-duration]')
      .focus('input')
      .fill('input', value)
      .blur('input');
  }

  selectAndBlurInterval(value) {
    return this
      .interval.select('[data-test-period-interval] select', value)
      .interval.blur('[data-test-period-interval] select');
  }
});
