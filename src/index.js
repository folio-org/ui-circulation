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
import CirculationRules from './settings/CirculationRules'; // eslint-disable-line import/no-named-as-default
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
import DeprecatedTitleLevelRequests from './deprecated/settings/TitleLevelRequests';
import ConsortiumTLR from './settings/ConsortiumTLR';
import { getConsortiumTlrPermission } from './settings/utils/utils';
import ViewPrintDetails from './settings/ViewPrintDetails';

class Circulation extends Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
  }

  getSections() {
    const {
      stripes,
    } = this.props;
    const isEnabledEcsRequests = stripes?.config?.enableEcsRequests;

    const sections = [
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
            perm: 'ui-circulation.settings.view-other-settings',
          },
          {
            route: 'staffslips',
            label: <FormattedMessage id="ui-circulation.settings.index.staffSlips" />,
            component: StaffSlips,
            perm: 'ui-circulation.settings.view-staff-slips',
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
            perm: 'ui-circulation.settings.view-fixed-due-date-schedules',
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
            perm: 'ui-circulation.settings.view-notice-policies',
          },
          {
            route: 'patron-notices',
            label: <FormattedMessage id="ui-circulation.settings.index.patronNotices" />,
            component: PatronNotices,
            perm: 'ui-circulation.settings.view-notice-templates',
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
            perm: 'ui-circulation.settings.view-cancellation-reasons',
          },
          {
            route: 'request-policies',
            label: <FormattedMessage id="ui-circulation.settings.index.requestPolicies" />,
            component: RequestPolicySettings,
            perm: 'ui-circulation.settings.view-request-policies',
          },
          {
            route: 'print-hold-requests',
            label: <FormattedMessage id="ui-circulation.settings.index.printHoldRequests" />,
            component: PrintHoldRequests,
            perm: 'ui-circulation.settings.view-staff-slips',
          },
          {
            route: 'view-print-details',
            label: <FormattedMessage id="ui-circulation.settings.index.viewPrintDetails" />,
            component: ViewPrintDetails,
            perm: 'ui-circulation.settings.request-print-details',
          },
        ],
      },
    ];

    if (isEnabledEcsRequests === true) {
      sections[0].pages.push({
        route: 'title-level-requests',
        label: <FormattedMessage id="ui-circulation.settings.index.titleLevelRequestsTlr" />,
        component: TitleLevelRequests,
        perm: 'ui-circulation.settings.view-titleLevelRequests',
      },
      {
        route: 'consortium-title-level-requests',
        label: <FormattedMessage id="ui-circulation.settings.index.consortiumTLR" />,
        component: ConsortiumTLR,
        perm: getConsortiumTlrPermission(stripes),
      });
      sections[4].pages.splice(2, 0, {
        route: 'tlr-patron-notice-templates',
        label: <FormattedMessage id="ui-circulation.settings.index.tlrPatronNotices" />,
        component: TLRPatronNotices,
        perm: 'ui-circulation.settings.view-titleLevelRequests',
      });
    } else {
      sections[4].pages.splice(2, 0, {
        route: 'title-level-requests',
        label: <FormattedMessage id="ui-circulation.settings.index.titleLevelRequests" />,
        component: DeprecatedTitleLevelRequests,
        perm: 'ui-circulation.settings.view-titleLevelRequests',
      });
    }

    return sections;
  }

  render() {
    return (
      <TitleManager page={this.props.intl.formatMessage({ id: 'ui-circulation.settings.title.general' })}>
        <Settings
          key={getConsortiumTlrPermission(this.props.stripes)}
          {...this.props}
          sections={this.getSections()}
          paneTitle={<FormattedMessage id="ui-circulation.settings.index.paneTitle" />}
        />
      </TitleManager>
    );
  }
}

export default injectIntl(Circulation);
