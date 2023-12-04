import React from 'react';

jest.mock('@folio/stripes/core', () => {
  const STRIPES = {
    connect: (Component) => Component,
    logger: () => {},
  };
  const stripesConnect = (Component) => ({ stripes, ...rest }) => {
    const fakeStripes = {
      ...STRIPES,
      ...stripes,
    };

    return <Component {...rest} stripes={fakeStripes} />;
  };

  return {
    stripesConnect,
    stripesShape: {},
    withStripes: (Component) => (props) => <Component {...props} />,
    IfPermission: jest.fn(({ children }) => <div>{children}</div>),
    useCustomFields: jest.fn(() => []),
  };
});
