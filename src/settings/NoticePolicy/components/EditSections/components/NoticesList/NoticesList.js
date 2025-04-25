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
    fields: PropTypes.shape({
      push: PropTypes.func,
      remove: PropTypes.func,
      map: PropTypes.func,
    }).isRequired,
    policy: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      loanNotices: PropTypes.arrayOf(PropTypes.shape({
        templateId: PropTypes.string,
      })),
    }).isRequired,
    sectionKey: PropTypes.string.isRequired,
    templates: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
    triggeringEvents: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
    sendEventTriggeringIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    getSendEvents: PropTypes.func.isRequired,
  };

  onAddField = () => {
    this.props.fields.push({});
  };

  onRemoveField = (index) => {
    this.props.fields.remove(index);
  };

  render() {
    const {
      sectionKey,
      fields,
      policy,
      getSendEvents,
      sendEventTriggeringIds,
      templates,
      triggeringEvents,
    } = this.props;

    return (
      <>
        {fields.map((pathToNotice, noticeIndex) => {
          const notice = policy[sectionKey][noticeIndex];
          const sendEvents = getSendEvents(notice?.sendOptions?.sendWhen);

          return (
            <NoticeCard
              data-testid={`noticeCard${noticeIndex}`}
              key={pathToNotice}
              notice={notice}
              noticeIndex={noticeIndex}
              pathToNotice={pathToNotice}
              sendEvents={sendEvents}
              sendEventTriggeringIds={sendEventTriggeringIds}
              templates={templates}
              triggeringEvents={triggeringEvents}
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
              data-testid="addNotice"
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
