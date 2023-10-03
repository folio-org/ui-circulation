import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';
import PropTypes from 'prop-types';

import withPreventDelete from './withPreventDelete';

const policyInUse = 'Policy is in use!';
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
      <span>{policyInUse}</span>
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
const labelIds = {
  commonClose: 'ui-circulation.settings.common.close',
  denyDeleteHeader: 'ui-circulation.settings.test.denyDelete.header',
  denyDeleteBody: 'ui-circulation.settings.policy.denyDelete.body',
};

describe('withPreventDelete', () => {
  it('passes in props', () => {
    renderWithPreventDelete();
    expect(screen.getByText(labelIds.commonClose)).toBeInTheDocument();
    expect(screen.getByText(labelIds.denyDeleteHeader)).toBeInTheDocument();
    expect(screen.getByText(labelIds.denyDeleteBody)).toBeInTheDocument();
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
      expect(screen.getByText(policyInUse)).toBeInTheDocument();
    });

    it('does not say policy is in use if there are no records', () => {
      renderWithPreventDelete();
      const policyText = screen.queryByText(policyInUse);
      expect(policyText).toBeNull();
    });
  });
});
