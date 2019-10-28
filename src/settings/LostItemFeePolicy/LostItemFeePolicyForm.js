import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import {
  FormattedMessage,
  injectIntl,
} from 'react-intl';

import stripesForm from '@folio/stripes/form';
import { stripesShape } from '@folio/stripes/core';

import {
  Accordion,
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

import css from './LostItemFee.css';

class LostItemFeePolicyForm extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    policy: PropTypes.object,
    initialValues: PropTypes.object,
    change: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  static defaultProps = {
    policy: {},
    initialValues: {},
  };

  state = {
    sections: {
      lostItemFeegeneralSection: true,
      LostItemFeeSection: true,
      lostItemFeeSectionOpen: true,
    },
  };

  handleSectionToggle = ({ id }) => {
    this.setState((state) => {
      const sections = { ...state.sections };
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
            <div className={css.accordionSection}>
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
              <Accordion
                id="lostItemFeegeneralSection"
                label={<FormattedMessage id="ui-circulation.settings.lostItemFee.generalInformation" />}
                open={sections.lostItemFeegeneralSection}
                onToggle={this.handleSectionToggle}
              >
                <Metadata
                  connect={stripes.connect}
                  metadata={policy.metadata}
                />
                <LostItemFeeAboutSection />
                <LostItemFeeSection
                  policy={policy}
                  change={change}
                  initialValues={initialValues}
                  accordionOnToggle={this.handleSectionToggle}
                  lostItemFeeSectionOpen={sections.lostItemFeeSectionOpen}  
                />
              </Accordion>
            </div>
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
