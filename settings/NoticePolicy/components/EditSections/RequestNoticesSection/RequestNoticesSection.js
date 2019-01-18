import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Accordion } from '@folio/stripes/components';

class RequestNoticesSection extends React.Component {
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
        id="requestNotices"
        open={isOpen}
        label={<FormattedMessage id="ui-circulation.settings.noticePolicy.requestNotices" />}
        onToggle={onToggle}
      >
        <span>Content will be available soon.</span>
      </Accordion>
    );
  }
}

export default RequestNoticesSection;
