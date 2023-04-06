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
import getRealTimeLabels from '../../../../utils/get-real-time-labels';
import isRealTimeMessage from '../../../../utils/is-real-time-message';

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

    const selectedValue = get(notice, pathToValue);
    const selectedItem = find(items, (item) => item.value === selectedValue);

    return selectedItem ? selectedItem.label : null;
  };

  getTranslatedDropdownValue = (pathToValue, items) => {
    const { intl } = this.props;

    const translationKey = this.getDropdownValue(pathToValue, items);

    return isNull(translationKey) ? null : intl.formatMessage({ id: translationKey });
  };

  getRealTimeMessage = (pathToValue) => {
    const { notice } = this.props;
    const isLostItemFees = notice.sendOptions.isLostItemFeesSelected();
    const selectedValue = get(notice, pathToValue);
    const realTimeLabels = getRealTimeLabels(isLostItemFees);

    return selectedValue
      ? <FormattedMessage id={realTimeLabels.shortTerm} />
      : <FormattedMessage id={realTimeLabels.longTerm} />;
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
    const isRealTimeMessageVisible = isRealTimeMessage(notice.sendOptions);

    return (
      <Row
        data-testid="noticeCard"
        data-test-notice-card
      >
        <Col
          xs={12}
          className={css.notice}
        >
          <Row className={css.header}>
            <Col
              data-testid="header"
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
              data-testid="noticeCardTemplate"
              data-test-notice-card-template-id
              xs={4}
              className={css.noticeField}
            >
              <KeyValue
                label={<FormattedMessage id={`${translationNamespace}.notices.template`} />}
                value={this.getDropdownValue('templateId', templates)}
              />
            </Col>
            <Col
              data-testid="noticeCardViaText"
              data-test-notice-card-via-text
              xs={1}
              className={css.cardText}
            >
              <KeyValue>
                <FormattedMessage id={`${translationNamespace}.notices.via`} />
              </KeyValue>
            </Col>
            <Col
              data-testid="noticeCardFormat"
              data-test-notice-card-format
              xs={2}
              className={css.noticeField}
            >
              <KeyValue
                label={<FormattedMessage id={`${translationNamespace}.notices.format`} />}
                value={this.getTranslatedDropdownValue('format', noticesFormats)}
              />
            </Col>
            <Col
              data-testid="noticeCardTriggeringEvent"
              data-test-notice-card-triggering-event
              xs={5}
              className={css.noticeField}
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
                  data-testid="noticeSend"
                  xs={12}
                  className={css.fieldLabel}
                >
                  <KeyValue label={<FormattedMessage id={`${translationNamespace}.notices.send`} />}>
                    <Row>
                      <Col
                        data-testid="noticeCardSendHow"
                        xs={4}
                      >
                        <KeyValue data-test-notice-card-send-how>
                          {this.getTranslatedDropdownValue('sendOptions.sendHow', sendEvents)}
                        </KeyValue>
                      </Col>
                      {notice.sendOptions.isBeforeOrAfter() && (
                        <>
                          <Col
                            data-testid="noticeCardByText"
                            data-test-notice-card-by-text
                            xs={3}
                          >
                            <KeyValue>
                              <FormattedMessage id={`${translationNamespace}.notices.by`} />
                            </KeyValue>
                          </Col>
                          <Col
                            data-testid="noticeCardSendByDuration"
                            data-test-notice-card-send-by-duration
                            xs={1}
                          >
                            <KeyValue>
                              {get(notice, 'sendOptions.sendBy.duration')}
                            </KeyValue>
                          </Col>
                          <Col
                            data-testid="noticeCardSendByIntervalId"
                            data-test-notice-card-send-by-interval-id
                            xs={4}
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
                    data-testid="noticeCardFrequencyLabel"
                    data-test-notice-card-frequency-label
                    xs={12}
                    className={css.fieldLabel}
                  >
                    <KeyValue label={<FormattedMessage id={`${translationNamespace}.notices.frequency`} />}>
                      <Row>
                        <Col
                          data-testid="noticeCardFrequency"
                          xs={4}
                          data-test-notice-card-frequency
                        >
                          <KeyValue>
                            {this.getTranslatedDropdownValue('frequency', noticesFrequency)}
                          </KeyValue>
                        </Col>
                        {notice.isRecurring() && (
                          <>
                            <Col
                              data-testid="noticeIsRecurring"
                              xs={3}
                            >
                              <KeyValue>
                                <FormattedMessage id={`${translationNamespace}.notices.andEvery`} />
                              </KeyValue>
                            </Col>
                            <Col
                              data-testid="noticeCardSendEveryDuration"
                              data-test-notice-card-send-every-duration
                              xs={1}
                            >
                              <KeyValue>
                                {get(notice, 'sendOptions.sendEvery.duration')}
                              </KeyValue>
                            </Col>
                            <Col
                              data-testid="noticeCardSendEveryIntervalId"
                              data-test-notice-card-send-every-interval-id
                              xs={4}
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
              data-testid="isLoanDueDateTimeSelected"
              xs={12}
              className={css.noticeField}
            >
              { isRealTimeMessageVisible && (
                <strong>{this.getRealTimeMessage('realTime')}</strong>
              )}
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              { !isEmpty(notificationKey) && (
                <MessageBanner
                  data-testid="messageBanner"
                  type="warning"
                >
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
