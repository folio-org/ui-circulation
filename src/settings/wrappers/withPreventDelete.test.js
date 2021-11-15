import React from 'react';
import {
 render,
  screen,
} from '@testing-library/react';

import { StripesContext } from '@folio/stripes-core/src/StripesContext';
import '../../../test/jest/__mock__';
import {
  useStripes,
} from '@folio/stripes/core';

import withPreventDelete from './withPreventDelete';

const stripes = useStripes();
const mockComponent = ({ location, closeText, mutator, resources }) => <span>{closeText}</span>

jest.mock('stripes-config', () => (
  {
    modules: [],
    metadata: {},
  }
),
{ virtual: true });

const mutator = {
  selectedPolicyId: {
    replace: jest.fn(),
  }
}

const resources = {}

const props = {
  location: {
    pathname: 'policies'
  },
  mutator,
  resources,
 // stripes: buildStripes({ hasPerm: () => true }),
}

const WrappedComponent = withPreventDelete(mockComponent, 'test');
console.log("TESTING TESTING", typeof(WrappedComponent))
const renderWithPreventDelete = (props) => render(<WrappedComponent {...props} />)

describe('withPreventDelete', () => {
  // let component = mockComponent()
  // beforeEach(() => {
  //   const stripes = useStripes();
  //   return render(
  //     <StripesContext.Provider value={stripes}>
  //       {withPreventDelete(mockComponent('test'))}
  //     </StripesContext.Provider>
  //   )
  // });

  it('', () => {
    expect(true).toBe(true)
  });

  it('passes in props', () => {
    renderWithPreventDelete(props);
    expect(screen.getByText('ui-circulation.settings.common.close')).toBeInTheDocument()
  })
});
