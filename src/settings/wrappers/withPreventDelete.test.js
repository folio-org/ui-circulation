import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import PropTypes from 'prop-types';

import '../../../test/jest/__mock__';

import withPreventDelete from './withPreventDelete';

const mockComponent = ({
  checkPolicy,
  closeText,
  labelText,
  messageText,
}) => (
  <>
    <span>{closeText}</span>
    <span>{labelText}</span>
    <span>{messageText}</span>
    {checkPolicy() &&
      <span>Policy is in use!</span>
    }
  </>
);

mockComponent.propTypes = {
  checkPolicy: PropTypes.func.isRequired,
  closeText: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  messageText: PropTypes.string.isRequired,
};

const mutator = {
  selectedPolicyId: {
    replace: jest.fn(),
  }
};

const props = {
  location: {
    pathname: 'policies'
  },
  mutator,
  resources: {
    loans: {
      isLoading: false,
      records: []
    }
  }
};

const WrappedComponent = withPreventDelete(mockComponent, 'test');
const renderWithPreventDelete = (extraProps = {}) => render(<WrappedComponent {...props} {...extraProps} />);

describe('withPreventDelete', () => {
  it('passes in props', () => {
    renderWithPreventDelete();
    expect(screen.getByText('ui-circulation.settings.common.close')).toBeInTheDocument();
    expect(screen.getByText('ui-circulation.settings.test.denyDelete.header')).toBeInTheDocument();
    expect(screen.getByText('ui-circulation.settings.policy.denyDelete.body')).toBeInTheDocument();
  });

  describe('Checking policy in use', () => {
    it('says a policy is in use if there are loan records', () => {
      const overrideResources = {
        resources: {
          loans: {
            isLoading: false,
            records: ['a', 'b']
          }
        }
      };
      renderWithPreventDelete(overrideResources);
      expect(screen.getByText('Policy is in use!')).toBeInTheDocument();
    });

    it('does not say policy is in use if there are no records', () => {
      renderWithPreventDelete();
      const policyText = screen.queryByText('Policy is in use!');
      expect(policyText).toBeNull();
    });
  });
});
