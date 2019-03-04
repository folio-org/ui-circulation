import React from 'react';
import PropTypes from 'prop-types';
import {
  intlShape,
  injectIntl,
  FormattedMessage
} from 'react-intl';
import {
  find,
  get,
  isNull,
} from 'lodash';

import {
  Col,
  Row,
  KeyValue,
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
    index: PropTypes.number.isRequired,
    sectionKey: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    policy: PropTypes.object.isRequired,
    templates: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
    sendWhenOptions: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
  };

  getDropdownValue = (pathToValue, index, items) => {
    const {
      sectionKey,
      policy,
    } = this.props;

    const seletedValue = get(policy, `${sectionKey}[${index}].${pathToValue}`);
    const selectedItem = find(items, (item) => item.value === seletedValue);

    return selectedItem ? selectedItem.label : null;
  };

  getTranslatedDropdownValue = (pathToValue, index, items) => {
    const { intl } = this.props;

    const translationKey = this.getDropdownValue(pathToValue, index, items);

    return isNull(translationKey) ? null : intl.formatMessage({ id: translationKey });
  };

  getCheckboxValue = (pathToValue, index) => {
    const {
      sectionKey,
      policy,
    } = this.props;

    const seletedValue = get(policy, `${sectionKey}[${index}].${pathToValue}`);

    return seletedValue
      ? <FormattedMessage id="ui-circulation.settings.common.yes" />
      : <FormattedMessage id="ui-circulation.settings.common.no" />;
  };

  render() {
    const {
      index: i,
      sectionKey,
      policy,
      templates,
      sendWhenOptions,
    } = this.props;

    const isRecurring = policy[sectionKey][i].isRecurring();
    const isBeforeOrAfter = policy[sectionKey][i].sendOptions.isBeforeOrAfter();
    const sendEventLabelId = isRecurring ? 'startigSendEvent' : 'sendEvent';
    const translationNamespace = 'ui-circulation.settings.noticePolicy';

    return (
      <Row data-test-notice-card>
        <Col xs={12} className={css.notice}>
          <Row className={css.header}>
            <Col xs={3} className={css.headerTitle}>
              <FormattedMessage
                id={`${translationNamespace}.countableNotice`}
                values={{ counter: i + 1 }}
              />
            </Col>
          </Row>
          <Row>
            <Col
              data-test-notice-card-template-id
              xs={5}
              className={css.noticeField}
            >
              <KeyValue
                label={<FormattedMessage id={`${translationNamespace}.notices.template`} />}
                value={this.getDropdownValue('templateId', i, templates)}
              />
            </Col>
            <Col
              data-test-notice-card-via-text
              xs={1}
              className={css.cardText}
            >
              <KeyValue>
                <FormattedMessage id={`${translationNamespace}.notices.via`} />
              </KeyValue>
            </Col>
            <Col
              data-test-notice-card-format
              xs={3}
              className={css.noticeField}
            >
              <KeyValue
                label={<FormattedMessage id={`${translationNamespace}.notices.format`} />}
                value={this.getTranslatedDropdownValue('format', i, noticesFormats)}
              />
            </Col>
            <Col
              data-test-notice-card-frequency
              xs={3}
              className={css.noticeField}
            >
              <KeyValue
                label={<FormattedMessage id={`${translationNamespace}.notices.frequency`} />}
                value={this.getTranslatedDropdownValue('frequency', i, noticesFrequency)}
              />
            </Col>
          </Row>
          <React.Fragment>
            <Row>
              <Col
                data-test-notice-card-event-text
                xs={12}
                className={css.fieldLabel}
              >
                <KeyValue label={<FormattedMessage id={`${translationNamespace}.notices.${sendEventLabelId}`} />}>
                  <Row>
                    <Col xs={2}>
                      <KeyValue data-test-notice-card-send-how>
                        {this.getTranslatedDropdownValue('sendOptions.sendHow', i, noticesSendEvent)}
                      </KeyValue>
                    </Col>
                    <Col xs={3}>
                      <KeyValue data-test-notice-card-send-when>
                        {this.getTranslatedDropdownValue('sendOptions.sendWhen', i, sendWhenOptions)}
                      </KeyValue>
                    </Col>
                    { isBeforeOrAfter && (
                      <React.Fragment>
                        <Col
                          data-test-notice-card-by-text
                          xs={1}
                        >
                          <KeyValue>
                            <FormattedMessage id={`${translationNamespace}.notices.by`} />
                          </KeyValue>
                        </Col>
                        <Col
                          data-test-notice-card-send-by-duration
                          xs={3}
                        >
                          <KeyValue>
                            {get(policy, `[${sectionKey}][${i}].sendOptions.sendBy.duration`)}
                          </KeyValue>
                        </Col>
                        <Col
                          data-test-notice-card-send-by-interval-id
                          xs={3}
                        >
                          <KeyValue>
                            {this.getTranslatedDropdownValue('sendOptions.sendBy.intervalId', i, noticesIntervalPeriods)}
                          </KeyValue>
                        </Col>
                      </React.Fragment>
                    )}
                  </Row>
                </KeyValue>
              </Col>
            </Row>
          </React.Fragment>
          { isRecurring && (
            <Row>
              <Col
                xs={12}
                className={css.fieldLabel}
                data-test-notice-card-send-every-label
              >
                <KeyValue label={<FormattedMessage id={`${translationNamespace}.notices.sendEvery`} />}>
                  <Row>
                    <Col
                      data-test-notice-card-send-every-duration
                      xs={3}
                    >
                      <KeyValue>
                        {get(policy, `[${sectionKey}][${i}].sendOptions.sendEvery.duration`)}
                      </KeyValue>
                    </Col>
                    <Col
                      data-test-notice-card-send-every-interval-id
                      xs={3}
                    >
                      <KeyValue>
                        {this.getTranslatedDropdownValue('sendOptions.sendEvery.intervalId', i, noticesIntervalPeriods)}
                      </KeyValue>
                    </Col>
                  </Row>
                </KeyValue>
              </Col>
            </Row>
          )}
          <Row>
            <Col
              data-test-notice-card-real-time
              xs={12}
              className={css.noticeField}
            >
              <KeyValue
                label={<FormattedMessage id={`${translationNamespace}.notices.realTime`} />}
                value={this.getCheckboxValue('realTime', i)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default injectIntl(NoticeCard);
