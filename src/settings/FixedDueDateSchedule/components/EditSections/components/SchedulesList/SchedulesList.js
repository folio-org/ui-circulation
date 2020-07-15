import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  isArray,
  uniqueId,
} from 'lodash';

import {
  Button,
  Col,
  Icon,
  Row,
} from '@folio/stripes/components';

import ScheduleCard from '../ScheduleCard';

import css from './SchedulesList.css';

class SchedulesList extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
  };

  onAddField = () => {
    this.props.fields.push({ key: uniqueId('schedule_') });
  };

  onRemoveField = (index) => {
    this.props.fields.remove(index);
  };

  render() {
    const {
      fields,
      meta: {
        error,
        submitFailed,
      },
    } = this.props;

    return (
      <>
        <Row>
          <Col
            className={css.btnContainer}
            xs={2}
            xsOffset={10}
          >
            <Button
              data-test-add-schedule
              type="button"
              onClick={this.onAddField}
            >
              <Icon icon="plus-sign">
                <FormattedMessage id="ui-circulation.settings.fDDSform.new" />
              </Icon>
            </Button>
          </Col>
        </Row>
        { submitFailed && error && !isArray(error) && (
          <Row>
            <Col xs={12} className={css.scheduleError}>
              {error}
            </Col>
          </Row>
        )}
        { fields.map((schedule, index) => {
          return (
            <ScheduleCard
              key={fields.value[index].key}
              pathToSchedule={schedule}
              scheduleIndex={index}
              onRemoveSchedule={this.onRemoveField}
            />
          );
        })}
      </>
    );
  }
}

export default SchedulesList;
