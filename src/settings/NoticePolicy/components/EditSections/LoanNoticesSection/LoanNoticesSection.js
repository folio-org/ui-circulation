import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Accordion } from '@folio/stripes/components';

class LoanNoticesSection extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
  };

  render() {
    const {
      isOpen,
      onToggle,
    } = this.props;

    return (
      <Accordion
        id="loanNotices"
        open={isOpen}
        label={<FormattedMessage id="ui-circulation.settings.noticePolicy.loanNotices" />}
        onToggle={onToggle}
      >
        <span>Content will be available soon.</span>
      </Accordion>
    );
  }
}

export default LoanNoticesSection;
