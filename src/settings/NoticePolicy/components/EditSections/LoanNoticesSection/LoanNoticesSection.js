import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'redux-form';
import { values } from 'lodash';
import { Accordion } from '@folio/stripes/components';

import NoticesList from '../components';
import {
  loanNoticesTriggeringEvents,
  loanTimeBasedEventsIds,
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

    const props = {
      sectionKey: 'loanNotices',
      policy,
      templates,
      triggeringEvents: loanNoticesTriggeringEvents,
      timeBasedEventsIds: values(loanTimeBasedEventsIds),
    };

    return (
      <div data-test-notice-policy-form-loan-notices-section>
        <Accordion
          id="loanNotices"
          open={isOpen}
          label={<FormattedMessage id="ui-circulation.settings.noticePolicy.loanNotices" />}
          onToggle={onToggle}
        >
          <FieldArray
            name={props.sectionKey}
            component={NoticesList}
            props={props}
          />
        </Accordion>
      </div>
    );
  }
}

export default LoanNoticesSection;
