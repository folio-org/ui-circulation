import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';
import { values } from 'lodash';
import { Accordion } from '@folio/stripes/components';

import NoticesList from '../components';
import {
  loanNoticesTriggeringEvents,
  loanTimeBasedEventsIds,
  noticesSendEvents,
  uponAndAfterSendEvents,
} from '../../../../../constants';

export const getSendEvents = (triggeringEvent) => {
  return triggeringEvent === loanTimeBasedEventsIds.AGED_TO_LOST ? uponAndAfterSendEvents : noticesSendEvents;
};

class LoanNoticesSection extends React.Component {
  static propTypes = {
    policy: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
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
      <div data-test-notice-policy-form-loan-notices-section>
        <Accordion
          data-testid="editLoanNotices"
          id="editLoanNotices"
          label={<FormattedMessage id="ui-circulation.settings.noticePolicy.loanNotices" />}
        >
          <FieldArray
            name="loanNotices"
            sectionKey="loanNotices"
            component={NoticesList}
            policy={policy}
            templates={templates}
            getSendEvents={getSendEvents}
            sendEventTriggeringIds={values(loanTimeBasedEventsIds)}
            triggeringEvents={loanNoticesTriggeringEvents}
          />
        </Accordion>
      </div>
    );
  }
}

export default LoanNoticesSection;
