import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';

import '../../../../test/jest/__mock__';

import Metadata from './Metadata';

describe('Metadata', () => {
  const mockedConnect = jest.fn((Component) => {
    return class extends React.Component {
      render() {
        return (
          <Component
            data-testid="connectedComponentTestId"
            {...this.props}
          />
        );
      }
    };
  });

  describe('if "metadata" props is valid', () => {
    const mockedMetadata = {
      createdDate: 'testData',
    };

    beforeEach(() => {
      render(
        <Metadata
          connect={mockedConnect}
          metadata={mockedMetadata}
        />
      );
    });

    afterEach(() => {
      mockedConnect.mockClear();
    });

    it('should render component', () => {
      expect(screen.getByTestId('metadataTestId')).toBeVisible();
    });

    it('should use "connect" function on correct component', () => {
      expect(mockedConnect).toHaveBeenCalled();
      expect(screen.getByTestId('connectedComponentTestId')).toBeVisible();
    });

    it('should receive correct props', () => {
      expect(within(screen.getByTestId('connectedComponentTestId')).getByText(`${mockedMetadata.createdDate}`));
    });
  });

  describe('if "metadata" props is invalid', () => {
    it('should not render element if "metadata" not passed', () => {
      render(
        <Metadata
          connect={mockedConnect}
        />
      );

      expect(screen.queryByTestId('metadataTestId')).not.toBe();
    });

    it('should not render element if "createdDate" in "metadata" is absent', () => {
      render(
        <Metadata
          connect={mockedConnect}
          metadata={{ testData: 'testData' }}
        />
      );

      expect(screen.queryByTestId('metadataTestId')).not.toBe();
    });
  });
});
