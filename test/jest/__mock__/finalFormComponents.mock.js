import React from 'react';

jest.mock('react-final-form', () => ({
  Field: jest.fn(({ label, component, ...rest }) => (
    <div {...rest}>
      {label}
      {component()}
    </div>
  ))
}));
