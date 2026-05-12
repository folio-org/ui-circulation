import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import {
  Button,
  Col,
  Row,
} from '@folio/stripes/components';

import NoticeCard from '../NoticeCard';

import css from './NoticesList.css';

export const getAlignedNoticeIds = (noticeIds, count, createNoticeId) => {
  const nextNoticeIds = noticeIds.slice(0, count);

  while (nextNoticeIds.length < count) {
    nextNoticeIds.push(createNoticeId());
  }

  return nextNoticeIds;
};

export const moveNoticeIds = (noticeIds, oldIndex, newIndex) => {
  if (oldIndex === newIndex) {
    return noticeIds;
  }

  return arrayMove(noticeIds, oldIndex, newIndex);
};

export const reorderNoticeFields = (event, noticeIds, moveField) => {
  const { active, over } = event;

  if (!over || active?.id === over?.id || typeof moveField !== 'function') {
    return;
  }

  const oldIndex = noticeIds.indexOf(active.id);
  const newIndex = noticeIds.indexOf(over.id);

  if (oldIndex === -1 || newIndex === -1) {
    return;
  }

  moveField(oldIndex, newIndex);
};

const noticeItemPropTypes = {
  id: PropTypes.string.isRequired,
  notice: PropTypes.object.isRequired,
  noticeIndex: PropTypes.number.isRequired,
  pathToNotice: PropTypes.string.isRequired,
  sendEvents: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
};

const sortableNoticePropTypes = {
  ...noticeItemPropTypes,
  sendEventTriggeringIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  templates: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  triggeringEvents: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  onRemoveNotice: PropTypes.func.isRequired,
};

const SortableNoticeCard = ({
  id,
  notice,
  noticeIndex,
  pathToNotice,
  sendEvents,
  sendEventTriggeringIds,
  templates,
  triggeringEvents,
  onRemoveNotice,
}) => {
  const {
    attributes,
    listeners,
    setActivatorNodeRef,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${css.sortableNotice} ${isDragging ? css.sortableNoticeDragging : ''}`.trim()}
    >
      <NoticeCard
        data-testid={`noticeCard${noticeIndex}`}
        notice={notice}
        noticeIndex={noticeIndex}
        pathToNotice={pathToNotice}
        sendEvents={sendEvents}
        sendEventTriggeringIds={sendEventTriggeringIds}
        templates={templates}
        triggeringEvents={triggeringEvents}
        onRemoveNotice={onRemoveNotice}
        dragHandleProps={{
          ...attributes,
          ...listeners,
        }}
        dragHandleRef={setActivatorNodeRef}
        dragHandleTitleId={`noticeCardTitle${noticeIndex}`}
      />
    </div>
  );
};

SortableNoticeCard.propTypes = sortableNoticePropTypes;

const SortableNotices = ({
  noticeItems,
  onRemoveNotice,
  onDragEnd,
  sendEventTriggeringIds,
  templates,
  triggeringEvents,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={noticeItems.map(({ id }) => id)}
        strategy={verticalListSortingStrategy}
      >
        {noticeItems.map(({ id, ...noticeItem }) => (
          <SortableNoticeCard
            key={id}
            id={id}
            {...noticeItem}
            onRemoveNotice={onRemoveNotice}
            sendEventTriggeringIds={sendEventTriggeringIds}
            templates={templates}
            triggeringEvents={triggeringEvents}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

SortableNotices.propTypes = {
  noticeItems: PropTypes.arrayOf(PropTypes.shape(noticeItemPropTypes)).isRequired,
  onRemoveNotice: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  sendEventTriggeringIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  templates: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  triggeringEvents: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
};

class NoticesList extends React.Component {
  static propTypes = {
    fields: PropTypes.shape({
      move: PropTypes.func,
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

  constructor(props) {
    super(props);

    this.noticeIds = [];
    this.nextNoticeId = 0;
  }

  createNoticeId = () => {
    const noticeId = `notice-card-${this.nextNoticeId}`;

    this.nextNoticeId += 1;

    return noticeId;
  };

  getNoticeIds = (count) => {
    this.noticeIds = getAlignedNoticeIds(this.noticeIds, count, this.createNoticeId);

    return this.noticeIds;
  };

  onAddField = () => {
    this.noticeIds = [...this.noticeIds, this.createNoticeId()];
    this.props.fields.push({});
  };

  onRemoveField = (index) => {
    this.noticeIds = this.noticeIds.filter((_, currentIndex) => currentIndex !== index);
    this.props.fields.remove(index);
  };

  onMoveField = (oldIndex, newIndex) => {
    this.noticeIds = moveNoticeIds(this.noticeIds, oldIndex, newIndex);
    this.props.fields.move(oldIndex, newIndex);
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

    const noticePaths = fields.map((pathToNotice) => pathToNotice);
    const noticeIds = this.getNoticeIds(noticePaths.length);

    const noticeItems = noticePaths.map((pathToNotice, noticeIndex) => {
      const notice = policy[sectionKey][noticeIndex];

      return {
        id: noticeIds[noticeIndex],
        notice,
        noticeIndex,
        pathToNotice,
        sendEvents: getSendEvents(notice?.sendOptions?.sendWhen) || [],
      };
    });

    return (
      <>
        <SortableNotices
          noticeItems={noticeItems}
          onRemoveNotice={this.onRemoveField}
          onDragEnd={(event) => reorderNoticeFields(event, noticeIds, this.onMoveField)}
          sendEventTriggeringIds={sendEventTriggeringIds}
          templates={templates}
          triggeringEvents={triggeringEvents}
        />
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
