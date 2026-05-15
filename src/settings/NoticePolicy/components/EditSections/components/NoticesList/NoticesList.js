import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';

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
      insert: PropTypes.func,
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

  noticeCardKeys = [];

  nextNoticeCardKey = 0;

  createNoticeCardKey = () => {
    const noticeCardKey = `notice-card-${this.nextNoticeCardKey}`;

    this.nextNoticeCardKey += 1;

    return noticeCardKey;
  };

  getNoticeCardKey = (pathToNotice, notice, noticeIndex) => {
    let noticeCardKey = notice?.templateId;

    if (!noticeCardKey) {
      if (!this.noticeCardKeys[noticeIndex]) {
        this.noticeCardKeys[noticeIndex] = this.createNoticeCardKey();
      }

      noticeCardKey = this.noticeCardKeys[noticeIndex];
    }

    return `${noticeCardKey}-${pathToNotice}`;
  };

  getNewNotice = () => ({
    sendOptions: {
      sendBy: {},
      sendEvery: {},
    },
  });

  onAddField = () => {
    this.noticeCardKeys.push(this.createNoticeCardKey());
    this.props.fields.push(this.getNewNotice());
  };

  onAddFieldAfter = (index) => {
    // this.noticeCardKeys.splice(index + 1, 0, this.createNoticeCardKey());
    this.props.fields.insert(index + 1, this.getNewNotice());
  };

  onRemoveField = (index) => {
    // this.noticeCardKeys.splice(index, 1);
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
    const notices = policy[sectionKey] || [];
    console.log('notices', notices)
    console.log('policy', policy)

    return (
      <>
        {fields.map((pathToNotice, noticeIndex) => {
          const notice = notices[noticeIndex] || {};
          const sendEvents = getSendEvents(notice?.sendOptions?.sendWhen);
          console.log('key', policy.loanNotices?.[noticeIndex]?.templateId)

          return (
            <NoticeCard
              data-testid={`noticeCard${noticeIndex}`}
              key={policy.loanNotices?.[noticeIndex]?.templateId}
              notice={notice}
              noticeIndex={noticeIndex}
              pathToNotice={pathToNotice}
              sendEvents={sendEvents}
              sendEventTriggeringIds={sendEventTriggeringIds}
              templates={templates}
              triggeringEvents={triggeringEvents}
              onAddNotice={this.onAddFieldAfter}
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
