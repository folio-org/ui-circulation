import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import stripesForm from '@folio/stripes/form';
import { stripesShape } from '@folio/stripes/core';
import {
  FormattedMessage,
  injectIntl,
} from 'react-intl';

import {
  Accordion,
  ExpandAllButton,
  Col,
  Row,
  Pane,
  Paneset,
} from '@folio/stripes/components';

import FinePolicy from '../Models/FinePolicy';

import {
  FinesSection,
  OverdueAboutSection,
} from './components/EditSections';

import {
  CancelButton,
  FooterPane,
  Metadata,
} from '../components';

class FinePolicyForm extends React.Component {
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
      overdueGeneralSection: true,
      fineSection: true,
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

  saveForm = (finePolicy) => {
    if ((finePolicy.overdueFine !== undefined && Number(finePolicy.overdueFine.quantity) === 0) ||
      (finePolicy.overdueFine !== undefined && finePolicy.overdueFine.quantity === '')) {
      delete finePolicy.overdueFine;
    }
    if ((finePolicy.overdueRecallFine !== undefined && Number(finePolicy.overdueRecallFine.quantity) === 0) ||
      (finePolicy.overdueRecallFine !== undefined && finePolicy.overdueRecallFine.quantity === '')) {
      delete finePolicy.overdueRecallFine;
    }
    this.props.onSave(finePolicy);
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

    const panelTitle = policy.id
      ? policy.name
      : <FormattedMessage id="ui-circulation.settings.finePolicy.createEntryLabel" />;

    const footerPaneProps = {
      pristine,
      submitting,
      onCancel,
    };

    return (
      <form
        noValidate
        data-test-fine-policy-form
        onSubmit={handleSubmit(this.saveForm)}
      >
        <Paneset isRoot>
          <Pane
            defaultWidth="100%"
            paneTitle={panelTitle}
            firstMenu={<CancelButton onCancel={onCancel} />}
            footer={<FooterPane {...footerPaneProps} />}
          >
            <React.Fragment>
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
                id="overdueGeneralSection"
                label={<FormattedMessage id="ui-circulation.settings.finePolicy.generalInformation" />}
                open={sections.overdueGeneralSection}
                onToggle={this.handleSectionToggle}
              >
                <Metadata
                  connect={stripes.connect}
                  metadata={policy.metadata}
                />
                <OverdueAboutSection />
                <FinesSection
                  initialValues={initialValues}
                  policy
                  fineSectionOpen={sections.fineSection}
                  accordionOnToggle={this.handleSectionToggle}
                  change={change}
                />
              </Accordion>
            </React.Fragment>
          </Pane>
        </Paneset>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  policy: new FinePolicy(getFormValues('finePolicyForm')(state)),
});


const connectedFinePolicyForm = connect(mapStateToProps)(injectIntl(FinePolicyForm));

export default stripesForm({
  form: 'finePolicyForm',
  navigationCheck: true,
  enableReinitialize: true,
})(connectedFinePolicyForm);
