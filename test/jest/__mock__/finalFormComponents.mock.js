import React from 'react';

jest.mock('react-final-form', () => ({
  Field: jest.fn(({
    label,
    component,
    children,
    dataOptions,
    ...rest
  }) => (
    <div {...rest}>
      {label}
      {component()}
    </div>
  )),
}));
