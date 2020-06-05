import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  PaneFooter,
} from '@folio/stripes/components';

import css from './FooterPane.css';

const FooterPane = (props) => {
  const {
    pristine,
    submitting,
    onCancel,
  } = props;

  return (
    <PaneFooter>
      <div className={css.footerContent}>
        <Button
          id="footer-cancel-entity"
          marginBottom0
          buttonStyle="default mega"
          onClick={onCancel}
        >
          <FormattedMessage id="ui-circulation.settings.common.cancel" />
        </Button>
        <Button
          id="footer-save-entity"
          type="submit"
          marginBottom0
          buttonStyle="primary mega"
          disabled={(pristine || submitting)}
        >
          <FormattedMessage id="ui-circulation.settings.common.saveAndClose" />
        </Button>
      </div>
    </PaneFooter>
  );
};

FooterPane.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default FooterPane;
