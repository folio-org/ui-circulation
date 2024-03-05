import { Field } from 'react-final-form';

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
  formatMessage,
  pristine,
  submitting,
  isEditEnabled,
  tlrSettings,
}) => {
  const isSaveButtonDisabled = pristine || submitting || !isEditEnabled;
  const isNotificationShown = !tlrSettings.isPending && !tlrSettings.records[0]?.value?.titleLevelRequestsFeatureEnabled;
  const labelClass = isNotificationShown ? css.disabledItem : '';
  const footer = (
    <PaneFooter
      renderEnd={(
        <Button
          type="submit"
          buttonStyle="primary paneHeaderNewButton"
          disabled={isSaveButtonDisabled}
          marginBottom0
        >
          {formatMessage({ id: 'stripes-core.button.save' })}
        </Button>
      )}
    />
  );

  return (
    <form
      data-testid="consortiumTlrForm"
      id="consortiumTlrForm"
      className={css.consortiumTlrForm}
      noValidate
      onSubmit={handleSubmit}
    >
      <Pane
        id="consortiumTlrPane"
        defaultWidth="fill"
        fluidContentWidth
        paneTitle={formatMessage({ id: 'ui-circulation.settings.index.consortiumTLR' })}
        footer={footer}
      >
        {isNotificationShown &&
          <div className={css.notification}>
            {formatMessage({ id: 'ui-circulation.settings.consortiumTlr.notification' })}
          </div>
        }
        <Field
          data-testid="consortiumTlrCheckbox"
          name={CONSORTIUM_TITLE_LEVEL_REQUESTS.ECS_TLR_ENABLED}
          type="checkbox"
          labelClass={labelClass}
          disabled={isNotificationShown}
          label={formatMessage({ id: 'ui-circulation.settings.consortiumTlr.allow' })}
          component={Checkbox}
        />
      </Pane>
    </form>
  );
};

export default stripesFinalForm({
  navigationCheck: true,
  subscription: {
    values: true,
  },
})(ConsortiumTLRForm);
