import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Field } from 'react-final-form';
import {
  injectIntl,
  FormattedMessage,
} from 'react-intl';

import {
  Col,
  IconButton,
  Label,
  MessageBanner,
  Row,
  Select,
  RadioButton,
} from '@folio/stripes/components';

import Period from '../../../../../components/Period';

import {
  noticesFormats,
  noticesFrequency,
  noticesIntervalPeriods,
} from '../../../../../../constants';

import optionsGenerator from '../../../../../utils/options-generator';
import getNotificationContent from '../../../../utils/notice-description';

import css from './NoticeCard.css';

class NoticeCard extends React.Component {
  static propTypes = {
    intl: PropTypes.object,
    notice: PropTypes.object.isRequired,
    noticeIndex: PropTypes.number.isRequired,
    pathToNotice: PropTypes.string.isRequired,
    sendEvents: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
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

  constructor(props) {
    super(props);

    this.generateOptions = optionsGenerator.bind(null, this.props.intl.formatMessage);
  }

  onRemove = () => {
    const {
      noticeIndex,
      onRemoveNotice,
    } = this.props;

    onRemoveNotice(noticeIndex);
  };

  render() {
    const {
      intl,
      notice,
      noticeIndex,
      pathToNotice,
      sendEvents,
      sendEventTriggeringIds,
      templates,
      triggeringEvents,
    } = this.props;

    const blankPlaceholder = intl.formatMessage({ id: 'ui-circulation.settings.common.blankPlaceholder' });
    const notificationKey = getNotificationContent(notice?.sendOptions?.sendWhen);

    return (
      <Row data-test-notice-card>
        <Col
          xs={7}
          className={css.notice}
        >
          <Row className={css.header}>
            <Col
              xs={3}
              className={css.headerTitle}
              data-test-notice-card-counter
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
                data-test-notice-card-remove
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
                  data-test-notice-card-template-id
                >
                  <Field
                    name={`${pathToNotice}.templateId`}
                    label={<FormattedMessage id="ui-circulation.settings.noticePolicy.notices.template" />}
                    required
                    component={Select}
                    dataOptions={templates}
                    placeholder={blankPlaceholder}
                  />
                </Col>
                <Col
                  xs={2}
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
                    name={`${pathToNotice}.format`}
                    label={<FormattedMessage id="ui-circulation.settings.noticePolicy.notices.format" />}
                    required
                    component={Select}
                    placeholder={blankPlaceholder}
                  >
                    {this.generateOptions(noticesFormats)}
                  </Field>
                </Col>
                <Col
                  xs={3}
                  className={css.noticeField}
                  data-test-notice-card-triggering-event
                >
                  <Field
                    name={`${pathToNotice}.sendOptions.sendWhen`}
                    label={<FormattedMessage id="ui-circulation.settings.noticePolicy.notices.triggeringEvent" />}
                    required
                    component={Select}
                    placeholder={blankPlaceholder}
                  >
                    {this.generateOptions(triggeringEvents)}
                  </Field>
                </Col>
              </Row>
              {notice.sendOptions.isSendOptionsAvailable(sendEventTriggeringIds) && (
                <>
                  <Row>
                    <Col
                      xs={12}
                      data-test-notice-card-event-label
                    >
                      <Label required>
                        <FormattedMessage id="ui-circulation.settings.noticePolicy.notices.send" />
                      </Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      xs={4}
                      className={css.noticeField}
                      data-test-notice-card-send-how
                    >
                      <Field
                        name={`${pathToNotice}.sendOptions.sendHow`}
                        component={Select}
                        placeholder={blankPlaceholder}
                      >
                        {this.generateOptions(sendEvents)}
                      </Field>
                    </Col>
                    {notice.sendOptions.isBeforeOrAfter() && (
                      <>
                        <Col
                          xs={2}
                          className={`${css.cardText} ${css.cardTextWithotLabel}`}
                          data-test-notice-card-send-by-label
                        >
                          <FormattedMessage id="ui-circulation.settings.noticePolicy.notices.by" />
                        </Col>
                        <Col
                          xs={6}
                          className={css.noticeField}
                          data-test-notice-card-send-by
                        >
                          <Period
                            inputSize={6}
                            selectSize={6}
                            inputPlaceholder={1}
                            selectPlaceholder="ui-circulation.settings.common.blankPlaceholder"
                            inputValuePath={`${pathToNotice}.sendOptions.sendBy.duration`}
                            selectValuePath={`${pathToNotice}.sendOptions.sendBy.intervalId`}
                            intervalPeriods={this.generateOptions(noticesIntervalPeriods)}
                          />
                        </Col>
                      </>
                    )}
                  </Row>
                  { notice.sendOptions.isFrequencyAvailable(sendEventTriggeringIds) && (
                    <>
                      <Row>
                        <Col
                          xs={12}
                          data-test-notice-card-frequency-label
                        >
                          <Label required>
                            <FormattedMessage id="ui-circulation.settings.noticePolicy.notices.frequency" />
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          xs={4}
                          className={css.noticeField}
                          data-test-notice-card-frequency
                        >
                          <Field
                            name={`${pathToNotice}.frequency`}
                            component={Select}
                            placeholder={blankPlaceholder}
                          >
                            {this.generateOptions(noticesFrequency)}
                          </Field>
                        </Col>
                        {notice.isRecurring() && (
                          <>
                            <Col
                              xs={2}
                              className={`${css.cardText} ${css.cardTextWithotLabel}`}
                              data-test-notice-card-send-every-label
                            >
                              <FormattedMessage id="ui-circulation.settings.noticePolicy.notices.andEvery" />
                            </Col>
                            <Col
                              xs={6}
                              className={css.noticeField}
                              data-test-notice-card-send-every
                            >
                              <Period
                                inputSize={6}
                                selectSize={6}
                                inputPlaceholder={1}
                                selectPlaceholder="ui-circulation.settings.common.blankPlaceholder"
                                inputValuePath={`${pathToNotice}.sendOptions.sendEvery.duration`}
                                selectValuePath={`${pathToNotice}.sendOptions.sendEvery.intervalId`}
                                intervalPeriods={this.generateOptions(noticesIntervalPeriods)}
                              />
                            </Col>
                          </>
                        )}
                      </Row>
                    </>
                  )}
                </>
              )}
              <Row>
                <Col xs={12}>
                  { notice.sendOptions.isLoanDueDateTimeSelected() && (
                    <>
                      <Field
                        name={`${pathToNotice}.realTime`}
                        component={RadioButton}
                        type="radio"
                        label={<FormattedMessage id="ui-circulation.settings.noticePolicy.notices.send.longTerm" />}
                        value="false"
                      />
                      <Field
                        name={`${pathToNotice}.realTime`}
                        component={RadioButton}
                        type="radio"
                        label={<FormattedMessage id="ui-circulation.settings.noticePolicy.notices.send.shortTerm" />}
                        value="true"
                      />
                    </>
                  )}
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  { !isEmpty(notificationKey) && (
                    <MessageBanner type="warning">
                      <FormattedMessage id={notificationKey} />
                    </MessageBanner>) }
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
