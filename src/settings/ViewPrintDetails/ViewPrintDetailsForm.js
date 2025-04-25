import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { injectIntl } from 'react-intl';

import {
  Button,
  Checkbox,
  Col,
  ConfirmationModal,
  Pane,
  PaneFooter,
  Row,
} from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';
import { TitleManager } from '@folio/stripes/core';

import { VIEW_PRINT_DETAILS_ENABLED } from '../../constants';

import css from './ViewPrintDetailsForm.css';

const ViewPrintDetailsForm = ({
  handleSubmit,
  paneTitle,
  pristine,
  submitting,
  form,
  intl: {
    formatMessage
  },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const paneFooter = useMemo(() => {
    const end = (
      <Button
        id="clickable-save-print-details-footer"
        type="submit"
        buttonStyle="primary paneHeaderNewButton"
        disabled={pristine || submitting}
        marginBottom0
      >
        {formatMessage({ id: 'stripes-core.button.save' })}
      </Button>
    );

    return <PaneFooter renderEnd={end} />;
  }, [formatMessage, pristine, submitting]);

  const handleModalCancel = () => {
    form.change(VIEW_PRINT_DETAILS_ENABLED, true);
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    handleSubmit({ [VIEW_PRINT_DETAILS_ENABLED]: false });
    setIsModalOpen(false);
  };

  const onSubmit = (eventObject) => {
    if (!form.getFieldState(VIEW_PRINT_DETAILS_ENABLED).value) {
      eventObject.preventDefault();
      setIsModalOpen(true);
    } else {
      handleSubmit(eventObject);
    }
  };

  return (
    <TitleManager
      page={formatMessage({ id: 'ui-circulation.settings.title.general' })}
      record={formatMessage({ id: 'ui-circulation.settings.title.viewPrintDetails' })}
    >
      <form
        id="viewPrintDetailsForm"
        data-testid="viewPrintDetailsFormSubmit"
        className={css.viewPrintDetailsForm}
        noValidate
        onSubmit={onSubmit}
      >
        <Pane
          defaultWidth="fill"
          id="viewPrintDetailsFormPane"
          paneTitle={paneTitle}
          footer={paneFooter}
        >
          <Row>
            <Col xs={12}>
              <Field
                component={Checkbox}
                data-testid="viewPrintDetailsCheckbox"
                label={formatMessage({ id: 'ui-circulation.settings.ViewPrintDetails.enable' })}
                name={VIEW_PRINT_DETAILS_ENABLED}
                type="checkbox"
              />
            </Col>
          </Row>
          <ConfirmationModal
            id="disable-print-details-modal"
            open={isModalOpen}
            onConfirm={handleModalConfirm}
            onCancel={handleModalCancel}
            heading={formatMessage({ id: 'ui-circulation.settings.ViewPrintDetails.warningPopup.heading' })}
            message={formatMessage({ id: 'ui-circulation.settings.ViewPrintDetails.warningPopup.message' })}
            confirmLabel={formatMessage({ id: 'ui-circulation.settings.ViewPrintDetails.warningPopup.message.confirm' })}
            cancelLabel={formatMessage({ id: 'ui-circulation.settings.ViewPrintDetails.warningPopup.message.cancel' })}
          />
        </Pane>
      </form>
    </TitleManager>
  );
};

ViewPrintDetailsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  paneTitle: PropTypes.string.isRequired,
  form: PropTypes.shape({
    change: PropTypes.func.isRequired,
    getFieldState: PropTypes.func.isRequired,
  }).isRequired,
};

export default injectIntl(stripesFinalForm({
  navigationCheck: true,
  subscription: { values: true },
})(ViewPrintDetailsForm));
