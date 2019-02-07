import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';

import LoanNoticeCard from '../LoanNoticeCard';

class LoanNoticesList extends React.Component {
  static propTypes = {
    policy: PropTypes.object.isRequired,
    templates: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
  };

  render() {
    const {
      templates,
      policy,
    } = this.props;

    return (
      <FieldArray
        name="loanNotices"
        component={LoanNoticeCard}
        props={{
          templates,
          policy,
        }}
      />
    );
  }
}

export default LoanNoticesList;
