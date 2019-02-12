import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';

import NoticeCard from '../NoticeCard';

class NoticesList extends React.Component {
  static propTypes = {
    sectionKey: PropTypes.string.isRequired,
    policy: PropTypes.object.isRequired,
    templates: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
    sendWhenOptions: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
  };

  render() {
    const {
      sectionKey,
      policy,
      templates,
      sendWhenOptions,
    } = this.props;

    const noticeCardProps = {
      sectionKey,
      policy,
      templates,
      sendWhenOptions,
    };

    return (
      <FieldArray
        name={sectionKey}
        component={NoticeCard}
        props={noticeCardProps}
      />
    );
  }
}

export default NoticesList;
