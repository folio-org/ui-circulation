import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { isBoolean } from 'lodash';
import {
  injectIntl,
  FormattedMessage,
} from 'react-intl';

import {
  Accordion,
  Col,
  Row,
  RadioButton,
  RadioButtonGroup,
  Select,
  TextField,
} from '@folio/stripes/components';

import { Period } from '../../../../components';
import {
  intervalPeriodsLower,
} from '../../../../../constants';

import CheckBoxText from '../CheckBoxText/CheckBoxText';

import optionsGenerator from '../../../../utils/options-generator';

class LostItemFeeSection extends React.Component {
  static propTypes = {
    intl: PropTypes.object,
    change: PropTypes.func.isRequired,
    lostItemFeeSectionOpen: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.generateOptions = optionsGenerator.bind(null, this.props.intl.formatMessage);
  }

  onBlur = (e) => {
    const chargeAmountItem = parseFloat(e.target.value || 0.00).toFixed(2);
    e.target.value = chargeAmountItem;
  };

  convertToBoolean = (value) => {
    return isBoolean(value) ? value : value === 'true';
  };

  render() {
    const {
      lostItemFeeSectionOpen,
      change,
      intl: {
        formatMessage,
      },
    } = this.props;

    const selectValues = [
      { value: true, label: formatMessage({ id: 'ui-circulation.settings.lostItemFee.yes' }) },
      { value: false, label: formatMessage({ id: 'ui-circulation.settings.lostItemFee.no' }) },
    ];

    return (
      <Accordion
        data-test-lost-item-fee-policy-form-section
        id="editLostItemFeeSection"
        label={<FormattedMessage id="ui-circulation.settings.lostItemFee.lostItemSection" />}
        open={lostItemFeeSectionOpen}
      >
        <div data-test-item-aged-lost>
          <Period
            fieldLabel="ui-circulation.settings.lostItemFee.itemeAgedLostOverdue"
            inputValuePath="itemAgedLostOverdue.duration"
            selectValuePath="itemAgedLostOverdue.intervalId"
            intervalPeriods={this.generateOptions(intervalPeriodsLower, 'ui-circulation.settings.lostItemFee.selectInterval')}
            changeFormValue={change}
          />
        </div>
        <div data-test-patron-billed>
          <Period
            fieldLabel="ui-circulation.settings.lostItemFee.patronBilledAfterAgedLost"
            inputValuePath="patronBilledAfterAgedLost.duration"
            selectValuePath="patronBilledAfterAgedLost.intervalId"
            intervalPeriods={this.generateOptions(intervalPeriodsLower, 'ui-circulation.settings.lostItemFee.selectInterval')}
            changeFormValue={change}
          />
        </div>
        <CheckBoxText onBlur={this.onBlur} />
        <Row>
          <Col xs={5}>
            <FormattedMessage id="ui-circulation.settings.lostItemFee.lostItemProcessingFee" />
          </Col>
        </Row>
        <Row>
          <Col xs={2} data-test-lost-item-processing-fee>
            <Field
              aria-label={formatMessage({ id: 'ui-circulation.settings.lostItemFee.lostItemProcessingFee' })}
              name="lostItemProcessingFee"
              id="lost-item-processing-fee"
              component={TextField}
              type="number"
              onBlur={this.onBlur}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={5}>
            <FormattedMessage id="ui-circulation.settings.lostItemFee.chargeAmountItemPatron">
              {(message) => <option value="true">{`${message} ?`}</option>}
            </FormattedMessage>
          </Col>
        </Row>
        <Row>
          <Col xs={1} data-test-item-patron>
            <Field
              aria-label={formatMessage({ id: 'ui-circulation.settings.lostItemFee.chargeAmountItem' })}
              name="chargeAmountItemPatron"
              id="charge-amount-item-patron"
              component={Select}
              dataOptions={selectValues}
              normalize={this.convertToBoolean}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={5}>
            <FormattedMessage id="ui-circulation.settings.lostItemFee.chargeAmount.patron">
              {(message) => <option value="true">{`${message} ?`}</option>}
            </FormattedMessage>
          </Col>
        </Row>
        <Row>
          <Col xs={1} data-test-item-system>
            <Field
              aria-label={formatMessage({ id: 'ui-circulation.settings.lostItemFee.chargeAmount.system' })}
              name="chargeAmountItemSystem"
              id="charge-amount-item-system"
              component={Select}
              dataOptions={selectValues}
              normalize={this.convertToBoolean}
            />
          </Col>
        </Row>
        <div data-test-lost-item-charge-fee>
          <Period
            fieldLabel="ui-circulation.settings.lostItemFee.lostItemNotChargeFeeFine"
            inputValuePath="lostItemChargeFeeFine.duration"
            selectValuePath="lostItemChargeFeeFine.intervalId"
            intervalPeriods={this.generateOptions(intervalPeriodsLower, 'ui-circulation.settings.lostItemFee.selectInterval')}
            changeFormValue={change}
          />
        </div>
        <Row>
          <Col xs={5}>
            <FormattedMessage id="ui-circulation.settings.lostItemFee.returnedLostItemProcessingFee" />
          </Col>
        </Row>
        <Row>
          <Col xs={1} data-test-returned-lost-item>
            <Field
              aria-label={formatMessage({ id: 'ui-circulation.settings.lostItemFee.fee' })}
              name="returnedLostItemProcessingFee"
              id="returnedLostItemProcessingFee"
              component={Select}
              dataOptions={selectValues}
              normalize={this.convertToBoolean}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={5}>
            <FormattedMessage id="ui-circulation.settings.lostItemFee.lostItemReturned" />
          </Col>
        </Row>
        <Row>
          <Col xs={7} data-test-lost-item-returned-charge>
            <Field
              aria-label={formatMessage({ id: 'ui-circulation.settings.lostItemFee.returned' })}
              id="lost-item-returned"
              name="lostItemReturned"
              component={RadioButtonGroup}
            >
              <RadioButton
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.lostItemChargeOverdueBased" />}
                id="Charge"
                value="Charge"
              />
              <RadioButton
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.lostItemRemoveOverdueFines" />}
                id="Remove"
                value="Remove"
              />
            </Field>
          </Col>
        </Row>
        <Row>
          <Col xs={5}>
            <FormattedMessage id="ui-circulation.settings.lostItemFee.replacementAllowed" />
          </Col>
        </Row>
        <Row>
          <Col xs={1} data-test-replacement-allowed>
            <Field
              aria-label={formatMessage({ id: 'ui-circulation.settings.lostItemFee.replacementAllowed' })}
              name="replacementAllowed"
              id="replacementAllowed"
              component={Select}
              dataOptions={selectValues}
              normalize={this.convertToBoolean}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={5}>
            <FormattedMessage id="ui-circulation.settings.lostItemFee.replacedLostItemProcessingFee" />
          </Col>
        </Row>
        <Row>
          <Col xs={1} data-test-replaced-lost-item>
            <Field
              aria-label={formatMessage({ id: 'ui-circulation.settings.lostItemFee.replacedLostItemProcessingFee' })}
              name="replacedLostItemProcessingFee"
              id="replacedLostItemProcessingFee"
              component={Select}
              dataOptions={selectValues}
              normalize={this.convertToBoolean}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={5}>
            <FormattedMessage id="ui-circulation.settings.lostItemFee.replacementProcessFee" />
          </Col>
        </Row>
        <Row>
          <Col xs={2} data-test-replacement-processing-fee>
            <Field
              aria-label={formatMessage({ id: 'ui-circulation.settings.lostItemFee.replacementProcessFee' })}
              name="replacementProcessingFee"
              id="replacement-processing-fee"
              component={TextField}
              type="number"
              onBlur={this.onBlur}
            />
          </Col>
        </Row>
        <div data-test-fees-fines-shall-refunded>
          <Period
            fieldLabel="ui-circulation.settings.lostItemFee.feesFinesShallRefunded"
            inputValuePath="feesFinesShallRefunded.duration"
            selectValuePath="feesFinesShallRefunded.intervalId"
            intervalPeriods={this.generateOptions(intervalPeriodsLower, 'ui-circulation.settings.lostItemFee.selectInterval')}
            changeFormValue={change}
            intervalPeriodsSuffix="ui-circulation.settings.lostItemFee.late"
          />
        </div>
      </Accordion>
    );
  }
}

export default injectIntl(LostItemFeeSection);
