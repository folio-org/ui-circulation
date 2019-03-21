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
            <IfPermission perm="ui-circulation.settings.loan-policies">
              <NavListItem to={`${path}/loan-policies`}>
                <FormattedMessage id="ui-circulation.settings.index.loanPolicies" />
              </NavListItem>
            </IfPermission>
            <IfPermission perm="ui-circulation.settings.circulation-rules">
              <NavListItem to={`${path}/circulation-rules`}>
                <FormattedMessage id="ui-circulation.settings.index.circulationRules" />
              </NavListItem>
            </IfPermission>
            <IfPermission perm="ui-circulation.settings.fixed-due-date-schedules">
              <NavListItem to={`${path}/fixed-due-date-schedules`}>
                <FormattedMessage id="ui-circulation.settings.index.fdds" />
              </NavListItem>
            </IfPermission>
            <IfPermission perm="ui-circulation.settings.other-settings">
              <NavListItem to={`${path}/checkout`}>
                <FormattedMessage id="ui-circulation.settings.index.otherSettings" />
              </NavListItem>
            </IfPermission>
            <IfPermission perm="ui-circulation.settings.staff-slips">
              <NavListItem to={`${path}/staffslips`}>
                <FormattedMessage id="ui-circulation.settings.index.staffSlips" />
              </NavListItem>
            </IfPermission>
            <IfPermission perm="ui-circulation.settings.cancellation-reasons">
              <NavListItem to={`${path}/cancellation-reasons`}>
                <FormattedMessage id="ui-circulation.settings.index.requestCancellationReasons" />
              </NavListItem>
            </IfPermission>
            <IfPermission perm="ui-circulation.settings.notice-templates">
              <NavListItem to={`${path}/patron-notices`}>
                <FormattedMessage id="ui-circulation.settings.index.patronNotices" />
              </NavListItem>
            </IfPermission>
            <IfPermission perm="ui-circulation.settings.notice-policies">
              <NavListItem to={`${path}/notice-policies`}>
                <FormattedMessage id="ui-circulation.settings.index.noticePolicies" />
              </NavListItem>
            </IfPermission>
            <IfPermission perm="ui-circulation.settings.request-policies">
              <NavListItem to={`${path}/request-policies`}>
                <FormattedMessage id="ui-circulation.settings.index.requestPolicies" />
              </NavListItem>
            </IfPermission>
          </NavList>
        </Pane>
        {children}
      </Fragment>
    );
  }
}
