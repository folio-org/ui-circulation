import React from 'react';
import { render } from '@testing-library/react';

import '../../../../test/jest/__mock__';

import RulesEditor from './RulesEditor';
import RulesField from './RulesField';

jest.mock('./RulesEditor', () => jest.fn(() => null));

describe('RulesField', () => {
  const testInput = {
    value: 'testValue',
    onChange: jest.fn(),
  };
  const testOtherProp = 'testValue';
  const testDefaultProps = {
    input: testInput,
    testOtherProp,
  };

  afterEach(() => {
    RulesEditor.mockClear();
  });

  describe('with default props', () => {
    beforeEach(() => {
      render(
        <RulesField {...testDefaultProps} />
      );
    });

    it('should render RulesEditor component', () => {
      expect(RulesEditor).toHaveBeenCalledWith({
        code: testInput.value,
        onChange: testInput.onChange,
        testOtherProp,
      }, {});
    });
  });
});
