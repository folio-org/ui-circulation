import React from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
  intlShape,
  FormattedMessage,
} from 'react-intl';

import {
  Accordion,
} from '@folio/stripes/components';

import {
  intervalPeriods,
} from '../../../../../intervals';

import optionsGenerator from '../../../../utils/options-generator';
import OverdueFinesSection from '../RangeSection/OverdueFinesSection';
import OverdueFinesSectionColumn from '../RangeSection/OverdueFinesSectionColumn';

import css from '../../../FineSection.css';

class FinesSection extends React.Component {
  static propTypes = {
    intl: intlShape.isRequired,
    fineSectionOpen: PropTypes.bool.isRequired,
    accordionOnToggle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.generateOptions = optionsGenerator.bind(null, this.props.intl.formatMessage);
  }

  onBlurField = (e) => {
    const amount = parseFloat(e.target.value || 0.00).toFixed(2);
    e.target.value = amount;
  };

  render() {
    const {
      accordionOnToggle,
      fineSectionOpen,
      intl,
    } = this.props;

    const intervalP = this.generateOptions(intervalPeriods, 'ui-circulation.settings.finePolicy.selectInterval');

    return (
      <div data-test-fine-policy-form-overdue-fines-section>
        <Accordion
          id="fineSection"
          open={fineSectionOpen}
          onToggle={accordionOnToggle}
          label={<FormattedMessage id="ui-circulation.settings.finePolicy.overdueFine" />}
        >
          <section className={css.accordionSection}>
            <div data-test-fine-section-overdue>
              <OverdueFinesSection
                label={<FormattedMessage id="ui-circulation.settings.finePolicy.overdueFine" />}
                name="overdueFine.quantity"
                period="overdueFine.intervalId"
                intervalPeriods={intervalP}
                onBlurField={this.onBlurField}
                data="overdue-fine-quantity"
                intl={intl}
              />
            </div>
            <div data-test-fine-section-count-closed>
              <OverdueFinesSectionColumn
                label={<FormattedMessage id="ui-circulation.settings.finePolicy.countClosedDHM" />}
                name="countClosed"
                intl={intl}
              />
            </div>
            <div data-test-fine-section-max-overdue>
              <OverdueFinesSectionColumn
                label={<FormattedMessage id="ui-circulation.settings.finePolicy.maximumOverdueFine" />}
                name="maxOverdueFine"
                component="TextField"
                onBlurField={this.onBlurField}
                intl={intl}
              />
            </div>
            <div data-test-fine-section-forgive-overdue>
              <OverdueFinesSectionColumn
                label={<FormattedMessage id="ui-circulation.settings.finePolicy.forgiveOverdueFine" />}
                name="forgiveOverdueFine"
                intl={intl}
              />
            </div>
            <div data-test-fine-section-overdue-recall>
              <OverdueFinesSection
                label={<FormattedMessage id="ui-circulation.settings.finePolicy.overdueRecallFine" />}
                name="overdueRecallFine.quantity"
                period="overdueRecallFine.intervalId"
                intervalPeriods={intervalP}
                onBlurField={this.onBlurField}
                data="overdue-recall-fine-quantity"
                intl={intl}
              />
            </div>
            <div data-test-fine-section-grace-period-recall>
              <OverdueFinesSectionColumn
                label={<FormattedMessage id="ui-circulation.settings.finePolicy.ignoreGracePeriodsRecalls" />}
                name="gracePeriodRecall"
                intl={intl}
              />
            </div>
            <div data-test-fine-section-max-overdue-recall>
              <OverdueFinesSectionColumn
                label={<FormattedMessage id="ui-circulation.settings.finePolicy.maximumRecallOverdueFine" />}
                name="maxOverdueRecallFine"
                component="TextField"
                onBlurField={this.onBlurField}
                intl={intl}
              />
            </div>
          </section>
        </Accordion>
      </div>
    );
  }
}

export default injectIntl(FinesSection);
