import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { Field } from 'react-final-form';

import stripesFinalForm from '@folio/stripes/final-form';
import {
  IfPermission,
  stripesConnect,
} from '@folio/stripes/core';
import {
  Button,
  Checkbox,
  Col,
  Pane,
  Row,
  PaneFooter,
  Modal,
} from '@folio/stripes/components';

import NoticeTemplates from '../../../settings/TLRPatronNotices/NoticeTemplates';
import {
  patronNoticeCategoryIds,
  MAX_UNPAGED_RESOURCE_COUNT,
  TITLE_LEVEL_REQUESTS,
  OPEN_REQUESTS_STATUSES,
  REQUEST_LEVEL,
} from '../../../constants';

import css from './TitleLevelRequestsForm.css';

const statusesQueryPart = OPEN_REQUESTS_STATUSES.map(status => `status=="${status}"`).join(' OR ');

const TitleLevelRequestsForm = (props) => {
  const {
    handleSubmit,
    intl: { formatMessage },
    label,
    pristine,
    submitting,
    form,
    resources,
    mutator,
  } = props;

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const templates = resources.templates?.records || [];
  const { values: titleLevelRequestsValues } = form.getState();

  const renderFooter = () => (
    <IfPermission perm="ui-circulation.settings.titleLevelRequests">
      <PaneFooter
        renderEnd={(
          <Button
            type="submit"
            buttonStyle="primary paneHeaderNewButton"
            disabled={pristine || submitting}
            marginBottom0
          >
            {formatMessage({ id: 'stripes-core.button.save' })}
          </Button>
          )}
      />
    </IfPermission>
  );

  const handleTlrCheckboxClick = async () => {
    if (!titleLevelRequestsValues[TITLE_LEVEL_REQUESTS.TLR_ENABLED]) {
      form.change(TITLE_LEVEL_REQUESTS.TLR_ENABLED, true);

      return;
    }

    const activeTitleRequests = await mutator.requests.GET();

    if (activeTitleRequests.length) {
      setIsErrorModalOpen(true);

      return;
    }

    form.change(TITLE_LEVEL_REQUESTS.TLR_ENABLED, false);
  };

  const handleModalClose = () => setIsErrorModalOpen(false);

  const modalFooter = (
    <Button
      onClick={handleModalClose}
      buttonStyle="primary"
    >
      {formatMessage({ id: 'stripes-core.button.close' })}
    </Button>
  );

  return (
    <form
      data-testid="tlrForm"
      id="title-level-requests-form"
      className={css.titleLevelRequestsForm}
      noValidate
      onSubmit={handleSubmit}
    >
      <Pane
        id="title-level-requests-pane"
        data-testid="tlrPane"
        defaultWidth="fill"
        fluidContentWidth
        paneTitle={label}
        footer={renderFooter()}
      >
        <Row>
          <Col xs={12}>
            <Field
              data-testid="tlrSwitchCheckbox"
              name={TITLE_LEVEL_REQUESTS.TLR_ENABLED}
              type="checkbox"
              label={formatMessage({ id: 'ui-circulation.settings.titleLevelRequests.allow' })}
              component={Checkbox}
              onChange={handleTlrCheckboxClick}
            />
          </Col>
        </Row>
        {
          titleLevelRequestsValues[TITLE_LEVEL_REQUESTS.TLR_ENABLED] &&
          <>
            <div className={css.tlrSettings}>
              <Field
                name={TITLE_LEVEL_REQUESTS.CREATE_TLR_BY_DEFAULT}
                type="checkbox"
                label={formatMessage({ id: 'ui-circulation.settings.titleLevelRequests.createTLR' })}
                component={Checkbox}
              />
              <Field
                name={TITLE_LEVEL_REQUESTS.TLR_HOLD_SHOULD_FOLLOW_CIRCULATION_RULES}
                type="checkbox"
                label={formatMessage({ id: 'ui-circulation.settings.titleLevelRequests.tlrHoldShouldFollowCirculationRules' })}
                component={Checkbox}
              />
            </div>
            <div className={css.tlrNoticeSection}>
              <NoticeTemplates
                templates={templates}
              />
            </div>
          </>
        }
        <Modal
          data-testid="forbiddenDisableTlrModal"
          label={formatMessage({ id: 'ui-circulation.settings.titleLevelRequests.forbiddenDisableTlrModal.title' })}
          open={isErrorModalOpen}
          onClose={handleModalClose}
          dismissible
          footer={modalFooter}
        >
          {formatMessage({ id: 'ui-circulation.settings.titleLevelRequests.forbiddenDisableTlrModal.description' })}
        </Modal>
      </Pane>
    </form>
  );
};

TitleLevelRequestsForm.manifest = Object.freeze({
  templates: {
    type: 'okapi',
    path: 'templates',
    records: 'templates',
    params: {
      query: `cql.allRecords=1 AND category="${patronNoticeCategoryIds.REQUEST}" AND active="true"`,
    },
    perRequest: MAX_UNPAGED_RESOURCE_COUNT,
  },
  requests: {
    type: 'okapi',
    path: 'circulation/requests',
    records: 'requests',
    accumulate: true,
    fetch: false,
    params: {
      query: `${statusesQueryPart} AND requestLevel=="${REQUEST_LEVEL.TITLE}"`,
      limit: '1',
    },
  },
});

TitleLevelRequestsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  form: PropTypes.shape({
    change: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
  }).isRequired,
  resources: PropTypes.shape({
    templates: PropTypes.shape({
      records: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })),
    }),
    requests: PropTypes.shape({
      records: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
      })).isRequired,
    }).isRequired,
  }).isRequired,
  mutator: PropTypes.shape({
    requests: PropTypes.shape({
      GET: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

const withStripes = stripesConnect(TitleLevelRequestsForm);

export default injectIntl(stripesFinalForm({
  navigationCheck: true,
  subscription: { values: true },
})(withStripes));
