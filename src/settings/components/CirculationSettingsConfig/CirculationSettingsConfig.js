import {
  useRef,
  useCallback,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  stripesConnect,
} from '@folio/stripes/core';
import {
  Callout,
} from '@folio/stripes-components';

export const getPath = (_q, _p, _r, _l, props) => (
  `circulation/settings?query=(name==${props.configName})`
);

const CirculationSettingsConfig = ({
  configName,
  calloutMessage = <FormattedMessage id="stripes-smart-components.cm.success" />,
  children,
  configFormComponent: ConfigFormComponent,
  getInitialValues = (settings) => settings,
  label,
  lastMenu,
  mutator,
  onBeforeSave,
  resources,
  stripes,
  validate,
}) => {
  const callout = useRef();

  const initialValues = useMemo(() => {
    const settings = resources.settings?.records?.[0]?.value || {};

    return getInitialValues(settings);
  }, [resources, getInitialValues]);

  const onSave = useCallback((data) => {
    const value = onBeforeSave ? onBeforeSave(data) : data;
    const setting = {
      ...resources.settings?.records?.[0],
      name: configName,
      value,
    };
    const action = setting.id ? 'PUT' : 'POST';

    if (setting.metadata) {
      delete setting.metadata;
    }

    return mutator.settings[action](setting)
      .then(() => {
        callout.current?.sendCallout({ message: calloutMessage });
      });
  }, [resources, configName, mutator, calloutMessage, onBeforeSave]);

  const isLoaded = resources?.settings?.hasLoaded;

  if (!isLoaded) {
    return <div />;
  }

  return (
    <div style={{ width: '100%' }}>
      <ConfigFormComponent
        label={label}
        lastMenu={lastMenu}
        initialValues={initialValues}
        stripes={stripes}
        validate={validate}
        onSubmit={onSave}
      >
        {children}
      </ConfigFormComponent>
      <Callout ref={callout} />
    </div>
  );
};

CirculationSettingsConfig.propTypes = {
  calloutMessage: PropTypes.node,
  children: PropTypes.node,
  configFormComponent: PropTypes.elementType.isRequired,
  configName: PropTypes.string.isRequired,
  getInitialValues: PropTypes.func,
  label: PropTypes.node.isRequired,
  lastMenu: PropTypes.element,
  mutator: PropTypes.shape({
    settings: PropTypes.shape({
      POST: PropTypes.func,
      PUT: PropTypes.func,
    }),
  }).isRequired,
  onBeforeSave: PropTypes.func,
  resources: PropTypes.shape({
    settings: PropTypes.shape({
      hasLoaded: PropTypes.bool,
      records: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          // eslint-disable-next-line react/forbid-prop-types
          value: PropTypes.object, // shape depends on specific config
        })
      ),
    }),
  }).isRequired,
  stripes: PropTypes.shape({
    connect: PropTypes.func.isRequired,
  }),
  validate: PropTypes.func,
};

CirculationSettingsConfig.manifest = Object.freeze({
  settings: {
    type: 'okapi',
    path: getPath,
    records: 'circulationSettings',
    POST: {
      path: 'circulation/settings',
    },
    PUT: {
      path: 'circulation/settings',
    },
  },
});

export default stripesConnect(CirculationSettingsConfig);
