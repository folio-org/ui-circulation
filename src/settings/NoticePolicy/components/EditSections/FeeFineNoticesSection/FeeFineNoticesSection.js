import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'react-final-form-arrays';
import { values } from 'lodash';
import { Accordion } from '@folio/stripes/components';

import NoticesList from '../components';
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

  getSendEvents = () => {
    return uponAndAfterSendEvents;
  }

  render() {
    const {
      isOpen,
      policy,
      templates,
    } = this.props;

    return (
      <Accordion
        id="editFeeFineNotices"
        open={isOpen}
        label={<FormattedMessage id="ui-circulation.settings.noticePolicy.feeFineNotices" />}
      >
        <FieldArray
          name="feeFineNotices"
          sectionKey="feeFineNotices"
          component={NoticesList}
          policy={policy}
          getSendEvents={this.getSendEvents}
          sendEventTriggeringIds={values(timeBasedFeeFineEventsIds)}
          templates={templates}
          triggeringEvents={feeFineNoticesTriggeringEvents}
        />
      </Accordion>
    );
  }
}

export default FeeFineNoticesSection;
