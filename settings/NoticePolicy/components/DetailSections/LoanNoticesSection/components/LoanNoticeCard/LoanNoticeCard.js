import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  find,
  get,
} from 'lodash';

import {
  Col,
  Row,
  KeyValue,
} from '@folio/stripes/components';

import {
  loanNoticesFormats,
  loanNoticesFrequency,
  loanNoticesSendEvent,
  loanNoticesSendWhen,
  intervalPeriods,
} from '../../../../../../../constants';

import css from './LoanNoticeCard.css';

class LoanNoticeCard extends React.Component {
  static propTypes = {
    policy: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    templates: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  getDropdownValue = (pathToValue, index, items) => {
    const { policy } = this.props;
    const seletedValue = get(policy, `loanNotices[${index}].${pathToValue}`);
    const selectedItem = find(items, (item) => item.value === seletedValue) || {};

    return selectedItem.label;
  };

  getCheckboxValue = (pathToValue, index) => {
    const { policy } = this.props;
    const seletedValue = get(policy, `loanNotices[${index}].${pathToValue}`);

    return seletedValue
      ? <FormattedMessage id="ui-circulation.settings.common.yes" />
      : <FormattedMessage id="ui-circulation.settings.common.no" />;
  };

  render() {
    const {
      policy,
      index: i,
      templates,
    } = this.props;

    const isRecurring = policy.loanNotices[i].isRecurring();
    const isBeforeOrAfter = policy.loanNotices[i].sendOptions.isBeforeOrAfter();
    const sendEventLabelId = isRecurring ? 'startigSendEvent' : 'sendEvent';
    const translationNamespace = 'ui-circulation.settings.noticePolicy';

    return (
      <Row>
        <Col xs={12} className={css.loanNotice}>
          <Row className={css.header}>
            <Col xs={3} className={css.headerTitle}>
              <FormattedMessage
                id={`${translationNamespace}.countableNotice`}
                values={{ counter: i + 1 }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={5} className={css.noticeField}>
              <KeyValue
                label={<FormattedMessage id={`${translationNamespace}.loanNotices.template`} />}
                value={this.getDropdownValue('templateId', i, templates)}
              />
            </Col>
            <Col xs={1} className={css.cardText}>
              <KeyValue>
                <FormattedMessage id={`${translationNamespace}.loanNotices.via`} />
              </KeyValue>
            </Col>
            <Col xs={3} className={css.noticeField}>
              <KeyValue
                label={<FormattedMessage id={`${translationNamespace}.loanNotices.format`} />}
                value={this.getDropdownValue('format', i, loanNoticesFormats)}
              />
            </Col>
            <Col xs={3} className={css.noticeField}>
              <KeyValue
                label={<FormattedMessage id={`${translationNamespace}.loanNotices.frequency`} />}
                value={this.getDropdownValue('frequency', i, loanNoticesFrequency)}
              />
            </Col>
          </Row>
          <React.Fragment>
            <Row>
              <Col xs={12} className={css.fieldLabel}>
                <KeyValue label={<FormattedMessage id={`${translationNamespace}.loanNotices.${sendEventLabelId}`} />}>
                  <Row>
                    <Col xs={2}>
                      <KeyValue>
                        {this.getDropdownValue('sendOptions.sendHow', i, loanNoticesSendEvent)}
                      </KeyValue>
                    </Col>
                    <Col xs={3}>
                      <KeyValue>
                        {this.getDropdownValue('sendOptions.sendWhen', i, loanNoticesSendWhen)}
                      </KeyValue>
                    </Col>
                    { isBeforeOrAfter && (
                      <React.Fragment>
                        <Col xs={1}>
                          <KeyValue>
                            <FormattedMessage id={`${translationNamespace}.loanNotices.by`} />
                          </KeyValue>
                        </Col>
                        <Col xs={3}>
                          <KeyValue>
                            {get(policy, `loanNotices[${i}].sendOptions.sendBy.duration`)}
                          </KeyValue>
                        </Col>
                        <Col xs={3}>
                          <KeyValue>
                            {this.getDropdownValue('sendOptions.sendBy.intervalId', i, intervalPeriods)}
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
              <Col xs={12} className={css.fieldLabel}>
                <KeyValue label={<FormattedMessage id={`${translationNamespace}.loanNotices.sendEvery`} />}>
                  <Row>
                    <Col xs={3}>
                      <KeyValue>
                        {get(policy, `loanNotices[${i}].sendOptions.sendEvery.duration`)}
                      </KeyValue>
                    </Col>
                    <Col xs={3}>
                      <KeyValue>
                        {this.getDropdownValue('sendOptions.sendEvery.intervalId', i, intervalPeriods)}
                      </KeyValue>
                    </Col>
                  </Row>
                </KeyValue>
              </Col>
            </Row>
          )}
          <Row>
            <Col xs={12} className={css.noticeField}>
              <KeyValue
                label={<FormattedMessage id={`${translationNamespace}.loanNotices.realTime`} />}
                value={this.getCheckboxValue('realTime', i)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default LoanNoticeCard;
