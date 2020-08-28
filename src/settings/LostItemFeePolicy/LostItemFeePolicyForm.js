import React from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import {
  FormattedMessage,
  injectIntl,
} from 'react-intl';

import stripesForm from '@folio/stripes/form';

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
import { checkInvalid } from './utils/normalize';

import {
  LostItemFeeAboutSection,
  LostItemFeeSection,
} from './components/EditSections';

import {
  CancelButton,
  FooterPane,
  Metadata,
} from '../components';

import formShape from '../utils/form-shape';

import css from './LostItemFee.css';

class LostItemFeePolicyForm extends React.Component {
  static propTypes = formShape;

  static defaultProps = {
    policy: {},
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

  saveForm = (lostItemFeePolicy) => {
    const lostItemFee = checkInvalid(lostItemFeePolicy);
    this.props.onSave(lostItemFee);
  };

  render() {
    const {
      pristine,
      policy,
      initialValues,
      stripes,
      submitting,
      handleSubmit,
      change,
      onCancel,
    } = this.props;

    const { sections } = this.state;

    const panelTitle = policy.id ? policy.name : <FormattedMessage id="ui-circulation.settings.lostItemFee.entryLabel" />;
    const footerPaneProps = {
      pristine,
      submitting,
      onCancel,
    };

    return (
      <form
        noValidate
        className={css.lostItemFeePolicyForm}
        data-test-lost-item-fee-policy-form
        onSubmit={handleSubmit(this.saveForm)}
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
                onToggle={this.handleSectionToggle}
              >
                <Accordion
                  id="lostItemFeeFormGeneralSection"
                  label={<FormattedMessage id="ui-circulation.settings.lostItemFee.generalInformation" />}
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

const mapStateToProps = (state) => ({
  policy: new LostItemFeePolicy(getFormValues('LostItemFeePolicyForm')(state)),
});

const connectedLostItemFeePolicyForm = connect(mapStateToProps)(injectIntl(LostItemFeePolicyForm));

export default stripesForm({
  form: 'LostItemFeePolicyForm',
  navigationCheck: true,
  enableReinitialize: true,
})(connectedLostItemFeePolicyForm);
