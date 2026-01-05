import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
// import { v4 as uuidv4 } from 'uuid';
import { Callout } from '@folio/stripes-components';

export const getPath = (_q, _p, _r, _l, props) => `circulation/settings?query=(name==${props.configName})`;

class ConfigManager extends React.Component {
  static manifest = Object.freeze({
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

  static propTypes = {
    calloutMessage: PropTypes.node, // ?
    children: PropTypes.node, // ?
    configFormComponent: PropTypes.func,
    // configName: PropTypes.string.isRequired, // Required for manifest
    getInitialValues: PropTypes.func,
    label: PropTypes.node.isRequired, // ?
    lastMenu: PropTypes.element, // ?
    mutator: PropTypes.shape({
      settings: PropTypes.shape({
        POST: PropTypes.func,
        PUT: PropTypes.func,
      }),
    }).isRequired,
    onAfterSave: PropTypes.func, // ?
    onBeforeSave: PropTypes.func,
    resources: PropTypes.object.isRequired,
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }),
    validate: PropTypes.func, // ?
  };

  static defaultProps = {
    calloutMessage: <FormattedMessage id="stripes-smart-components.cm.success" />,
  };

  constructor(props) {
    super(props);

    this.onSave = this.onSave.bind(this);
  }

  onSave(data) {
    const {
      resources,
      mutator,
      calloutMessage,
      onBeforeSave,
      onAfterSave,
    } = this.props;
    const value = onBeforeSave ? onBeforeSave(data) : data;
    // const setting = Object.assign(
    //   {},
    //   resources.settings?.records?.[0],
    //   { value },
    // );

    const setting = {
      ...resources.settings?.records?.[0],
      value,
    };

    const action = setting.id ? 'PUT' : 'POST';

    // if (!setting.id) {
    //   setting.id = uuidv4();
    // }

    if (setting.metadata) {
      delete setting.metadata;
    }

    return mutator.settings[action](setting).then(() => {
      if (this.callout) {
        this.callout.sendCallout({ message: calloutMessage });
      }

      if (onAfterSave) {
        onAfterSave(setting);
      }
    });
  }

  getConfigForm() {
    const {
      label,
      children,
      lastMenu,
    } = this.props;
    const initialValues = this.getInitialValues();
    const ConfigFormComponent = this.props.configFormComponent;

    return (
      <ConfigFormComponent
        onSubmit={this.onSave}
        validate={this.props.validate}
        initialValues={initialValues}
        label={label}
        lastMenu={lastMenu}
        stripes={this.props.stripes}
      >
        {children}
      </ConfigFormComponent>
    );
  }

  getInitialValues() {
    const {
      resources,
      getInitialValues,
    } = this.props;
    const settings = resources.settings?.records?.[0]?.value || {};

    if (getInitialValues) {
      return getInitialValues(settings);
    }

    return settings;
  }

  render() {
    console.warn('ConfigManager');
    const settings = this.props.resources.settings || {};

    if (settings && settings.hasLoaded) {
      return (
        <div style={{ width: '100%' }}>
          {this.getConfigForm()}
          <Callout ref={(ref) => { this.callout = ref; }} />
        </div>
      );
    }

    return <div />;
  }
}

export default ConfigManager;
