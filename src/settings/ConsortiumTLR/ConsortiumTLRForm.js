import {
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import {
  IfPermission,
} from '@folio/stripes/core';
import stripesFinalForm from '@folio/stripes/final-form';
import {
  Button,
  Col,
  Checkbox,
  MultiSelection,
  Pane,
  PaneFooter,
} from '@folio/stripes/components';

import {
  useCurrentTenants,
} from './hooks';
import {
  getDataOptions,
} from '../utils/utils';
import {
  CONSORTIUM_TITLE_LEVEL_REQUESTS,
} from '../../constants';

import css from './ConsortiumTLRForm.css';

const ConsortiumTLRForm = ({
  form,
  handleSubmit,
  pristine,
  isEditEnabled,
  tlrSettings,
  isSaving,
}) => {
  const {
    tenants,
  } = useCurrentTenants();
  const dataOptions = useMemo(() => getDataOptions(tenants), [tenants]);
  const { values } = form.getState();
  const isSaveButtonDisabled = pristine || !isEditEnabled || isSaving;
  const isTlrFeatureDisabled = !tlrSettings.isPending && !tlrSettings.records[0]?.value?.titleLevelRequestsFeatureEnabled;
  const footer = (
    <IfPermission perm="tlr.consortium-tlr.edit">
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
    </IfPermission>
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
          disabled={isTlrFeatureDisabled}
          label={<FormattedMessage id="ui-circulation.settings.consortiumTlr.allow" />}
          component={Checkbox}
        />
        {values?.ecsTlrFeatureEnabled &&
          <div className={css.notification}>
            <Col xs={12}>
              <Field
                id={CONSORTIUM_TITLE_LEVEL_REQUESTS.EXCLUDE_FROM_ECS_REQUEST_LENDING_TENANT_SEARCH}
                name={CONSORTIUM_TITLE_LEVEL_REQUESTS.EXCLUDE_FROM_ECS_REQUEST_LENDING_TENANT_SEARCH}
                label={<FormattedMessage id="ui-circulation.settings.titleLevelRequests.excludeTenants" />}
                dataOptions={dataOptions}
                component={MultiSelection}
              />
            </Col>
          </div>
        }
      </Pane>
    </form>
  );
};

ConsortiumTLRForm.propTypes = {
  form: PropTypes.shape({
    getState: PropTypes.func.isRequired,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  isEditEnabled: PropTypes.bool.isRequired,
  tlrSettings: PropTypes.shape({
    isPending: PropTypes.bool,
    records: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.shape({
        titleLevelRequestsFeatureEnabled: PropTypes.bool,
      }),
    })),
  }).isRequired,
};

export default stripesFinalForm({
  navigationCheck: true,
  subscription: {
    values: true,
  },
})(ConsortiumTLRForm);
