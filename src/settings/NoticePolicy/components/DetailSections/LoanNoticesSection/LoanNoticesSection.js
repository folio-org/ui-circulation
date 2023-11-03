import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  map,
  values,
} from 'lodash';

import { Accordion } from '@folio/stripes/components';

import NoticeCard from '../components';
import {
  noticesSendEvents,
  loanTimeBasedEventsIds,
  loanNoticesTriggeringEvents,
} from '../../../../../constants';

class LoanNoticesSection extends React.Component {
  static propTypes = {
    policy: PropTypes.object.isRequired,
    templates: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
  };

  render() {
    const {
      policy,
      templates,
    } = this.props;

    return (
      <div data-test-notice-policy-detail-loan-notices-section>
        <Accordion
          data-testid="viewLoanNoticesTestId"
          id="viewLoanNotices"
          label={<FormattedMessage id="ui-circulation.settings.noticePolicy.loanNotices" />}
        >
          {map(policy.loanNotices, (notice, index) => (
            <NoticeCard
              key={index}
              index={index}
              notice={notice}
              sendEvents={noticesSendEvents}
              sendEventTriggeringIds={values(loanTimeBasedEventsIds)}
              templates={templates}
              triggeringEvents={loanNoticesTriggeringEvents}
            />
          ))}
        </Accordion>
      </div>
    );
  }
}

export default LoanNoticesSection;
