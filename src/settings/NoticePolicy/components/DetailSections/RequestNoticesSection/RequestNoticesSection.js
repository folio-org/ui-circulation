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
  requestTimeBasedEventsIds,
  requestTimeBasedNoticesSendEvents,
  requestNoticesTriggeringEvents,
} from '../../../../../constants';

class RequestNoticesSection extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    policy: PropTypes.object.isRequired,
    templates: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
  };

  render() {
    const {
      isOpen,
      policy,
      templates,
    } = this.props;

    return (
      <div data-test-notice-policy-detail-request-notices-section>
        <Accordion
          id="viewRequestNotices"
          open={isOpen}
          label={<FormattedMessage id="ui-circulation.settings.noticePolicy.requestNotices" />}
        >
          {map(policy.requestNotices, (notice, index) => (
            <NoticeCard
              key={index}
              index={index}
              notice={notice}
              sendEvents={requestTimeBasedNoticesSendEvents}
              sendEventTriggeringIds={values(requestTimeBasedEventsIds)}
              templates={templates}
              triggeringEvents={requestNoticesTriggeringEvents}
            />
          ))}
        </Accordion>
      </div>
    );
  }
}

export default RequestNoticesSection;
