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
  feeFineNoticesTriggeringEvents,
  timeBasedFeeFineEventsIds,
  uponAndAfterSendEvents,
} from '../../../../../constants';

class FeeFineNoticesSection extends React.Component {
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
      <Accordion
        id="viewFeeFineNotices"
        open={isOpen}
        label={<FormattedMessage id="ui-circulation.settings.noticePolicy.feeFineNotices" />}
      >
        {map(policy.feeFineNotices, (notice, index) => (
          <NoticeCard
            index={index}
            key={index}
            notice={notice}
            sendEvents={uponAndAfterSendEvents}
            sendEventTriggeringIds={values(timeBasedFeeFineEventsIds)}
            templates={templates}
            triggeringEvents={feeFineNoticesTriggeringEvents}
          />
        ))}
      </Accordion>
    );
  }
}

export default FeeFineNoticesSection;
