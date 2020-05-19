import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'redux-form';
import { values } from 'lodash';
import { Accordion } from '@folio/stripes/components';

import NoticesList from '../components';
import {
  feeFineNoticesTriggeringEvents,
  feeFineEventsIds,
  feeFinesNoticesSendEvents,
} from '../../../../../constants';

class FeeFineNoticesSection extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    policy: PropTypes.object.isRequired,
    templates: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
    getNotificationContent: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
  };

  render() {
    const {
      isOpen,
      policy,
      templates,
      getNotificationContent,
      onToggle,
    } = this.props;

    const props = {
      policy,
      sectionKey: 'feeFineNotices',
      sendEvents: feeFinesNoticesSendEvents,
      sendEventTriggeringIds: values(feeFineEventsIds),
      templates,
      triggeringEvents: feeFineNoticesTriggeringEvents,
      getNotificationContent,
    };

    return (
      <Accordion
        id="feeFineNotices"
        open={isOpen}
        label={<FormattedMessage id="ui-circulation.settings.noticePolicy.feeFineNotices" />}
        onToggle={onToggle}
      >
        <FieldArray
          name={props.sectionKey}
          component={NoticesList}
          props={props}
        />
      </Accordion>
    );
  }
}

export default FeeFineNoticesSection;
