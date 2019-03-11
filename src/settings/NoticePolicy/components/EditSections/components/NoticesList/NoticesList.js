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
    sectionKey: PropTypes.string.isRequired,
    policy: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    templates: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
    triggeringEvents: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
    timeBasedEventsIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  onRemoveField = (index) => {
    this.props.fields.remove(index);
  };

  onAddField = () => {
    this.props.fields.push({});
  };

  render() {
    const {
      sectionKey,
      fields,
      policy,
      templates,
      triggeringEvents,
      timeBasedEventsIds,
    } = this.props;

    return (
      <React.Fragment>
        {fields.map((pathToNotice, noticeIndex) => {
          const notice = policy[sectionKey][noticeIndex];

          return (
            <NoticeCard
              key={pathToNotice}
              noticeIndex={noticeIndex}
              pathToNotice={pathToNotice}
              notice={notice}
              timeBasedEventsIds={timeBasedEventsIds}
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
              type="button"
              buttonStyle="default"
              data-test-add-notice-card
              onClick={this.onAddField}
            >
              <FormattedMessage id="ui-circulation.settings.noticePolicy.addNotice" />
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default NoticesList;
