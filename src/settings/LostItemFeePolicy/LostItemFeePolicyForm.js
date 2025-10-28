import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { stripesShape } from '@folio/stripes/core';
import stripesFinalForm from '@folio/stripes/final-form';

import {
  Accordion,
  AccordionSet,
  AccordionStatus,
  ExpandAllButton,
  Col,
  Row,
  Pane,
  Paneset,
} from '@folio/stripes/components';

import LostItemFeePolicy from '../Models/LostItemFeePolicy';
import { LostItemFeePolicy as validateLostItemFeePolicy } from '../Validation';

import {
  LostItemFeeAboutSection,
  LostItemFeeSection,
} from './components/EditSections';

import {
  CancelButton,
  FooterPane,
  Metadata,
} from '../components';

import { transformModelBooleans } from './utils/normalize';

import css from './LostItemFeePolicyForm.css';

class LostItemFeePolicyForm extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    initialValues: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    form: PropTypes.shape({
      getState: PropTypes.func.isRequired,
      change: PropTypes.func.isRequired,
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    initialValues: {},
  };

  render() {
    const {
      pristine,
      initialValues,
      stripes,
      submitting,
      handleSubmit,
      form: {
        change,
        getState,
      },
      onCancel,
      intl : {
        formatMessage,
      },
    } = this.props;

    const { values } = getState();
    const policy = new LostItemFeePolicy(values);

    const panelTitle = policy.id ? policy.name : formatMessage({ id: 'ui-circulation.settings.lostItemFee.entryLabel' });
    const footerPaneProps = {
      isSaveButtonDisabled: pristine || submitting,
      onCancel,
    };

    return (
      <form
        data-testid="lostItemFeePolicyForm"
        className={css.lostItemFeePolicyForm}
        noValidate
        data-test-lost-item-fee-policy-form
        onSubmit={handleSubmit}
      >
        <Paneset isRoot>
          <Pane
            id="lost-item-fee-policy-pane"
            defaultWidth="100%"
            paneTitle={panelTitle}
            firstMenu={<CancelButton onCancel={onCancel} />}
            footer={<FooterPane {...footerPaneProps} />}
          >
            <AccordionStatus>
              <Row end="xs">
                <Col
                  data-test-expand-all
                  xs
                >
                  <ExpandAllButton />
                </Col>
              </Row>
              <AccordionSet data-testid="generalSectionSet">
                <Accordion
                  id="lostItemFeeFormGeneralSection"
                  label={formatMessage({ id: 'ui-circulation.settings.lostItemFee.generalInformation' })}
                >
                  <AccordionSet>
                    <Metadata
                      connect={stripes.connect}
                      metadata={policy.metadata}
                    />
                  </AccordionSet>
                  <LostItemFeeAboutSection />
                </Accordion>
                <LostItemFeeSection
                  policy={policy}
                  change={change}
                  initialValues={initialValues}
                />
              </AccordionSet>
            </AccordionStatus>
          </Pane>
        </Paneset>
      </form>
    );
  }
}

export default stripesFinalForm({
  keepDirtyOnReinitialize: true,
  navigationCheck: true,
  validate: model => validateLostItemFeePolicy(transformModelBooleans(model)),
})(injectIntl(LostItemFeePolicyForm));
