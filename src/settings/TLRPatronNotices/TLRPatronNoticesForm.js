import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import stripesFinalForm from '@folio/stripes/final-form';
import { stripesConnect } from '@folio/stripes/core';
import {
  Button,
  Pane,
  PaneFooter,
} from '@folio/stripes/components';

import NoticeTemplates from './NoticeTemplates';
import {
  patronNoticeCategoryIds,
  MAX_UNPAGED_RESOURCE_COUNT,
} from '../../constants';

import css from './TLRPatronNoticesForm.css';

const TLRPatronNoticesForm = (props) => {
  const {
    handleSubmit,
    intl: {
      formatMessage,
    },
    label,
    pristine,
    submitting,
    resources,
  } = props;

  const templates = resources.templates?.records || [];

  const footer = (
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
  );

  return (
    <form
      id="tlr-patron-notices-form"
      data-testid="tlrPatronNoticesForm"
      className={css.TLRPatronNoticesForm}
      noValidate
      onSubmit={handleSubmit}
    >
      <Pane
        id="tlr-patron-notices-pane"
        defaultWidth="fill"
        fluidContentWidth
        paneTitle={label}
        footer={footer}
      >
        <NoticeTemplates templates={templates} />
      </Pane>
    </form>
  );
};

TLRPatronNoticesForm.manifest = Object.freeze({
  templates: {
    type: 'okapi',
    path: 'templates',
    records: 'templates',
    params: {
      query: `cql.allRecords=1 AND category="${patronNoticeCategoryIds.REQUEST}" AND active="true"`,
    },
    perRequest: MAX_UNPAGED_RESOURCE_COUNT,
  },
});

TLRPatronNoticesForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  resources: PropTypes.shape({
    templates: PropTypes.shape({
      records: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })),
    }),

  }).isRequired,
};

const withStripes = stripesConnect(TLRPatronNoticesForm);

export default injectIntl(stripesFinalForm({
  navigationCheck: true,
  subscription: { values: true },
})(withStripes));
