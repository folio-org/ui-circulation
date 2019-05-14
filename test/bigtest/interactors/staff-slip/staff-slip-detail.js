import {
  interactor,
} from '@bigtest/interactor';

import { contains } from '../helpers';

@interactor class StaffSlipDetail {
  containsContent = contains('[data-test-staff-slip-content]');
}

export default new StaffSlipDetail('[data-test-staff-slip-details]');
