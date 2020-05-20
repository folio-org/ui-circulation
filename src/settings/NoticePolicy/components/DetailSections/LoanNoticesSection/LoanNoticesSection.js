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
    isOpen: PropTypes.bool.isRequired,
    policy: PropTypes.object.isRequired,
    templates: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
    onToggle: PropTypes.func.isRequired,
  };

  render() {
    const {
      isOpen,
      policy,
      templates,
      onToggle,
    } = this.props;

    return (
      <div data-test-notice-policy-detail-loan-notices-section>
        <Accordion
          id="loanNotices"
          open={isOpen}
          label={<FormattedMessage id="ui-circulation.settings.noticePolicy.loanNotices" />}
          onToggle={onToggle}
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
