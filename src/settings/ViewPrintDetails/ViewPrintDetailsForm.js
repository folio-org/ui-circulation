import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { injectIntl } from 'react-intl';

import {
  Button,
  Checkbox,
  Col,
  Pane,
  PaneFooter,
  Row,
} from '@folio/stripes/components';
import stripesFinalForm from '@folio/stripes/final-form';

import { VIEW_PRINT_DETAILS_ENABLED } from '../../constants';

import css from './ViewPrintDetailsForm.css';

const ViewPrintDetailsForm = ({
  handleSubmit,
  pristine,
  submitting,
  intl: {
    formatMessage
  },
}) => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSubmit, pristine, submitting]);

  const paneTitle = formatMessage({ id: 'ui-circulation.settings.title.viewPrintDetails' });

  return (
    <form
      id="viewPrintDetailsForm"
      data-testid="viewPrintDetailsFormSubmit"
      className={css.viewPrintDetailsForm}
      noValidate
      onSubmit={handleSubmit}
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
      </Pane>
    </form>
  );
};

ViewPrintDetailsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default injectIntl(stripesFinalForm({
  navigationCheck: true,
  subscription: { values: true },
})(ViewPrintDetailsForm));
