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
  Button,
  Col,
  Row,
  IconButton,
  Select,
  Checkbox,
} from '@folio/stripes/components';

import {
  noticesFormats,
  noticesFrequency,
  noticesSendEvent,
  noticesIntervalPeriods,
} from '../../../../../../constants';

import css from './NoticeCard.css';

class NoticeCard extends React.Component {
  static propTypes = {
    sectionKey: PropTypes.string.isRequired,
    fields: PropTypes.object.isRequired,
    policy: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    templates: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
    sendWhenOptions: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
  };

  getIntervalValues = () => {
    return new Array(100).fill().map((value, index) => ({
      value: index + 1,
      label: index + 1,
    }));
  };

  getDropdownItems = (items) => {
    const { intl } = this.props;

    return map(items, ({ value, label }) => ({
      value,
      label: intl.formatMessage({ id: label }),
    }));
  };

  render() {
    const {
      sectionKey,
      fields,
      policy,
      templates,
      sendWhenOptions,
    } = this.props;

    return (
      <React.Fragment>
        {fields.map((loanNotice, index) => {
          const isRecurring = policy[sectionKey][index].isRecurring();
          const isBeforeOrAfter = policy[sectionKey][index].sendOptions.isBeforeOrAfter();
          const sendEventLabelId = isRecurring ? 'startigSendEvent' : 'sendEvent';

          return (
            <Row
              data-test-notice-card
              key={loanNotice}
            >
              <Col
                xs={7}
                key={index}
                className={css.loanNotice}
              >
                <Row className={css.header}>
                  <Col
                    xs={3}
                    className={css.headerTitle}
                    data-test-notice-card-counter
                  >
                    <FormattedMessage
                      id="ui-circulation.settings.noticePolicy.countableNotice"
                      values={{ counter: index + 1 }}
                    />
                  </Col>
                  <Col
                    xs={1}
                    xsOffset={8}
                    className={css.headerIcon}
                  >
                    <IconButton
                      data-test-notice-card-remove
                      icon="trash"
                      onClick={() => fields.remove(index)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col
                    xs={5}
                    className={css.noticeField}
                    data-test-notice-card-template-id
                  >
                    <Field
                      name={`${loanNotice}.templateId`}
                      label={(
                        <FormattedMessage id="ui-circulation.settings.noticePolicy.notices.template">
                          { message => `${message} *` }
                        </FormattedMessage>
                      )}
                      component={Select}
                      dataOptions={templates}
                      placeholder=" "
                    />
                  </Col>
                  <Col
                    xs={1}
                    className={css.cardText}
                    data-test-notice-card-via-text
                  >
                    <FormattedMessage id="ui-circulation.settings.noticePolicy.notices.via" />
                  </Col>
                  <Col
                    xs={3}
                    className={css.noticeField}
                    data-test-notice-card-format
                  >
                    <Field
                      name={`${loanNotice}.format`}
                      label={(
                        <FormattedMessage id="ui-circulation.settings.noticePolicy.notices.format">
                          { message => `${message} *` }
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
                    data-test-notice-card-frequency
                  >
                    <Field
                      name={`${loanNotice}.frequency`}
                      label={(
                        <FormattedMessage id="ui-circulation.settings.noticePolicy.notices.frequency">
                          { message => `${message} *` }
                        </FormattedMessage>
                      )}
                      component={Select}
                      dataOptions={this.getDropdownItems(noticesFrequency)}
                      placeholder=" "
                    />
                  </Col>
                </Row>
                <React.Fragment>
                  <Row>
                    <Col
                      xs={12}
                      className={css.fieldLabel}
                      data-test-notice-card-event-label
                    >
                      <FormattedMessage id={`ui-circulation.settings.noticePolicy.notices.${sendEventLabelId}`}>
                        { message => `${message} *` }
                      </FormattedMessage>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      xs={2}
                      className={css.noticeField}
                      data-test-notice-card-send-how
                    >
                      <Field
                        name={`${loanNotice}.sendOptions.sendHow`}
                        component={Select}
                        dataOptions={this.getDropdownItems(noticesSendEvent)}
                        placeholder=" "
                      />
                    </Col>
                    <Col
                      xs={3}
                      className={css.noticeField}
                      data-test-notice-card-send-when
                    >
                      <Field
                        name={`${loanNotice}.sendOptions.sendWhen`}
                        component={Select}
                        dataOptions={this.getDropdownItems(sendWhenOptions)}
                        placeholder=" "
                      />
                    </Col>
                    { isBeforeOrAfter && (
                      <React.Fragment>
                        <Col
                          xs={1}
                          className={css.cardText}
                          style={{ paddingBottom: '15px' }}
                          data-test-notice-card-send-by-label
                        >
                          <FormattedMessage id="ui-circulation.settings.noticePolicy.notices.by" />
                        </Col>
                        <Col
                          xs={3}
                          className={css.noticeField}
                          data-test-notice-card-send-by-duration
                        >
                          <Field
                            name={`${loanNotice}.sendOptions.sendBy.duration`}
                            component={Select}
                            dataOptions={this.getIntervalValues()}
                            placeholder=" "
                          />
                        </Col>
                        <Col
                          xs={3}
                          className={css.noticeField}
                          data-test-notice-card-send-by-interval-id
                        >
                          <Field
                            data-test-notice-card-send-by-interval-id
                            name={`${loanNotice}.sendOptions.sendBy.intervalId`}
                            component={Select}
                            dataOptions={this.getDropdownItems(noticesIntervalPeriods)}
                            placeholder=" "
                          />
                        </Col>
                      </React.Fragment>
                    )
                  }
                  </Row>
                </React.Fragment>
                { isRecurring && (
                  <React.Fragment>
                    <Row>
                      <Col
                        xs={12}
                        className={css.fieldLabel}
                        data-test-notice-card-send-every-label
                      >
                        <FormattedMessage id="ui-circulation.settings.noticePolicy.notices.sendEvery">
                          { message => `${message} *` }
                        </FormattedMessage>
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        xs={3}
                        className={css.noticeField}
                        data-test-notice-card-send-every-duration
                      >
                        <Field
                          name={`${loanNotice}.sendOptions.sendEvery.duration`}
                          component={Select}
                          dataOptions={this.getIntervalValues()}
                          placeholder=" "
                        />
                      </Col>
                      <Col
                        xs={3}
                        className={css.noticeField}
                        data-test-notice-card-send-every-interval-id
                      >
                        <Field
                          name={`${loanNotice}.sendOptions.sendEvery.intervalId`}
                          component={Select}
                          dataOptions={this.getDropdownItems(noticesIntervalPeriods)}
                          placeholder=" "
                        />
                      </Col>
                    </Row>
                  </React.Fragment>
                )}
                <Row>
                  <Col
                    xs={12}
                    className={css.noticeField}
                    data-test-notice-card-real-time
                  >
                    <Field
                      name={`${loanNotice}.realTime`}
                      label={<FormattedMessage id="ui-circulation.settings.noticePolicy.notices.realTime" />}
                      component={Checkbox}
                      type="checkbox"
                      normalize={v => !!v}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
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
              onClick={() => fields.push({})}
              data-test-add-notice-card
            >
              <FormattedMessage id="ui-circulation.settings.noticePolicy.addNotice" />
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default injectIntl(NoticeCard);
