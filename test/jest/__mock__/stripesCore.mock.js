import React from 'react';

jest.mock('@folio/stripes/core', () => ({
  stripesConnect: jest.fn((component) => component),
}));
