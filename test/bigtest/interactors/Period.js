import {
  interactor,
  text,
  scoped,
} from '@bigtest/interactor';

import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';
import SelectInteractor from '@folio/stripes-components/lib/Select/tests/interactor';

export default interactor(class Period {
  duration = scoped('[data-test-period-duration]', TextFieldInteractor);
  interval = scoped('[data-test-period-interval]', SelectInteractor);
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
