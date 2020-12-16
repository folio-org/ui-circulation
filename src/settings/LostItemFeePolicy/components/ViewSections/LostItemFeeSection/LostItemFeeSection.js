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
    <div data-test-lost-item-policy-detail-fee-section>
      <Accordion
        id="viewLostItemFeeSection"
        label={<FormattedMessage id="ui-circulation.settings.lostItemFee.lostItemSection" />}
        open={lostItemFeeSectionOpen}
      >
        <Row>
          <Col xs={12}>
            <div data-test-item-aged>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.itemeAgedLostOverdue" />}
                value={getPeriodValue('itemAgedLostOverdue')}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div data-test-patron-billed>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.patronBilledAfterAgedLost" />}
                value={getPeriodValue('patronBilledAfterAgedLost')}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div data-test-item-recalled-aged>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.itemRecalledAgedLostOverdue" />}
                value={getPeriodValue('itemAgedLostOverdue')}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div data-test-patron-billed-recalled>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.patronBilledAfterRecalledAgedLost" />}
                value={getPeriodValue('patronBilledAfterAgedLost')}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div data-test-charge-amount>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.chargeAmountItem" />}
                value={actualCost}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div data-test-lost-item-fee>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.lostItemProcessingFee" />}
                value={parseFloat(lostItemProcessingFee).toFixed(2)}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div data-test-lost-by-patron>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.chargeAmountItemPatron" />}
                value={chargeAmountItemPatron ? displayYes : displayNo}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div data-test-lost-by-system>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.chargeAmountItemSystem" />}
                value={chargeAmountItemSystem ? displayYes : displayNo}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div data-test-close-loan-after>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.lostItemNotChargeFeesFine" />}
                value={getPeriodValue('lostItemChargeFeeFine')}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div data-test-returned-lost-item>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.returnedLostItemProcessingFee" />}
                value={returnedLostItemProcessingFee ? displayYes : displayNo}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div data-test-replaced-lost-item>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.replacedLostItemProcessingFee" />}
                value={replacedLostItemProcessingFee ? displayYes : displayNo}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div data-test-replacement-fee>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.replacementProcessFee" />}
                value={parseFloat(replacementProcessingFee).toFixed(2)}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div data-test-replacement-allowed>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.replacementAllowed" />}
                value={replacementAllowed ? displayYes : displayNo}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div data-test-if-lost-item-returned>
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
            <div data-test-returned-more-than>
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
