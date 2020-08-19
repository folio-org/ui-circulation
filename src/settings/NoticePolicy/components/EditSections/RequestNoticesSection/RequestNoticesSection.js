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
  requestTimeBasedNoticesSendEvents,
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
      <div data-test-notice-policy-form-request-notices-section>
        <Accordion
          id="editRequestNotices"
          open={isOpen}
          label={<FormattedMessage id="ui-circulation.settings.noticePolicy.requestNotices" />}
        >
          <FieldArray
            name="requestNotices"
            sectionKey="requestNotices"
            component={NoticesList}
            policy={policy}
            sendEvents={requestTimeBasedNoticesSendEvents}
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
