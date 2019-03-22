import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { IfPermission } from '@folio/stripes/core';
import {
  Headline,
  NavList,
  NavListItem,
  Pane,
  PaneBackLink,
} from '@folio/stripes/components';
import { settingsRoutes } from '..';

export default class Settings extends Component {
  static propTypes = {
    children: PropTypes.node,
    match: PropTypes.object.isRequired,
  };

  render() {
    const { children, match: { path } } = this.props;

    return (
      <Fragment>
        <Pane
          defaultWidth="20%"
          paneTitle={
            <Headline tag="h3" margin="none">
              <FormattedMessage id="ui-circulation.settings.index.paneTitle" />
            </Headline>
          }
          firstMenu={(
            <PaneBackLink to="/settings" />
          )}
        >
          <NavList>
            {settingsRoutes.map(setting => (
              <IfPermission key={setting.route} perm={setting.perm}>
                <NavListItem to={`${path}/${setting.route}`}>{setting.label}</NavListItem>
              </IfPermission>
            ))}
          </NavList>
        </Pane>
        {children}
      </Fragment>
    );
  }
}
