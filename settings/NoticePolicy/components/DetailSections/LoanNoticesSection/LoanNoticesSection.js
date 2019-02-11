import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { map } from 'lodash';

import { Accordion } from '@folio/stripes/components';

import NoticeCard from '../components';
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
      <Accordion
        id="loanNotices"
        open={isOpen}
        label={<FormattedMessage id="ui-circulation.settings.noticePolicy.loanNotices" />}
        onToggle={onToggle}
      >
        {map(policy.loanNotices, (notice, index) => (
          <NoticeCard
            key={index}
            index={index}
            sectionKey="loanNotices"
            policy={policy}
            templates={templates}
            sendWhenOptions={loanNoticesSendWhen}
          />
        ))}
      </Accordion>
    );
  }
}

export default LoanNoticesSection;
