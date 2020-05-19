import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Col,
  Row,
} from '@folio/stripes/components';

import NoticeCard from '../NoticeCard';

import css from './NoticesList.css';

class NoticesList extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    policy: PropTypes.object.isRequired,
    sectionKey: PropTypes.string.isRequired,
    sendEvents: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
    templates: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
    triggeringEvents: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
    sendEventTriggeringIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    getNotificationContent: PropTypes.func,
  };

  onAddField = () => {
    this.props.fields.push({});
  };

  onRemoveField = (index) => {
    this.props.fields.remove(index);
  };

  render() {
    const {
      getNotificationContent,
      sectionKey,
      fields,
      policy,
      sendEvents,
      sendEventTriggeringIds,
      templates,
      triggeringEvents,
    } = this.props;

    return (
      <>
        {fields.map((pathToNotice, noticeIndex) => {
          const notice = policy[sectionKey][noticeIndex];

          return (
            <NoticeCard
              key={pathToNotice}
              notice={notice}
              noticeIndex={noticeIndex}
              pathToNotice={pathToNotice}
              sendEvents={sendEvents}
              sendEventTriggeringIds={sendEventTriggeringIds}
              templates={templates}
              triggeringEvents={triggeringEvents}
              getNotificationContent={getNotificationContent}
              onRemoveNotice={this.onRemoveField}
            />
          );
        })}
        <Row
          start="xs"
          className={css.buttonContainer}
        >
          <Col xs={1}>
            <Button
              type="button"
              buttonStyle="default"
              data-test-add-notice-card
              onClick={this.onAddField}
            >
              <FormattedMessage id="ui-circulation.settings.noticePolicy.addNotice" />
            </Button>
          </Col>
        </Row>
      </>
    );
  }
}

export default NoticesList;
