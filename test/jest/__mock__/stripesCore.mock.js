import React from 'react';

jest.mock('@folio/stripes/core', () => ({
  stripesConnect: (Component) => (props) => (
    <Component
      {...props}
      stripes={{
        logger: () => {},
      }}
    />
  ),
  stripesShape: {},
  withStripes: (Component) => (props) => <Component {...props} />,
}));
