import {
  interactor,
  isPresent
} from '@bigtest/interactor';

import { contains } from '../helpers';

@interactor class FddsDetail {
  isLoaded = isPresent('#generalInformation');
  whenLoaded() {
    return this.when(() => this.isLoaded);
  }

  containsContent = contains('#generalInformation');
}

export default new FddsDetail('#date-test-fixed-due-date-schedule-detail');
