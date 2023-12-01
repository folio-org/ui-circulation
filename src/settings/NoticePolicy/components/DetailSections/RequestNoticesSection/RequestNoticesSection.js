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
  uponAndBeforeSendEvents,
  requestNoticesTriggeringEvents,
} from '../../../../../constants';

class RequestNoticesSection extends React.Component {
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
      <div data-test-notice-policy-detail-request-notices-section>
        <Accordion
          data-testid="viewRequestNoticesTestId"
          id="viewRequestNotices"
          label={<FormattedMessage id="ui-circulation.settings.noticePolicy.requestNotices" />}
        >
          {map(policy.requestNotices, (notice, index) => (
            <NoticeCard
              key={index}
              index={index}
              notice={notice}
              sendEvents={uponAndBeforeSendEvents}
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
