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
  };

  render() {
    const { children } = this.props;

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
              <NavListItem to="/settings/circulation/loan-policies">
                <FormattedMessage id="ui-circulation.settings.index.loanPolicies" />
              </NavListItem>
            </IfPermission>
            <IfPermission perm="ui-circulation.settings.loan-rules">
              <NavListItem to="/settings/circulation/loan-rules">
                <FormattedMessage id="ui-circulation.settings.index.loanRules" />
              </NavListItem>
              <NavListItem to="/settings/circulation/fixed-due-date-schedules">
                <FormattedMessage id="ui-circulation.settings.index.fdds" />
              </NavListItem>
            </IfPermission>
            <NavListItem to="/settings/circulation/checkout">
              <FormattedMessage id="ui-circulation.settings.index.otherSettings" />
            </NavListItem>
            <NavListItem to="/settings/circulation/staffslips">
              <FormattedMessage id="ui-circulation.settings.index.staffSlips" />
            </NavListItem>
            <IfPermission perm="ui-circulation.settings.cancellation-reasons">
              <NavListItem to="/settings/circulation/cancellation-reasons">
                <FormattedMessage id="ui-circulation.settings.index.requestCancellationReasons" />
              </NavListItem>
            </IfPermission>
            <NavListItem to="/settings/circulation/patron-notices">
              <FormattedMessage id="ui-circulation.settings.index.patronNotices" />
            </NavListItem>
            <NavListItem to="/settings/circulation/notice-policies">
              <FormattedMessage id="ui-circulation.settings.index.noticePolicies" />
            </NavListItem>
          </NavList>
        </Pane>
        {children}
      </Fragment>
    );
  }
}
