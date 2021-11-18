import { noop } from 'lodash';

const buildStripes = (otherProperties = {}) => ({
  hasPerm: noop,
  hasInterface: noop,
  clone: noop,
  logger: { log: noop },
  store: {
    getState: noop,
    dispatch: noop,
    subscirbe: noop,
    replaceReducer: noop,
  },
  epics: {
    add: noop,
    middleware: noop,
  },
  config: {},
  okapi: {
    url: '',
    tenant: '',
  },
  locale: 'en-US',
  withOkapi: true,
  setToken: noop,
  actionNames: [],
  setLocale: noop,
  setTimezone: noop,
  setCurrency: noop,
  setSinglePlugin: noop,
  setBindings: noop,
  user: {
    id: 'userTestId',
    username: 'diku_admin',
  },
  connect: jest.fn((component) => component),
  timezone: 'testTimeZone',
  ...otherProperties,
});

export default buildStripes;
