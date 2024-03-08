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
    isSaveButtonDisabled,
    isSaveButtonAvailable,
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
        {isSaveButtonAvailable &&
          <Button
            id="footer-save-entity"
            type="submit"
            marginBottom0
            buttonStyle="primary mega"
            disabled={isSaveButtonDisabled}
          >
            <FormattedMessage id="ui-circulation.settings.common.saveAndClose" />
          </Button>
        }
      </div>
    </PaneFooter>
  );
};

FooterPane.propTypes = {
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  isSaveButtonAvailable: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default FooterPane;
