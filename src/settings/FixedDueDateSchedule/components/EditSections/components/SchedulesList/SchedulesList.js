import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { isArray } from 'lodash';

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
    fields: PropTypes.shape({
      push: PropTypes.func,
      remove: PropTypes.func,
      map: PropTypes.func,
    }).isRequired,
    meta: PropTypes.shape({
      error: PropTypes.string,
      submitFailed: PropTypes.bool,
    }).isRequired,
    timezone: PropTypes.string.isRequired,
  };

  onAddField = () => {
    this.props.fields.push({});
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
      timezone,
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
              data-testid="addScheduleButton"
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
          <Row data-testid="errorRow">
            <Col xs={12} className={css.scheduleError}>
              {error}
            </Col>
          </Row>
        )}
        { fields.map((schedule, index) => {
          return (
            <ScheduleCard
              key={schedule}
              pathToSchedule={schedule}
              scheduleIndex={index}
              onRemoveSchedule={this.onRemoveField}
              timezone={timezone}
            />
          );
        })}
      </>
    );
  }
}

export default SchedulesList;
