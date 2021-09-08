import React from 'react';

jest.mock('react-final-form', () => ({
  Field: jest.fn(({ label, component, children, ...rest }) => (
    <div {...rest}>
      {label}
      {component()}
      {children}
    </div>
  )),
}));
