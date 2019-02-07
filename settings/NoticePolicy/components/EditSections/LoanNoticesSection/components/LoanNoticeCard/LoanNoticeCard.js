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
  loanNoticesFormats,
  loanNoticesFrequency,
  loanNoticesSendEvent,
  loanNoticesSendWhen,
  loanNoticesIntervalPeriods,
} from '../../../../../../../constants';

import css from './LoanNoticeCard.css';

class LoanNoticeCard extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    policy: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    templates: PropTypes.arrayOf(PropTypes.shape({
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
      label: intl.formatMessage({ id: label })
    }));
  };

  render() {
    const {
      fields,
      policy,
      templates,
    } = this.props;

    return (
      <React.Fragment>
        {fields.map((loanNotice, index) => {
          const isRecurring = policy.loanNotices[index].isRecurring();
          const isBeforeOrAfter = policy.loanNotices[index].sendOptions.isBeforeOrAfter();
          const sendEventLabelId = isRecurring ? 'startigSendEvent' : 'sendEvent';

          return (
            <Row>
              <Col xs={7} key={index} className={css.loanNotice}>
                <Row className={css.header}>
                  <Col xs={3} className={css.headerTitle}>
                    <FormattedMessage
                      id="ui-circulation.settings.noticePolicy.countableNotice"
                      values={{ counter: index + 1 }}
                    />
                  </Col>
                  <Col xs={1} xsOffset={8} className={css.headerIcon}>
                    <IconButton
                      icon="trash"
                      onClick={() => fields.remove(index)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={5} className={css.noticeField}>
                    <Field
                      name={`${loanNotice}.templateId`}
                      label={(
                        <FormattedMessage id="ui-circulation.settings.noticePolicy.loanNotices.template">
                          { message => `${message} *` }
                        </FormattedMessage>
                      )}
                      component={Select}
                      dataOptions={templates}
                      placeholder=" "
                    />
                  </Col>
                  <Col xs={1} className={css.cardText}>
                    <FormattedMessage id="ui-circulation.settings.noticePolicy.loanNotices.via" />
                  </Col>
                  <Col xs={3} className={css.noticeField}>
                    <Field
                      name={`${loanNotice}.format`}
                      label={(
                        <FormattedMessage id="ui-circulation.settings.noticePolicy.loanNotices.format">
                          { message => `${message} *` }
                        </FormattedMessage>
                      )}
                      component={Select}
                      dataOptions={this.getDropdownItems(loanNoticesFormats)}
                      placeholder=" "
                    />
                  </Col>
                  <Col xs={3} className={css.noticeField}>
                    <Field
                      name={`${loanNotice}.frequency`}
                      label={(
                        <FormattedMessage id="ui-circulation.settings.noticePolicy.loanNotices.frequency">
                          { message => `${message} *` }
                        </FormattedMessage>
                      )}
                      component={Select}
                      dataOptions={this.getDropdownItems(loanNoticesFrequency)}
                      placeholder=" "
                    />
                  </Col>
                </Row>
                <React.Fragment>
                  <Row>
                    <Col xs={12} className={css.fieldLabel}>
                      <FormattedMessage id={`ui-circulation.settings.noticePolicy.loanNotices.${sendEventLabelId}`}>
                        { message => `${message} *` }
                      </FormattedMessage>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={2} className={css.noticeField}>
                      <Field
                        name={`${loanNotice}.sendOptions.sendHow`}
                        component={Select}
                        dataOptions={this.getDropdownItems(loanNoticesSendEvent)}
                        placeholder=" "
                      />
                    </Col>
                    <Col xs={3} className={css.noticeField}>
                      <Field
                        name={`${loanNotice}.sendOptions.sendWhen`}
                        component={Select}
                        dataOptions={this.getDropdownItems(loanNoticesSendWhen)}
                        placeholder=" "
                      />
                    </Col>
                    { isBeforeOrAfter && (
                      <React.Fragment>
                        <Col xs={1} className={css.cardText} style={{ paddingBottom: '15px' }}>
                          <FormattedMessage id="ui-circulation.settings.noticePolicy.loanNotices.by" />
                        </Col>
                        <Col xs={3} className={css.noticeField}>
                          <Field
                            name={`${loanNotice}.sendOptions.sendBy.duration`}
                            component={Select}
                            dataOptions={this.getIntervalValues()}
                            placeholder=" "
                          />
                        </Col>
                        <Col xs={3} className={css.noticeField}>
                          <Field
                            name={`${loanNotice}.sendOptions.sendBy.intervalId`}
                            component={Select}
                            dataOptions={this.getDropdownItems(loanNoticesIntervalPeriods)}
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
                      <Col xs={12} className={css.fieldLabel}>
                        <FormattedMessage id="ui-circulation.settings.noticePolicy.loanNotices.sendEvery">
                          { message => `${message} *` }
                        </FormattedMessage>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={3} className={css.noticeField}>
                        <Field
                          name={`${loanNotice}.sendOptions.sendEvery.duration`}
                          component={Select}
                          dataOptions={this.getIntervalValues()}
                          placeholder=" "
                        />
                      </Col>
                      <Col xs={3} className={css.noticeField}>
                        <Field
                          name={`${loanNotice}.sendOptions.sendEvery.intervalId`}
                          component={Select}
                          dataOptions={this.getDropdownItems(loanNoticesIntervalPeriods)}
                          placeholder=" "
                        />
                      </Col>
                    </Row>
                  </React.Fragment>
                )}
                <Row>
                  <Col xs={12} className={css.noticeField}>
                    <Field
                      name={`${loanNotice}.realTime`}
                      label={<FormattedMessage id="ui-circulation.settings.noticePolicy.loanNotices.realTime" />}
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
        <Row start="xs">
          <Col xs={1}>
            <Button
              type="button"
              buttonStyle="default"
              onClick={() => fields.push({})}
            >
              <FormattedMessage id="ui-circulation.settings.noticePolicy.addNotice" />
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default injectIntl(LoanNoticeCard);
