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
      <Accordion
        id="requestNotices"
        open={isOpen}
        label={<FormattedMessage id="ui-circulation.settings.noticePolicy.requestNotices" />}
        onToggle={onToggle}
      >
        {map(policy.requestNotices, (notice, index) => (
          <NoticeCard
            key={index}
            index={index}
            notice={notice}
            timeBasedEventsIds={values(requestTimeBasedEventsIds)}
            templates={templates}
            triggeringEvents={requestNoticesTriggeringEvents}
          />
        ))}
      </Accordion>
    );
  }
}

export default RequestNoticesSection;
