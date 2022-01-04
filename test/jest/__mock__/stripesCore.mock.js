import React from 'react';

jest.mock('@folio/stripes/core', () => ({
  stripesConnect: jest.fn((component) => component),
  stripesShape: {},
  withStripes: (Component) => (props) => <Component {...props} />,
}));
