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
    intl: intlShape.isRequired,
    index: PropTypes.number.isRequired,
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

  getCheckboxValue = (pathToValue) => {
    const { notice } = this.props;

    const seletedValue = get(notice, pathToValue);

    return seletedValue
      ? <FormattedMessage id="ui-circulation.settings.common.yes" />
      : <FormattedMessage id="ui-circulation.settings.common.no" />;
  };

  render() {
    const {
      index,
      notice,
      timeBasedEventsIds,
      templates,
      triggeringEvents,
    } = this.props;

    const translationNamespace = 'ui-circulation.settings.noticePolicy';

    return (
      <Row>
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
            >
              <KeyValue
                label={<FormattedMessage id={`${translationNamespace}.notices.template`} />}
                value={this.getDropdownValue('templateId', templates)}
              />
            </Col>
            <Col
              xs={1}
              className={css.cardText}
            >
              <KeyValue>
                <FormattedMessage id={`${translationNamespace}.notices.via`} />
              </KeyValue>
            </Col>
            <Col
              xs={2}
              className={css.noticeField}
            >
              <KeyValue
                label={<FormattedMessage id={`${translationNamespace}.notices.format`} />}
                value={this.getTranslatedDropdownValue('format', noticesFormats)}
              />
            </Col>
            <Col
              xs={5}
              className={css.noticeField}
            >
              <KeyValue
                label={<FormattedMessage id={`${translationNamespace}.notices.triggeringEvent`} />}
                value={this.getTranslatedDropdownValue('sendOptions.sendWhen', triggeringEvents)}
              />
            </Col>
          </Row>
          { notice.sendOptions.isTimeBasedEventSelected(timeBasedEventsIds) && (
            <React.Fragment>
              <Row>
                <Col
                  xs={12}
                  className={css.fieldLabel}
                >
                  <KeyValue label={<FormattedMessage id={`${translationNamespace}.notices.send`} />}>
                    <Row>
                      <Col xs={4}>
                        <KeyValue>
                          {this.getTranslatedDropdownValue('sendOptions.sendHow', noticesSendEvent)}
                        </KeyValue>
                      </Col>
                      {notice.sendOptions.isBeforeOrAfter() && (
                        <React.Fragment>
                          <Col xs={3}>
                            <KeyValue>
                              <FormattedMessage id={`${translationNamespace}.notices.by`} />
                            </KeyValue>
                          </Col>
                          <Col xs={1}>
                            <KeyValue>
                              {get(notice, 'sendOptions.sendBy.duration')}
                            </KeyValue>
                          </Col>
                          <Col xs={4}>
                            <KeyValue>
                              {this.getTranslatedDropdownValue('sendOptions.sendBy.intervalId', noticesIntervalPeriods)}
                            </KeyValue>
                          </Col>
                        </React.Fragment>
                      )}
                    </Row>
                  </KeyValue>
                </Col>
              </Row>
              <Row>
                <Col
                  xs={12}
                  className={css.fieldLabel}
                >
                  <KeyValue label={<FormattedMessage id={`${translationNamespace}.notices.frequency`} />}>
                    <Row>
                      <Col xs={4}>
                        <KeyValue>
                          {this.getTranslatedDropdownValue('frequency', noticesFrequency)}
                        </KeyValue>
                      </Col>
                      {notice.isRecurring() && (
                        <React.Fragment>
                          <Col xs={3}>
                            <KeyValue>
                              <FormattedMessage id={`${translationNamespace}.notices.andEvery`} />
                            </KeyValue>
                          </Col>
                          <Col xs={1}>
                            <KeyValue>
                              {get(notice, 'sendOptions.sendEvery.duration')}
                            </KeyValue>
                          </Col>
                          <Col xs={4}>
                            <KeyValue>
                              {this.getTranslatedDropdownValue('sendOptions.sendEvery.intervalId', noticesIntervalPeriods)}
                            </KeyValue>
                          </Col>
                        </React.Fragment>
                      )}
                    </Row>
                  </KeyValue>
                </Col>
              </Row>
            </React.Fragment>
          )}
          <Row>
            <Col
              xs={12}
              className={css.noticeField}
            >
              <KeyValue
                label={<FormattedMessage id={`${translationNamespace}.notices.realTime`} />}
                value={this.getCheckboxValue('realTime')}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default injectIntl(NoticeCard);
