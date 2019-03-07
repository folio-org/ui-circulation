import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { map } from 'lodash';
import {
  intlShape,
  injectIntl,
  FormattedMessage,
} from 'react-intl';

import {
  Col,
  Row,
  IconButton,
  Select,
  Checkbox,
} from '@folio/stripes/components';

import Period from '../../../../../components/Period';

import {
  noticesFormats,
  noticesFrequency,
  noticesSendEvent,
  noticesIntervalPeriods,
} from '../../../../../../constants';

import css from './NoticeCard.css';

class NoticeCard extends React.Component {
  static propTypes = {
    intl: intlShape.isRequired,
    noticeIndex: PropTypes.number.isRequired,
    pathToNotice: PropTypes.string.isRequired,
    notice: PropTypes.object.isRequired,
    timeBasedEventsIds: PropTypes.arrayOf(PropTypes.string).isRequired,
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

  getDropdownItems = (items) => {
    const { intl } = this.props;

    return map(items, ({ value, label }) => ({
      value,
      label: intl.formatMessage({ id: label }),
    }));
  };

  onRemove = () => {
    const {
      noticeIndex,
      onRemoveNotice,
    } = this.props;

    onRemoveNotice(noticeIndex);
  };

  render() {
    const {
      noticeIndex,
      pathToNotice,
      notice,
      timeBasedEventsIds,
      templates,
      triggeringEvents,
    } = this.props;

    return (
      <Row>
        <Col
          xs={7}
          className={css.notice}
        >
          <Row className={css.header}>
            <Col
              xs={3}
              className={css.headerTitle}
            >
              <FormattedMessage
                id="ui-circulation.settings.noticePolicy.countableNotice"
                values={{ counter: noticeIndex + 1 }}
              />
            </Col>
            <Col
              xs={1}
              xsOffset={8}
              className={css.headerIcon}
            >
              <IconButton
                icon="trash"
                onClick={this.onRemove}
              />
            </Col>
          </Row>
          <Row>
            <Col
              xs={12}
              className={css.noticeContainer}
            >
              <Row>
                <Col
                  xs={4}
                  className={css.noticeField}
                >
                  <Field
                    name={`${pathToNotice}.templateId`}
                    label={(
                      <FormattedMessage id="ui-circulation.settings.noticePolicy.notices.template">
                        {message => `${message} *`}
                      </FormattedMessage>
                    )}
                    component={Select}
                    dataOptions={templates}
                    placeholder=" "
                  />
                </Col>
                <Col
                  xs={2}
                  className={css.cardText}
                >
                  <FormattedMessage id="ui-circulation.settings.noticePolicy.notices.via" />
                </Col>
                <Col
                  xs={3}
                  className={css.noticeField}
                >
                  <Field
                    name={`${pathToNotice}.format`}
                    label={(
                      <FormattedMessage id="ui-circulation.settings.noticePolicy.notices.format">
                        {message => `${message} *`}
                      </FormattedMessage>
                    )}
                    component={Select}
                    dataOptions={this.getDropdownItems(noticesFormats)}
                    placeholder=" "
                  />
                </Col>
                <Col
                  xs={3}
                  className={css.noticeField}
                >
                  <Field
                    name={`${pathToNotice}.sendOptions.sendWhen`}
                    label={(
                      <FormattedMessage id="ui-circulation.settings.noticePolicy.notices.triggeringEvent">
                        {message => `${message} *`}
                      </FormattedMessage>
                    )}
                    component={Select}
                    dataOptions={this.getDropdownItems(triggeringEvents)}
                    placeholder=" "
                  />
                </Col>
              </Row>
              {notice.sendOptions.isTimeBasedEventSelected(timeBasedEventsIds) && (
                <React.Fragment>
                  <Row>
                    <Col xs={12}>
                      <FormattedMessage id="ui-circulation.settings.noticePolicy.notices.send">
                        {message => `${message} *`}
                      </FormattedMessage>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      xs={4}
                      className={css.noticeField}
                    >
                      <Field
                        name={`${pathToNotice}.sendOptions.sendHow`}
                        component={Select}
                        dataOptions={this.getDropdownItems(noticesSendEvent)}
                        placeholder=" "
                      />
                    </Col>
                    {notice.sendOptions.isBeforeOrAfter() && (
                      <React.Fragment>
                        <Col
                          xs={2}
                          className={`${css.cardText} ${css.cardTextWithotLabel}`}
                        >
                          <FormattedMessage id="ui-circulation.settings.noticePolicy.notices.by" />
                        </Col>
                        <Col
                          xs={6}
                          className={css.noticeField}
                        >
                          <Period
                            emptySelectPlaceholder
                            inputSize={6}
                            selectSize={6}
                            inputPlaceholder={1}
                            inputValuePath={`${pathToNotice}.sendOptions.sendBy.duration`}
                            selectValuePath={`${pathToNotice}.sendOptions.sendBy.intervalId`}
                            intervalPeriods={this.getDropdownItems(noticesIntervalPeriods)}
                          />
                        </Col>
                      </React.Fragment>
                    )
                    }
                  </Row>
                  <React.Fragment>
                    <Row>
                      <Col xs={12}>
                        <FormattedMessage id="ui-circulation.settings.noticePolicy.notices.frequency">
                          {message => `${message} *`}
                        </FormattedMessage>
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        xs={4}
                        className={css.noticeField}
                      >
                        <Field
                          name={`${pathToNotice}.frequency`}
                          component={Select}
                          dataOptions={this.getDropdownItems(noticesFrequency)}
                          placeholder=" "
                        />
                      </Col>
                      {notice.isRecurring() && (
                        <React.Fragment>
                          <Col
                            xs={2}
                            className={`${css.cardText} ${css.cardTextWithotLabel}`}
                          >
                            <FormattedMessage id="ui-circulation.settings.noticePolicy.notices.andEvery" />
                          </Col>
                          <Col
                            xs={6}
                            className={css.noticeField}
                          >
                            <Period
                              emptySelectPlaceholder
                              inputSize={6}
                              selectSize={6}
                              inputPlaceholder={1}
                              inputValuePath={`${pathToNotice}.sendOptions.sendEvery.duration`}
                              selectValuePath={`${pathToNotice}.sendOptions.sendEvery.intervalId`}
                              intervalPeriods={this.getDropdownItems(noticesIntervalPeriods)}
                            />
                          </Col>
                        </React.Fragment>
                      )}
                    </Row>
                  </React.Fragment>
                </React.Fragment>
              )}
              <Row>
                <Col
                  xs={12}
                  className={css.noticeField}
                >
                  <Field
                    name={`${pathToNotice}.realTime`}
                    label={<FormattedMessage id="ui-circulation.settings.noticePolicy.notices.realTime" />}
                    component={Checkbox}
                    type="checkbox"
                    normalize={v => !!v}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default injectIntl(NoticeCard);
