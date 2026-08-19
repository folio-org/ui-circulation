import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { DragDropProvider } from '@dnd-kit/react';

import {
  Button,
  Col,
  Row,
} from '@folio/stripes/components';

import SortableNoticeCard from '../SortableNoticeCard';

import css from './NoticesList.css';

class NoticesList extends React.Component {
  static propTypes = {
    fields: PropTypes.shape({
      push: PropTypes.func,
      insert: PropTypes.func,
      remove: PropTypes.func,
      move: PropTypes.func,
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

  constructor(props) {
    super(props);

    this.nextNoticeId = 0;
    this.noticeIds = [];
    this.initialNotices = {};
  }

  getNoticeId = (index) => {
    while (this.noticeIds.length <= index) {
      this.noticeIds.push(this.nextNoticeId++);
    }

    return this.noticeIds[index];
  };

  getInitialNotice = (noticeId, notice) => {
    if (!(noticeId in this.initialNotices)) {
      this.initialNotices[noticeId] = notice;
    }

    return this.initialNotices[noticeId];
  };

  onAddField = () => {
    this.noticeIds.push(this.nextNoticeId++);
    this.props.fields.push({});
  };

  onInsertField = (index) => {
    this.noticeIds.splice(index, 0, this.nextNoticeId++);
    this.props.fields.insert(index, {});
  };

  onRemoveField = (index) => {
    const [removedId] = this.noticeIds.splice(index, 1);
    delete this.initialNotices[removedId];
    this.props.fields.remove(index);
  };

  onDragEnd = ({ operation, canceled }) => {
    const { source } = operation;

    if (canceled || !source) {
      return;
    }

    const { initialIndex, index } = source;

    if (initialIndex !== index) {
      const [noticeId] = this.noticeIds.splice(initialIndex, 1);
      this.noticeIds.splice(index, 0, noticeId);
      // When dropping a notice, the warning appears: "Detected a large number
      // of updates inside startTransition". This means that final-form
      // notifies many field subscribers, triggering React's large-update
      // when fields.move runs inside dnd-kit's startTransition. Run it in
      // a microtask to avoid this warning. Using a microtask avoids the extra
      // rendering delay introduced by setTimeout.
      queueMicrotask(() => this.props.fields.move(initialIndex, index));
    }
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
      <DragDropProvider onDragEnd={this.onDragEnd}>
        {fields.map((pathToNotice, noticeIndex) => {
          const notice = policy[sectionKey][noticeIndex];
          const sendEvents = getSendEvents(notice?.sendOptions?.sendWhen);
          const noticeId = this.getNoticeId(noticeIndex);
          const initialNotice = this.getInitialNotice(noticeId, notice);

          return (
            <SortableNoticeCard
              data-testid={`noticeCard${noticeIndex}`}
              key={noticeId}
              id={noticeId}
              notice={notice}
              initialNotice={initialNotice}
              noticeIndex={noticeIndex}
              pathToNotice={pathToNotice}
              sendEvents={sendEvents}
              sendEventTriggeringIds={sendEventTriggeringIds}
              templates={templates}
              triggeringEvents={triggeringEvents}
              onAddNotice={this.onInsertField}
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
      </DragDropProvider>
    );
  }
}

export default NoticesList;
