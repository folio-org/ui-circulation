import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import stripesFinalForm from '@folio/stripes/final-form';
import {
  Button,
  Checkbox,
  Pane,
  PaneFooter,
} from '@folio/stripes/components';

import { CONSORTIUM_TITLE_LEVEL_REQUESTS } from '../../constants';

import css from './ConsortiumTLRForm.css';

const ConsortiumTLRForm = ({
  handleSubmit,
  pristine,
  isEditEnabled,
  tlrSettings,
  isDataSaving,
  isConsortiumTlrPending,
}) => {
  const isSaveButtonDisabled = pristine || !isEditEnabled || isDataSaving;
  const isTlrFeatureDisabled = !tlrSettings.isPending && !tlrSettings.records[0]?.value?.titleLevelRequestsFeatureEnabled;
  const isCheckboxDisabled = isConsortiumTlrPending || isTlrFeatureDisabled;
  const footer = (
    <PaneFooter
      renderEnd={(
        <Button
          type="submit"
          buttonStyle="primary paneHeaderNewButton"
          disabled={isSaveButtonDisabled}
          marginBottom0
        >
          <FormattedMessage id="stripes-core.button.save" />
        </Button>
      )}
    />
  );

  return (
    <form
      data-testid="consortiumTlrForm"
      id="consortiumTlrForm"
      className={css.consortiumTlrForm}
      onSubmit={handleSubmit}
      noValidate
    >
      <Pane
        id="consortiumTlrPane"
        defaultWidth="fill"
        fluidContentWidth
        paneTitle={<FormattedMessage id="ui-circulation.settings.index.consortiumTLR" />}
        footer={footer}
      >
        {isTlrFeatureDisabled &&
          <div className={css.notification}>
            <FormattedMessage id="ui-circulation.settings.consortiumTlr.notification" />
          </div>
        }
        <Field
          data-testid="consortiumTlrCheckbox"
          name={CONSORTIUM_TITLE_LEVEL_REQUESTS.ECS_TLR_ENABLED}
          type="checkbox"
          disabled={isCheckboxDisabled}
          label={<FormattedMessage id="ui-circulation.settings.consortiumTlr.allow" />}
          component={Checkbox}
        />
      </Pane>
    </form>
  );
};

ConsortiumTLRForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  isDataSaving: PropTypes.bool.isRequired,
  isConsortiumTlrPending: PropTypes.bool.isRequired,
  isEditEnabled: PropTypes.bool.isRequired,
  tlrSettings: PropTypes.object.isRequired,
};

export default stripesFinalForm({
  navigationCheck: true,
  subscription: {
    values: true,
  },
})(ConsortiumTLRForm);
