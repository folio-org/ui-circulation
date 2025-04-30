import React from 'react';
import PropTypes from 'prop-types';

import RulesEditor from './RulesEditor';

const RulesField = (props) => {
  const { input, meta, code, ...others } = props; // eslint-disable-line no-unused-vars

  return (
    <RulesEditor
      code={input.value}
      onChange={input.onChange}
      {...others}
    />
  );
};

RulesField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func,
  }),
  meta: PropTypes.shape({
    active: PropTypes.bool,
    dirty: PropTypes.bool,
  }),
  code: PropTypes.string,
};

export default RulesField;
