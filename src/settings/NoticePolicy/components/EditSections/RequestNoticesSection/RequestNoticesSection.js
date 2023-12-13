import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';
import { values } from 'lodash';
import { Accordion } from '@folio/stripes/components';

import NoticesList from '../components';
import {
  requestNoticesTriggeringEvents,
  requestTimeBasedEventsIds,
  uponAndBeforeSendEvents,
} from '../../../../../constants';

export const getSendEvents = () => {
  return uponAndBeforeSendEvents;
};

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
      <div data-test-notice-policy-form-request-notices-section>
        <Accordion
          data-testid="editRequestNotices"
          id="editRequestNotices"
          label={<FormattedMessage id="ui-circulation.settings.noticePolicy.requestNotices" />}
        >
          <FieldArray
            name="requestNotices"
            sectionKey="requestNotices"
            component={NoticesList}
            policy={policy}
            getSendEvents={getSendEvents}
            sendEventTriggeringIds={values(requestTimeBasedEventsIds)}
            templates={templates}
            triggeringEvents={requestNoticesTriggeringEvents}
          />
        </Accordion>
      </div>
    );
  }
}

export default RequestNoticesSection;
