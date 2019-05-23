import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import { Checkbox } from '@folio/stripes/components';

import css from './TokensSection.css';

const TokensSection = (props) => {
  const {
    tokens,
    onSelect,
    header,
    disabled,
  } = props;

  return (
    <React.Fragment>
      <div className={css.categoryHeader}>
        {header}
      </div>
      <ul
        data-test-available-tokens
        className={css.tokensList}
      >
        {tokens.map((token) => {
          return (
            <li key={token}>
              <Checkbox
                value={token}
                label={token}
                disabled={disabled}
                onChange={({ target: { checked, value } }) => onSelect(value, checked)}
              />
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

TokensSection.propTypes = {
  header: PropTypes.node,
  tokens: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func,
  disabled: PropTypes.bool,
};

TokensSection.defaultProps = {
  header: null,
  tokens: [],
  onSelect: noop,
  disabled: false,
};

export default TokensSection;
