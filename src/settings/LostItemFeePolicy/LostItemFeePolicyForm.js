import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { stripesShape } from '@folio/stripes/core';
import stripesFinalForm from '@folio/stripes/final-form';

import {
  Accordion,
  AccordionSet,
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

class LostItemFeePolicyForm extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    initialValues: PropTypes.object,
    form: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  };

  static defaultProps = {
    initialValues: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      sections: {
        lostItemFeeFormGeneralSection: true,
        LostItemFeeSection: true,
        editLostItemFeeSection: true,
      },
    };
  }

  handleSectionToggle = ({ id }) => {
    this.setState(({ sections }) => {
      sections[id] = !sections[id];
      return { sections };
    });
  };

  handleExpandAll = (sections) => {
    this.setState({ sections });
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

    const { sections } = this.state;

    const { values } = getState();
    const policy = new LostItemFeePolicy(values);

    const panelTitle = policy.id ? policy.name : formatMessage({ id: 'ui-circulation.settings.lostItemFee.entryLabel' });
    const footerPaneProps = {
      pristine,
      submitting,
      onCancel,
    };

    return (
      <form
        data-testid="lostItemFeePolicyForm"
        noValidate
        data-test-lost-item-fee-policy-form
        onSubmit={handleSubmit}
      >
        <Paneset isRoot>
          <Pane
            defaultWidth="100%"
            paneTitle={panelTitle}
            firstMenu={<CancelButton onCancel={onCancel} />}
            footer={<FooterPane {...footerPaneProps} />}
          >
            <>
              <Row end="xs">
                <Col
                  data-test-expand-all
                  xs
                >
                  <ExpandAllButton
                    accordionStatus={sections}
                    onToggle={this.handleExpandAll}
                  />
                </Col>
              </Row>
              <AccordionSet
                data-testid="generalSectionSet"
                onToggle={this.handleSectionToggle}
              >
                <Accordion
                  id="lostItemFeeFormGeneralSection"
                  label={formatMessage({ id: 'ui-circulation.settings.lostItemFee.generalInformation' })}
                  open={sections.lostItemFeeFormGeneralSection}
                >
                  <Metadata
                    connect={stripes.connect}
                    metadata={policy.metadata}
                  />
                  <LostItemFeeAboutSection />
                </Accordion>
                <LostItemFeeSection
                  policy={policy}
                  change={change}
                  initialValues={initialValues}
                  lostItemFeeSectionOpen={sections.editLostItemFeeSection}
                />
              </AccordionSet>
            </>
          </Pane>
        </Paneset>
      </form>
    );
  }
}

export default stripesFinalForm({
  navigationCheck: true,
  validate: model => validateLostItemFeePolicy(transformModelBooleans(model)),
})(injectIntl(LostItemFeePolicyForm));
