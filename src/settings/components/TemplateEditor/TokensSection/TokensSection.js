import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import { Checkbox } from '@folio/stripes/components';

import css from './TokensSection.css';

class TokensSection extends Component {
  static propTypes = {
    section: PropTypes.string.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    header: PropTypes.node,
    tokens: PropTypes.arrayOf(PropTypes.object).isRequired,
    loopConfig: PropTypes.shape({
      enabled: PropTypes.bool,
      label: PropTypes.node,
      tag: PropTypes.string,
    }),
    onLoopSelect: PropTypes.func,
    onSectionInit: PropTypes.func.isRequired,
    onTokenSelect: PropTypes.func.isRequired,
  };

  static defaultProps = {
    header: null,
    loopConfig: {
      enabled: false,
      label: null,
      tag: null,
    },
    onLoopSelect: noop,
  };

  componentDidMount() {
    const {
      loopConfig: { tag },
      section,
      onSectionInit,
    } = this.props;

    onSectionInit(section, tag);
  }

  onTokenChange = ({ target: { checked, value } }) => {
    const {
      section,
      onTokenSelect,
    } = this.props;

    onTokenSelect(value, checked, section);
  };

  onLoopChange = ({ target: { checked } }) => {
    const {
      section,
      onLoopSelect,
    } = this.props;

    onLoopSelect(section, checked);
  };

  render() {
    const {
      section,
      selectedCategory,
      header,
      tokens,
      loopConfig: {
        enabled,
        label,
        tag,
      }
    } = this.props;

    const isSectionActive = section.toLowerCase() === selectedCategory.toLowerCase();

    return (
      <>
        <div className={css.categoryHeader}>
          {header}
        </div>
        <ul
          data-test-available-tokens
          className={css.tokensList}
        >
          {tokens.map(({ token, allowedFor }) => {
            const disabled = !allowedFor.includes(selectedCategory);
            const labelClass = disabled ? css.disabledItem : '';

            return (
              <li key={token}>
                <Checkbox
                  labelClass={`${css.tokenLabel} ${labelClass}`}
                  value={token}
                  label={token}
                  disabled={disabled}
                  onChange={this.onTokenChange}
                />
              </li>
            );
          })}
          { enabled && (
            <>
              <hr />
              <Checkbox
                data-test-multiple-tokens
                labelClass={!isSectionActive ? css.disabledItem : ''}
                value={tag}
                label={<strong>{label}</strong>}
                disabled={!isSectionActive}
                onChange={this.onLoopChange}
              />
            </>
          )}
        </ul>
      </>
    );
  }
}

export default TokensSection;
