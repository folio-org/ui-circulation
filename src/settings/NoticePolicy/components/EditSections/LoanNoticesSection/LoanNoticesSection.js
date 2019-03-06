import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Accordion } from '@folio/stripes/components';

import NoticesList from '../components';
import { loanNoticesSendWhen } from '../../../../../constants';

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

    return (
      <div data-test-notice-policy-form-loan-notices-section>
        <Accordion
          id="loanNotices"
          open={isOpen}
          label={<FormattedMessage id="ui-circulation.settings.noticePolicy.loanNotices" />}
          onToggle={onToggle}
        >
          <NoticesList
            sectionKey="loanNotices"
            policy={policy}
            templates={templates}
            sendWhenOptions={loanNoticesSendWhen}
          />
        </Accordion>
      </div>
    );
  }
}

export default LoanNoticesSection;
