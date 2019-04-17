import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import { IfPermission } from '@folio/stripes/core';
import {
  Headline,
  NavList,
  NavListItem,
  NavListSection,
  Pane,
  PaneBackLink,
} from '@folio/stripes/components';
import { settingsRoutes } from '..';

class Settings extends Component {
  static propTypes = {
    children: PropTypes.node,
    intl: intlShape.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object,
  };

  render() {
    const { children, intl, match: { path } } = this.props;

    settingsRoutes.forEach(r => {
      r.displayName = intl.formatMessage({ id: r.label });
      r.isActive = this.props.location.pathname.startsWith(`${path}/${r.route}`);
    });

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
            <NavListSection>
              {settingsRoutes
                .sort((a, b) => a.displayName.toLowerCase().localeCompare(b.displayName.toLowerCase()))
                .map(setting => (
                  <IfPermission key={setting.route} perm={setting.perm}>
                    <NavListItem to={`${path}/${setting.route}`} isActive={setting.isActive}>{setting.displayName}</NavListItem>
                  </IfPermission>
                ))}
            </NavListSection>
          </NavList>
        </Pane>
        {children}
      </Fragment>
    );
  }
}

export default injectIntl(Settings);
