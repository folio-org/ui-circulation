import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { map } from 'lodash';

import { Accordion } from '@folio/stripes/components';

import LoanNoticeCard from './components';

class LoanNoticesSection extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    policy: PropTypes.bool.isRequired,
    templates: PropTypes.arrayOf(PropTypes.object).isRequired,
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
        id="loanNotices"
        open={isOpen}
        label={<FormattedMessage id="ui-circulation.settings.noticePolicy.loanNotices" />}
        onToggle={onToggle}
      >
        {map(policy.loanNotices, (loanNotice, index) => (
          <LoanNoticeCard
            policy={policy}
            index={index}
            templates={templates}
          />
        ))}
      </Accordion>
    );
  }
}

export default LoanNoticesSection;
