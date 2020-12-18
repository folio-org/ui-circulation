import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { isNumber } from 'lodash';
import {
  injectIntl,
  FormattedMessage,
} from 'react-intl';

import {
  Accordion,
  Col,
  Row,
  RadioButton,
  Select,
  TextField,
  Label,
} from '@folio/stripes/components';

import RadioGroup from '../RadioGroup/RadioGroup';
import optionsGenerator from '../../../../utils/options-generator';
import { Period } from '../../../../components';
import { intervalPeriodsLower } from '../../../../../constants';

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

  formatNumber = (value = 0) => {
    return isNumber(Number(value)) ? parseFloat(value).toFixed(2) : value;
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
      { value: 'true', label: formatMessage({ id: 'ui-circulation.settings.lostItemFee.yes' }) },
      { value: 'false', label: formatMessage({ id: 'ui-circulation.settings.lostItemFee.no' }) },
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
        <div data-test-item-recalled-aged-lost>
          <Period
            fieldLabel="ui-circulation.settings.lostItemFee.itemRecalledAgedLostOverdue"
            inputValuePath="recalledItemAgedLostOverdue.duration"
            selectValuePath="recalledItemAgedLostOverdue.intervalId"
            intervalPeriods={this.generateOptions(intervalPeriodsLower, 'ui-circulation.settings.lostItemFee.selectInterval')}
            changeFormValue={change}
          />
        </div>
        <div data-test-patron-billed-recalled>
          <Period
            fieldLabel="ui-circulation.settings.lostItemFee.patronBilledAfterRecalledAgedLost"
            inputValuePath="patronBilledAfterRecalledItemAgedLost.duration"
            selectValuePath="patronBilledAfterRecalledItemAgedLost.intervalId"
            intervalPeriods={this.generateOptions(intervalPeriodsLower, 'ui-circulation.settings.lostItemFee.selectInterval')}
            changeFormValue={change}
          />
        </div>
        <RadioGroup onBlur={this.formatNumber} />
        <Row>
          <Col xs={2} data-test-lost-item-processing-fee>
            <Field
              aria-label={formatMessage({ id: 'ui-circulation.settings.lostItemFee.lostItemProcessingFee' })}
              label={<FormattedMessage id="ui-circulation.settings.lostItemFee.lostItemProcessingFee" />}
              name="lostItemProcessingFee"
              id="lost-item-processing-fee"
              component={TextField}
              type="number"
              formatOnBlur
              format={this.formatNumber}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={5}>
            <Label
              htmlFor="charge-amount-item-patron"
              id="charge-amount-item-patron-label"
            >
              <FormattedMessage id="ui-circulation.settings.lostItemFee.chargeAmountItemPatron">
                {message => `${message}?`}
              </FormattedMessage>
            </Label>
          </Col>
        </Row>
        <Row>
          <Col
            xs={2}
            data-test-item-patron
          >
            <Field
              aria-label={formatMessage({ id: 'ui-circulation.settings.lostItemFee.chargeAmountItem' })}
              name="chargeAmountItemPatron"
              id="charge-amount-item-patron"
              component={Select}
              dataOptions={selectValues}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={5}>
            <Label
              htmlFor="charge-amount-item-system"
              id="charge-amount-item-system-label"
            >
              <FormattedMessage id="ui-circulation.settings.lostItemFee.chargeAmountItemSystem">
                {message => `${message}?`}
              </FormattedMessage>
            </Label>
          </Col>
        </Row>
        <Row>
          <Col
            xs={2}
            data-test-item-system
          >
            <Field
              aria-label={formatMessage({ id: 'ui-circulation.settings.lostItemFee.chargeAmount.system' })}
              name="chargeAmountItemSystem"
              id="charge-amount-item-system"
              component={Select}
              dataOptions={selectValues}
            />
          </Col>
        </Row>
        <div data-test-lost-item-charge-fee>
          <Period
            fieldLabel="ui-circulation.settings.lostItemFee.lostItemNotChargeFeesFine"
            inputValuePath="lostItemChargeFeeFine.duration"
            selectValuePath="lostItemChargeFeeFine.intervalId"
            intervalPeriods={this.generateOptions(intervalPeriodsLower, 'ui-circulation.settings.lostItemFee.selectInterval')}
            changeFormValue={change}
          />
        </div>
        <Row>
          <Col xs={5}>
            <Label
              htmlFor="returnedLostItemProcessingFee"
              id="returnedLostItemProcessingFee-label"
            >
              <FormattedMessage id="ui-circulation.settings.lostItemFee.returnedLostItemProcessingFee" />
            </Label>
          </Col>
        </Row>
        <Row>
          <Col xs={2} data-test-returned-lost-item>
            <Field
              aria-label={formatMessage({ id: 'ui-circulation.settings.lostItemFee.lostItemProcessingFee' })}
              name="returnedLostItemProcessingFee"
              id="returnedLostItemProcessingFee"
              component={Select}
              dataOptions={selectValues}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={5}>
            <Label
              htmlFor="Charge"
              id="Charge-label"
            >
              <FormattedMessage id="ui-circulation.settings.lostItemFee.lostItemReturned" />
            </Label>
          </Col>
        </Row>
        <Row>
          <Col xs={7} data-test-lost-item-returned-charge>
            <Field
              aria-label={formatMessage({ id: 'ui-circulation.settings.lostItemFee.returned' })}
              label={<FormattedMessage id="ui-circulation.settings.lostItemFee.lostItemChargeOverdueBased" />}
              name="lostItemReturned"
              component={RadioButton}
              id="Charge"
              value="Charge"
              type="radio"
            />
            <Field
              label={<FormattedMessage id="ui-circulation.settings.lostItemFee.lostItemRemoveOverdueFines" />}
              name="lostItemReturned"
              id="Remove"
              component={RadioButton}
              value="Remove"
              type="radio"
            />
            <br />
          </Col>
        </Row>
        <Row>
          <Col xs={5}>
            <Label
              htmlFor="replacementAllowed"
              id="replacementAllowed-label"
            >
              <FormattedMessage id="ui-circulation.settings.lostItemFee.replacementAllowed" />
            </Label>
          </Col>
        </Row>
        <Row>
          <Col xs={2} data-test-replacement-allowed>
            <Field
              aria-label={formatMessage({ id: 'ui-circulation.settings.lostItemFee.replacementAllowed' })}
              name="replacementAllowed"
              id="replacementAllowed"
              component={Select}
              dataOptions={selectValues}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={5}>
            <Label
              htmlFor="replacedLostItemProcessingFee"
              id="replacedLostItemProcessingFee-label"
            >
              <FormattedMessage id="ui-circulation.settings.lostItemFee.replacedLostItemProcessingFee" />
            </Label>
          </Col>
        </Row>
        <Row>
          <Col xs={2} data-test-replaced-lost-item>
            <Field
              aria-label={formatMessage({ id: 'ui-circulation.settings.lostItemFee.replacedLostItemProcessingFee' })}
              name="replacedLostItemProcessingFee"
              id="replacedLostItemProcessingFee"
              component={Select}
              dataOptions={selectValues}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={2} data-test-replacement-processing-fee>
            <Field
              aria-label={formatMessage({ id: 'ui-circulation.settings.lostItemFee.replacementProcessFee' })}
              label={<FormattedMessage id="ui-circulation.settings.lostItemFee.replacementProcessFee" />}
              name="replacementProcessingFee"
              id="replacement-processing-fee"
              component={TextField}
              type="number"
              formatOnBlur
              format={this.formatNumber}
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
