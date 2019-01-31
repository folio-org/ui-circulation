import React from 'react';
import PropTypes from 'prop-types';
import LoanRulesEditor from './LoanRulesEditor';

const LoanRulesField = (props) => {
  const { input, meta, code, ...others } = props; // eslint-disable-line no-unused-vars

  return (
    <LoanRulesEditor
      code={input.value}
      onChange={input.onChange}
      {...others}
    />
  );
};

LoanRulesField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  code: PropTypes.string,
};

export default LoanRulesField;
