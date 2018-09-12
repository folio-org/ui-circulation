import React from 'react';
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

export default LoanRulesField;
