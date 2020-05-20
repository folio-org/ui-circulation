import React from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
  FormattedMessage
} from 'react-intl';
import {
  find,
  get,
  isNull,
  isEmpty,
} from 'lodash';

import {
  Col,
  Row,
  KeyValue,
  MessageBanner,
} from '@folio/stripes/components';

import {
  noticesFormats,
  noticesFrequency,
  noticesIntervalPeriods,
} from '../../../../../../constants';

import getNotificationContent from '../../../../utils/notice-description';

import css from './NoticeCard.css';

class NoticeCard extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    intl: PropTypes.object,
    notice: PropTypes.object.isRequired,
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
  };

  getDropdownValue = (pathToValue, items) => {
    const { notice } = this.props;

    const seletedValue = get(notice, pathToValue);
    const selectedItem = find(items, (item) => item.value === seletedValue);

    return selectedItem ? selectedItem.label : null;
  };

  getTranslatedDropdownValue = (pathToValue, items) => {
    const { intl } = this.props;

    const translationKey = this.getDropdownValue(pathToValue, items);

    return isNull(translationKey) ? null : intl.formatMessage({ id: translationKey });
  };

  getRealTimeMessage = (pathToValue) => {
    const { notice } = this.props;

    const seletedValue = get(notice, pathToValue);

    return seletedValue
      ? <FormattedMessage id="ui-circulation.settings.noticePolicy.notices.send.shortTerm" />
      : <FormattedMessage id="ui-circulation.settings.noticePolicy.notices.send.longTerm" />;
  };

  render() {
    const {
      index,
      notice,
      sendEvents,
      sendEventTriggeringIds,
      templates,
      triggeringEvents,
    } = this.props;

    const translationNamespace = 'ui-circulation.settings.noticePolicy';
    const notificationKey = getNotificationContent(notice?.sendOptions?.sendWhen);

    return (
      <Row data-test-notice-card>
        <Col
          xs={12}
          className={css.notice}
        >
          <Row className={css.header}>
            <Col
              xs={3}
              className={css.headerTitle}
            >
              <FormattedMessage
                id={`${translationNamespace}.countableNotice`}
                values={{ counter: index + 1 }}
              />
            </Col>
          </Row>
          <Row>
            <Col
              xs={4}
              className={css.noticeField}
              data-test-notice-card-template-id
            >
              <KeyValue
                label={<FormattedMessage id={`${translationNamespace}.notices.template`} />}
                value={this.getDropdownValue('templateId', templates)}
              />
            </Col>
            <Col
              xs={1}
              className={css.cardText}
              data-test-notice-card-via-text
            >
              <KeyValue>
                <FormattedMessage id={`${translationNamespace}.notices.via`} />
              </KeyValue>
            </Col>
            <Col
              xs={2}
              className={css.noticeField}
              data-test-notice-card-format
            >
              <KeyValue
                label={<FormattedMessage id={`${translationNamespace}.notices.format`} />}
                value={this.getTranslatedDropdownValue('format', noticesFormats)}
              />
            </Col>
            <Col
              xs={5}
              className={css.noticeField}
              data-test-notice-card-triggering-event
            >
              <KeyValue
                label={<FormattedMessage id={`${translationNamespace}.notices.triggeringEvent`} />}
                value={this.getTranslatedDropdownValue('sendOptions.sendWhen', triggeringEvents)}
              />
            </Col>
          </Row>
          { notice.sendOptions.isSendOptionsAvailable(sendEventTriggeringIds) && (
            <>
              <Row>
                <Col
                  xs={12}
                  className={css.fieldLabel}
                >
                  <KeyValue label={<FormattedMessage id={`${translationNamespace}.notices.send`} />}>
                    <Row>
                      <Col xs={4}>
                        <KeyValue data-test-notice-card-send-how>
                          {this.getTranslatedDropdownValue('sendOptions.sendHow', sendEvents)}
                        </KeyValue>
                      </Col>
                      {notice.sendOptions.isBeforeOrAfter() && (
                        <>
                          <Col
                            xs={3}
                            data-test-notice-card-by-text
                          >
                            <KeyValue>
                              <FormattedMessage id={`${translationNamespace}.notices.by`} />
                            </KeyValue>
                          </Col>
                          <Col
                            xs={1}
                            data-test-notice-card-send-by-duration
                          >
                            <KeyValue>
                              {get(notice, 'sendOptions.sendBy.duration')}
                            </KeyValue>
                          </Col>
                          <Col
                            xs={4}
                            data-test-notice-card-send-by-interval-id
                          >
                            <KeyValue>
                              {this.getTranslatedDropdownValue('sendOptions.sendBy.intervalId', noticesIntervalPeriods)}
                            </KeyValue>
                          </Col>
                        </>
                      )}
                    </Row>
                  </KeyValue>
                </Col>
              </Row>
              {notice.sendOptions.isFrequencyAvailable(sendEventTriggeringIds) && (
                <Row>
                  <Col
                    xs={12}
                    className={css.fieldLabel}
                    data-test-notice-card-frequency-label
                  >
                    <KeyValue label={<FormattedMessage id={`${translationNamespace}.notices.frequency`} />}>
                      <Row>
                        <Col
                          xs={4}
                          data-test-notice-card-frequency
                        >
                          <KeyValue>
                            {this.getTranslatedDropdownValue('frequency', noticesFrequency)}
                          </KeyValue>
                        </Col>
                        {notice.isRecurring() && (
                          <>
                            <Col xs={3}>
                              <KeyValue>
                                <FormattedMessage id={`${translationNamespace}.notices.andEvery`} />
                              </KeyValue>
                            </Col>
                            <Col
                              xs={1}
                              data-test-notice-card-send-every-duration
                            >
                              <KeyValue>
                                {get(notice, 'sendOptions.sendEvery.duration')}
                              </KeyValue>
                            </Col>
                            <Col
                              xs={4}
                              data-test-notice-card-send-every-interval-id
                            >
                              <KeyValue>
                                {this.getTranslatedDropdownValue('sendOptions.sendEvery.intervalId', noticesIntervalPeriods)}
                              </KeyValue>
                            </Col>
                          </>
                        )}
                      </Row>
                    </KeyValue>
                  </Col>
                </Row>
              )}
            </>
          )}
          <Row>
            <Col
              xs={12}
              className={css.noticeField}
            >
              { notice.sendOptions.isLoanDueDateTimeSelected() && (
                <strong>{this.getRealTimeMessage('realTime')}</strong>
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
          <br />
        </Col>
      </Row>
    );
  }
}

export default injectIntl(NoticeCard);
