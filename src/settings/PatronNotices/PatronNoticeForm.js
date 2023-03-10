import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
  injectIntl,
} from 'react-intl';

import { stripesShape } from '@folio/stripes/core';
import {
  Accordion,
  AccordionSet,
  Col,
  ExpandAllButton,
  Pane,
  Paneset,
  Row,
} from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';

import {
  CancelButton,
  FooterPane,
  Metadata,
} from '../components';
import {
  PatronNoticeAboutSection,
  PatronNoticeEmailSection,
} from './components/EditSections';

import { PatronNoticeTemplate as validatePatronNoticeTemplate } from '../Validation';

import {
  isEditLayer,
} from '../utils/utils';

import css from './PatronNoticeForm.css';

const PatronNoticeForm = (props) => {
  const {
    handleSubmit,
    initialValues,
    initialValues: {
      id: initialId,
    },
    location: {
      search,
    },
    intl: {
      formatMessage,
      locale,
    },
    form: { getFieldState },
    stripes: {
      connect,
    },
    okapi,
  } = props;
  const category = getFieldState('category')?.value;

  if (isEditLayer(search) && !initialId) {
    return null;
  }

  const renderCLoseIcon = () => {
    const { onCancel } = props;

    return (
      <CancelButton
        data-testid="patronNoticeCancelButton"
        labelKey="ui-circulation.settings.patronNotices.closeDialog"
        onCancel={onCancel}
      />
    );
  };

  const renderPaneTitle = () => {
    const {
      initialValues: notice,
    } = props;

    return notice.id
      ? notice.name
      : formatMessage({ id: 'ui-circulation.settings.patronNotices.newLabel' });
  };

  const renderFooterPane = () => {
    const {
      pristine,
      submitting,
      onCancel,
    } = props;

    return (
      <FooterPane
        data-testid="patronNoticeFooterPane"
        pristine={pristine}
        submitting={submitting}
        onCancel={onCancel}
      />
    );
  };

  return (
    <form
      id="form-patron-notice"
      data-testid="patronNoticeForm"
      className={css.patronNoticeForm}
      noValidate
      data-test-patron-notice-form
      onSubmit={handleSubmit}
    >
      <Paneset
        data-testid="patronNoticePaneset"
        isRoot
      >
        <Pane
          data-testid="patronNoticeTemplatePane"
          id="patron-notice-template-pane"
          defaultWidth="100%"
          paneTitle={renderPaneTitle()}
          firstMenu={renderCLoseIcon()}
          footer={renderFooterPane()}
        >
          <AccordionSet>
            <Row end="xs">
              <Col data-test-expand-all>
                <ExpandAllButton />
              </Col>
            </Row>
            <Accordion
              label={formatMessage({ id: 'ui-circulation.settings.patronNotices.generalInformation' })}
            >
              <Metadata
                connect={connect}
                metadata={initialValues.metadata}
              />
              <PatronNoticeAboutSection initialValues={initialValues} okapi={okapi} />
            </Accordion>
            <Accordion
              label={formatMessage({ id: 'ui-circulation.settings.patronNotices.email' })}
            >
              <PatronNoticeEmailSection category={category} locale={locale} />
            </Accordion>
          </AccordionSet>
          { initialValues.predefined &&
            <Row>
              <Col xs={8}>
                <FormattedMessage id="ui-circulation.settings.patronNotices.predefinedWarning" />
              </Col>
            </Row>}
        </Pane>
      </Paneset>
    </form>
  );
};

PatronNoticeForm.propTypes = {
  intl: PropTypes.object.isRequired,
  okapi: PropTypes.object.isRequired,
  initialValues: PropTypes.object,
  form: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  stripes: stripesShape.isRequired,
};

PatronNoticeForm.defaultProps = {
  initialValues: {},
};
export default stripesFinalForm({
  navigationCheck: true,
  validate: validatePatronNoticeTemplate,
  subscription: { values: true },
})(injectIntl(PatronNoticeForm));
