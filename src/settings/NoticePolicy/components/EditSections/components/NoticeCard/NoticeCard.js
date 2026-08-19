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
  Icon,
  IconButton,
  Label,
  MessageBanner,
  Row,
  Select,
  RadioButton,
  Tooltip,
} from '@folio/stripes/components';

import Period from '../../../../../components/Period';

import {
  noticesFormats,
  noticesFrequency,
  noticesIntervalPeriods,
} from '../../../../../../constants';

import optionsGenerator from '../../../../../utils/options-generator';
import getNotificationContent from '../../../../utils/notice-description';
import getRealTimeLabels from '../../../../utils/get-real-time-labels';
import isRealTimeMessage from '../../../../utils/is-real-time-message';

import css from './NoticeCard.css';

class NoticeCard extends React.Component {
  static propTypes = {
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    notice: PropTypes.shape({
      sendOptions: PropTypes.shape({
        sendWhen: PropTypes.string,
        isLostItemFeesSelected: PropTypes.func,
        isSendOptionsAvailable: PropTypes.func,
        isBeforeOrAfter: PropTypes.func,
        isFrequencyAvailable: PropTypes.func,
      }),
      isRecurring: PropTypes.func,
    }).isRequired,
    initialNotice: PropTypes.shape({
      sendOptions: PropTypes.shape({
        sendWhen: PropTypes.string,
      }),
    }),
    noticeIndex: PropTypes.number.isRequired,
    pathToNotice: PropTypes.string.isRequired,
    dragRef: PropTypes.func,
    dragHandleRef: PropTypes.func,
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
    onAddNotice: PropTypes.func.isRequired,
    onRemoveNotice: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.generateOptions = optionsGenerator.bind(null, this.props.intl.formatMessage);
    this.dragHandleTriggerRef = React.createRef(null);
  }

  setDragHandleRef = (element) => {
    this.dragHandleTriggerRef.current = element;
    this.props.dragHandleRef?.(element);
  };

  onRemove = () => {
    const {
      noticeIndex,
      onRemoveNotice,
    } = this.props;

    onRemoveNotice(noticeIndex);
  };

  onAdd = () => {
    const {
      noticeIndex,
      onAddNotice,
    } = this.props;

    onAddNotice(noticeIndex);
  };

  render() {
    const {
      intl: {
        formatMessage,
      },
      notice,
      initialNotice,
      noticeIndex,
      pathToNotice,
      sendEvents,
      sendEventTriggeringIds,
      templates,
      triggeringEvents,
      dragRef,
    } = this.props;

    const blankPlaceholder = formatMessage({ id: 'ui-circulation.settings.common.blankPlaceholder' });
    const notificationKey = getNotificationContent(notice?.sendOptions?.sendWhen);
    const isLostItemFees = notice.sendOptions.isLostItemFeesSelected();
    const shouldShowRealTimeOptions = isRealTimeMessage(notice.sendOptions);
    const realTimeLabels = getRealTimeLabels(isLostItemFees);

    const isTemplateChanged = notice?.templateId !== initialNotice?.templateId;
    const isFormatChanged = notice?.format !== initialNotice?.format;
    const isSendWhenChanged = notice?.sendOptions?.sendWhen !== initialNotice?.sendOptions?.sendWhen;
    const isSendHowChanged = notice?.sendOptions?.sendHow !== initialNotice?.sendOptions?.sendHow;
    const isFrequencyChanged = notice?.frequency !== initialNotice?.frequency;

    return (
      <div ref={dragRef}>
        <Row data-test-notice-card>
          <Col
            xs={7}
            className={css.notice}
          >
            <Row className={css.header}>
              <Col
                xs={3}
                className={css.leftButtons}
                data-test-notice-card-drag-handle
              >
                <Tooltip
                  id={`notice-card-drag-handle-tooltip-${noticeIndex}`}
                  text={<FormattedMessage id="ui-circulation.settings.noticePolicy.dragAndDrop" />}
                  triggerRef={this.dragHandleTriggerRef}
                >
                  {({ ariaIds }) => (
                    <span
                      ref={this.setDragHandleRef}
                      aria-labelledby={ariaIds.text}
                      className={css.dragHandleIcon}
                    >
                      <Icon icon="drag-drop" size="small" />
                    </span>
                  )}
                </Tooltip>
                <span>
                  <FormattedMessage
                    id="ui-circulation.settings.noticePolicy.countableNotice"
                    values={{ counter: noticeIndex + 1 }}
                  />
                </span>
              </Col>
              <Col
                xs={1}
                xsOffset={8}
                className={css.headerIcon}
              >
                <Tooltip
                  id={`notice-card-add-tooltip-${noticeIndex}`}
                  text={<FormattedMessage id="ui-circulation.settings.noticePolicy.addNoticeAbove" />}
                >
                  {({ ref, ariaIds }) => (
                    <span
                      ref={ref}
                      aria-labelledby={ariaIds.text}
                    >
                      <IconButton
                        ariaLabel={formatMessage({ id: 'ui-circulation.settings.noticePolicy.addNoticeAbove' })}
                        icon="plus-sign"
                        data-test-notice-card-add
                        onClick={this.onAdd}
                      />
                    </span>
                  )}
                </Tooltip>
                <Tooltip
                  id={`notice-card-remove-tooltip-${noticeIndex}`}
                  text={<FormattedMessage id="ui-circulation.settings.noticePolicy.deleteNotice" />}
                >
                  {({ ref, ariaIds }) => (
                    <span
                      ref={ref}
                      aria-labelledby={ariaIds.text}
                    >
                      <IconButton
                        ariaLabel={formatMessage({ id: 'ui-circulation.settings.noticePolicy.deleteNotice' })}
                        icon="trash"
                        data-test-notice-card-remove
                        onClick={this.onRemove}
                      />
                    </span>
                  )}
                </Tooltip>
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
                      data-testid="templateSelect"
                      name={`${pathToNotice}.templateId`}
                      label={formatMessage({ id: 'ui-circulation.settings.noticePolicy.notices.template' })}
                      required
                      component={Select}
                      dataOptions={templates}
                      placeholder={blankPlaceholder}
                      dirty={isTemplateChanged}
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
                      data-testid="formatSelect"
                      name={`${pathToNotice}.format`}
                      label={formatMessage({ id:'ui-circulation.settings.noticePolicy.notices.format' })}
                      required
                      component={Select}
                      placeholder={blankPlaceholder}
                      dirty={isFormatChanged}
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
                      data-testid="triggeringEventSelect"
                      name={`${pathToNotice}.sendOptions.sendWhen`}
                      label={formatMessage({ id:'ui-circulation.settings.noticePolicy.notices.triggeringEvent' })}
                      required
                      component={Select}
                      placeholder={blankPlaceholder}
                      dirty={isSendWhenChanged}
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
                          data-testid="sendSelect"
                          name={`${pathToNotice}.sendOptions.sendHow`}
                          component={Select}
                          placeholder={blankPlaceholder}
                          dirty={isSendHowChanged}
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
                              data-testid="sendByPeriod"
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
                              data-testid="frequencySelect"
                              name={`${pathToNotice}.frequency`}
                              component={Select}
                              placeholder={blankPlaceholder}
                              dirty={isFrequencyChanged}
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
                                  data-testid="andEveryPeriod"
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
                    { shouldShowRealTimeOptions && (
                      <>
                        <Field
                          data-testid="longTermRadioButton"
                          name={`${pathToNotice}.realTime`}
                          component={RadioButton}
                          type="radio"
                          label={formatMessage({ id: realTimeLabels.longTerm })}
                          value="false"
                        />
                        <Field
                          data-testid="shortTermRadioButton"
                          name={`${pathToNotice}.realTime`}
                          component={RadioButton}
                          type="radio"
                          label={formatMessage({ id: realTimeLabels.shortTerm })}
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
      </div>
    );
  }
}

export default injectIntl(NoticeCard);
