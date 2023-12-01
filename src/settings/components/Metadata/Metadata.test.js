import React from 'react';
import {
  render,
  screen,
  within,
} from '@folio/jest-config-stripes/testing-library/react';

import Metadata from './Metadata';

const testIds = {
  connectedComponentTestId: 'connectedComponentTestId',
  metadataTestId: 'metadataTestId',
};

describe('Metadata', () => {
  const mockedConnect = jest.fn((Component) => {
    return class extends React.Component {
      render() {
        return (
          <Component
            data-testid={testIds.connectedComponentTestId}
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
      expect(screen.getByTestId(testIds.metadataTestId)).toBeVisible();
    });

    it('should use "connect" function on correct component', () => {
      expect(mockedConnect).toHaveBeenCalled();
      expect(screen.getByTestId(testIds.connectedComponentTestId)).toBeVisible();
    });

    it('should receive correct props', () => {
      expect(within(screen.getByTestId(testIds.connectedComponentTestId)).getByText(`${mockedMetadata.createdDate}`));
    });
  });

  describe('if "metadata" props is invalid', () => {
    it('should not render element if "metadata" not passed', () => {
      render(
        <Metadata
          connect={mockedConnect}
        />
      );

      expect(screen.queryByTestId(testIds.metadataTestId)).not.toBe();
    });

    it('should not render element if "createdDate" in "metadata" is absent', () => {
      render(
        <Metadata
          connect={mockedConnect}
          metadata={{ testData: 'testData' }}
        />
      );

      expect(screen.queryByTestId(testIds.metadataTestId)).not.toBe();
    });
  });
});
