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
  } = props;

  return (
    <div>
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
                onChange={({ target: { checked, value } }) => onSelect(value, checked)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

TokensSection.propTypes = {
  header: PropTypes.node,
  tokens: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func,
};

TokensSection.defaultProps = {
  header: null,
  tokens: [],
  onSelect: noop,
};

export default TokensSection;
