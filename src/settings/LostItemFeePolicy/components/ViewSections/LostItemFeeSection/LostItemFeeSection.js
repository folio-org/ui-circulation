import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Col,
  Row,
  KeyValue,
} from '@folio/stripes/components';

const LostItemFeeSection = (props) => {
  const {
    policy,
    lostItemFeeSectionOpen,
    getPeriodValue,
  } = props;

  const {
    chargeAmountItem,
    lostItemProcessingFee,
    chargeAmountItemPatron,
    chargeAmountItemSystem,
    returnedLostItemProcessingFee,
    replacementProcessingFee,
    replacementAllowed,
    lostItemReturned,
    replacedLostItemProcessingFee,
    feesFinesShallRefunded,
  } = policy;

  const displayYes = <FormattedMessage id="ui-circulation.settings.lostItemFee.yes" />;
  const displayNo = <FormattedMessage id="ui-circulation.settings.lostItemFee.no" />;
  const actualCost = (chargeAmountItem && chargeAmountItem.chargeType === 'actualCost')
    ? <FormattedMessage
        id="ui-circulation.settings.lostItemFee.actualCost"
    />
    : <FormattedMessage
        id="ui-circulation.settings.lostItemFee.otherCost"
        values={{ name: parseFloat(chargeAmountItem.amount).toFixed(2) }}
    />;
  const displayFeesFinesShallRefunded = feesFinesShallRefunded && feesFinesShallRefunded.duration !== undefined
    ? `${getPeriodValue('feesFinesShallRefunded')} ${props.formatMessage({ id: 'ui-circulation.settings.lostItemFee.late' })}`
    : '-';

  return (
    <div
      data-testid="viewLostItemFeeSection"
      data-test-lost-item-policy-detail-fee-section
    >
      <Accordion
        data-testid="viewLostItemFeeSectionAccordion"
        id="viewLostItemFeeSection"
        label={<FormattedMessage id="ui-circulation.settings.lostItemFee.lostItemSection" />}
        open={lostItemFeeSectionOpen}
      >
        <Row>
          <Col xs={12}>
            <div
              data-testid="itemeAgedLostOverdue"
              data-test-item-aged
            >
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.itemeAgedLostOverdue" />}
                value={getPeriodValue('itemAgedLostOverdue')}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div
              data-testid="patronBilledAfterAgedLost"
              data-test-patron-billed
            >
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.patronBilledAfterAgedLost" />}
                value={getPeriodValue('patronBilledAfterAgedLost')}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div
              data-testid="itemRecalledAgedLostOverdue"
              data-test-item-recalled-aged
            >
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.itemRecalledAgedLostOverdue" />}
                value={getPeriodValue('recalledItemAgedLostOverdue')}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div
              data-testid="patronBilledAfterRecalledAgedLost"
              data-test-patron-billed-recalled
            >
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.patronBilledAfterRecalledAgedLost" />}
                value={getPeriodValue('patronBilledAfterRecalledItemAgedLost')}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div
              data-testid="chargeAmountItem"
              data-test-charge-amount
            >
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.chargeAmountItem" />}
                value={actualCost}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div
              data-testid="lostItemProcessingFee"
              data-test-lost-item-fee
            >
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.lostItemProcessingFee" />}
                value={parseFloat(lostItemProcessingFee).toFixed(2)}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div
              data-testid="chargeAmountItemPatron"
              data-test-lost-by-patron
            >
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.chargeAmountItemPatron" />}
                value={chargeAmountItemPatron ? displayYes : displayNo}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div
              data-testid="chargeAmountItemSystem"
              data-test-lost-by-system
            >
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.chargeAmountItemSystem" />}
                value={chargeAmountItemSystem ? displayYes : displayNo}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div
              data-testid="lostItemNotChargeFeesFine"
              data-test-close-loan-after
            >
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.lostItemNotChargeFeesFine" />}
                value={getPeriodValue('lostItemChargeFeeFine')}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div
              data-testid="returnedLostItemProcessingFee"
              data-test-returned-lost-item
            >
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.returnedLostItemProcessingFee" />}
                value={returnedLostItemProcessingFee ? displayYes : displayNo}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div
              data-testid="lostItemReturned"
              data-test-if-lost-item-returned
            >
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.lostItemReturned" />}
                value={lostItemReturned === 'Charge'
                  ? <FormattedMessage id="ui-circulation.settings.lostItemFee.lostItemChargeOverdueBased" />
                  : <FormattedMessage id="ui-circulation.settings.lostItemFee.lostItemRemoveOverdueFines" />}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div
              data-testid="replacementAllowed"
              data-test-replacement-allowed
            >
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.replacementAllowed" />}
                value={replacementAllowed ? displayYes : displayNo}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div
              data-testid="replacedLostItemProcessingFee"
              data-test-replaced-lost-item
            >
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.replacedLostItemProcessingFee" />}
                value={replacedLostItemProcessingFee ? displayYes : displayNo}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div
              data-testid="replacementProcessFee"
              data-test-replacement-fee
            >
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.replacementProcessFee" />}
                value={parseFloat(replacementProcessingFee).toFixed(2)}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div
              data-testid="feesFinesShallRefunded"
              data-test-returned-more-than
            >
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.feesFinesShallRefunded" />}
                value={displayFeesFinesShallRefunded}
              />
            </div>
          </Col>
        </Row>
      </Accordion>
    </div>
  );
};

LostItemFeeSection.propTypes = {
  policy: PropTypes.object.isRequired,
  lostItemFeeSectionOpen: PropTypes.bool.isRequired,
  getPeriodValue: PropTypes.func.isRequired,
  formatMessage: PropTypes.func.isRequired,
};

export default LostItemFeeSection;
