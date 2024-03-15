import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Settings } from '@folio/stripes/smart-components';
import {
  stripesShape,
  TitleManager,
} from '@folio/stripes/core';

import LoanHistorySettings from './settings/LoanHistory/LoanHistorySettings';
import LoanPolicySettings from './settings/LoanPolicy/LoanPolicySettings';
import FinePolicySettings from './settings/FinePolicy/FinePolicySettings';
import LostItemFeePolicySettings from './settings/LostItemFeePolicy/LostItemFeePolicySettings';
import CirculationRules from './settings/CirculationRules';
import RequestCancellationReasons from './settings/RequestCancellationReasons';
import CheckoutSettings from './settings/CheckoutSettings/CheckoutSettings';
import FixedDueDateScheduleManager from './settings/FixedDueDateSchedule/FixedDueDateScheduleManager';
import PatronNotices from './settings/PatronNotices';
import StaffSlips from './settings/StaffSlips';
import NoticePolicySettings from './settings/NoticePolicy';
import RequestPolicySettings from './settings/RequestPolicy';
import TitleLevelRequests from './settings/TitleLevelRequests';
import PrintHoldRequests from './settings/PrintHoldRequests';
import TLRPatronNotices from './settings/TLRPatronNotices';

class Circulation extends Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    intl: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.sections = [
      {
        label: <FormattedMessage id="ui-circulation.settings.index.general" />,
        pages: [
          {
            route: 'rules',
            label: <FormattedMessage id="ui-circulation.settings.index.circulationRules" />,
            component: CirculationRules,
            perm: 'ui-circulation.settings.view-circulation-rules',
          },
          {
            route: 'checkout',
            label: <FormattedMessage id="ui-circulation.settings.index.otherSettings" />,
            component: CheckoutSettings,
            perm: 'ui-circulation.settings.other-settings',
          },
          {
            route: 'staffslips',
            label: <FormattedMessage id="ui-circulation.settings.index.staffSlips" />,
            component: StaffSlips,
            perm: 'ui-circulation.settings.view-staff-slips',
          },
          {
            route: 'title-level-requests',
            label: <FormattedMessage id="ui-circulation.settings.index.titleLevelRequestsTlr" />,
            component: TitleLevelRequests,
            perm: 'ui-circulation.settings.titleLevelRequests',
          },
        ],
      },
      {
        label: <FormattedMessage id="ui-circulation.settings.index.loans" />,
        pages: [

          {
            route: 'fixed-due-date-schedules',
            label: <FormattedMessage id="ui-circulation.settings.index.fdds" />,
            component: FixedDueDateScheduleManager,
            perm: 'ui-circulation.settings.fixed-due-date-schedules',
          },
          {
            route: 'loan-anonymization',
            label: <FormattedMessage id="ui-circulation.settings.index.loanAnonymization" />,
            component: LoanHistorySettings,
            perm: 'ui-circulation.settings.loan-history',
          },
          {
            route: 'loan-policies',
            label: <FormattedMessage id="ui-circulation.settings.index.loanPolicies" />,
            component: LoanPolicySettings,
            perm: 'ui-circulation.settings.view-loan-policies',
          },
        ],
      },
      {
        label: <FormattedMessage id="ui-circulation.settings.index.feesFines" />,
        pages: [
          {
            route: 'fine-policies',
            label: <FormattedMessage id="ui-circulation.settings.finePolicy.paneTitle" />,
            component: FinePolicySettings,
            perm: 'ui-circulation.settings.view-overdue-fines-policies',
          },
          {
            route: 'lost-item-fee-policy',
            label: <FormattedMessage id="ui-circulation.settings.lostItemFee.paneTitle" />,
            component: LostItemFeePolicySettings,
            perm: 'ui-circulation.settings.view-lost-item-fees-policies',
          },
        ],
      },

      {
        label: <FormattedMessage id="ui-circulation.settings.index.patronNoticesSettings" />,
        pages: [
          {
            route: 'notice-policies',
            label: <FormattedMessage id="ui-circulation.settings.index.noticePolicies" />,
            component: NoticePolicySettings,
            perm: 'ui-circulation.settings.notice-policies',
          },
          {
            route: 'patron-notices',
            label: this.props.intl.formatMessage({ id: 'ui-circulation.settings.index.patronNotices' }),
            component: PatronNotices,
            perm: 'ui-circulation.settings.notice-templates',
          },

        ],
      },

      {
        label: <FormattedMessage id="ui-circulation.settings.index.request" />,
        pages: [

          {
            route: 'cancellation-reasons',
            label: <FormattedMessage id="ui-circulation.settings.index.requestCancellationReasons" />,
            component: RequestCancellationReasons,
            perm: 'ui-circulation.settings.cancellation-reasons',
          },
          {
            route: 'request-policies',
            label: <FormattedMessage id="ui-circulation.settings.index.requestPolicies" />,
            component: RequestPolicySettings,
            perm: 'ui-circulation.settings.request-policies',
          },
          {
            route: 'tlr-patron-notice-templates',
            label: <FormattedMessage id="ui-circulation.settings.index.tlrPatronNotices" />,
            component: TLRPatronNotices,
            perm: 'ui-circulation.settings.titleLevelRequests',
          },
          {
            route: 'print-hold-requests',
            label: <FormattedMessage id="ui-circulation.settings.index.printHoldRequests" />,
            component: PrintHoldRequests,
            perm: 'ui-circulation.settings.staff-slips',
          },
        ],
      },
    ];
  }

  render() {
    return (
      <TitleManager page={this.props.intl.formatMessage({ id: 'ui-circulation.settings.title.general' })}>
        <Settings
          {...this.props}
          sections={this.sections}
          paneTitle={<FormattedMessage id="ui-circulation.settings.index.paneTitle" />}
        />
      </TitleManager>
    );
  }
}

export default injectIntl(Circulation);
