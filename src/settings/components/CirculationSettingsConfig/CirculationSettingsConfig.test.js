import {
  render,
  screen,
  fireEvent,
} from '@folio/jest-config-stripes/testing-library/react';

import CirculationSettingsConfig, {
  getPath,
} from './CirculationSettingsConfig';

const mockMutator = {
  settings: {
    POST: jest.fn(() => Promise.resolve()),
    PUT: jest.fn(() => Promise.resolve()),
  },
};

const mockResources = {
  settings: {
    hasLoaded: true,
    records: [{
      id: 'id1',
      value: {
        foo: 'bar',
      },
    }],
  },
};

const labelIds = {
  saveButton: 'saveButton',
  label: 'label',
};

const MockForm = ({ initialValues, onSubmit, label, children }) => (
  <form onSubmit={e => { e.preventDefault(); onSubmit(initialValues); }}>
    <div data-testid="label">{label}</div>
    <button type="submit">{labelIds.saveButton}</button>
    {children}
  </form>
);

describe('CirculationSettingsConfig', () => {
  it('should renders form with initial values and label', () => {
    render(
      <CirculationSettingsConfig
        configFormComponent={MockForm}
        configName="testConfig"
        label={labelIds.label}
        mutator={mockMutator}
        resources={mockResources}
        stripes={{ connect: jest.fn() }}
      />
    );

    expect(screen.getByTestId('label')).toHaveTextContent(labelIds.label);
  });

  it('should calls onBeforeSave and mutator on submit', async () => {
    const onBeforeSave = jest.fn(data => ({ ...data, extra: 'value' }));

    render(
      <CirculationSettingsConfig
        configFormComponent={MockForm}
        configName="testConfig"
        label={labelIds.label}
        mutator={mockMutator}
        resources={mockResources}
        stripes={{ connect: jest.fn() }}
        onBeforeSave={onBeforeSave}
      />
    );

    fireEvent.click(screen.getByText(labelIds.saveButton));

    expect(onBeforeSave).toHaveBeenCalledWith({ foo: 'bar' });
    expect(mockMutator.settings.PUT).toHaveBeenCalledWith(expect.objectContaining({
      value: { foo: 'bar', extra: 'value' },
    }));
  });

  it('should calls mutator with original data if onBeforeSave is not provided', () => {
    render(
      <CirculationSettingsConfig
        configFormComponent={MockForm}
        configName="testConfig"
        label={labelIds.label}
        mutator={mockMutator}
        resources={mockResources}
        stripes={{ connect: jest.fn() }}
      />
    );

    fireEvent.click(screen.getByText(labelIds.saveButton));

    expect(mockMutator.settings.PUT).toHaveBeenCalledWith(expect.objectContaining({
      value: { foo: 'bar' },
    }));
  });
});

describe('getPath', () => {
  it('should returns correct path', () => {
    const props = {
      configName: 'myConfig',
    };

    expect(getPath(null, null, null, null, props)).toBe('circulation/settings?query=(name==myConfig)');
  });
});
