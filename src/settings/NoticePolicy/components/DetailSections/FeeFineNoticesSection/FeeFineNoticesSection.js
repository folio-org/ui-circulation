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
    policy: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      feeFineNotices: PropTypes.arrayOf(PropTypes.shape({
        format: PropTypes.string,
        templateId: PropTypes.string,
      })),
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
      <Accordion
        data-testid="accordionTestId"
        id="viewFeeFineNotices"
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
