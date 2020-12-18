import { describe, it } from '@bigtest/mocha';
import { expect } from 'chai';

import setupApplication from '../../helpers/setup-application';
import { setSendHowValue } from '../../../../src/settings/NoticePolicy/utils/normalize';

describe('Utility functions', () => {
  setupApplication();

  describe('Set sendHow value for feeFine notices', () => {
    it('should set sendHow property if it does not exist', () => {
      const policy = {
        name: 'Test',
        active: true,
        feeFineNotices: [
          {
            format: 'Email',
            realTime: true,
            templateId: 'templateId',
            sendOptions: {
              sendWhen: 'Aged to lost & item returned - fine adjusted',
            }
          },
        ],
      };

      const expectedResult = {
        name: 'Test',
        active: true,
        feeFineNotices: [
          {
            format: 'Email',
            realTime: true,
            templateId: 'templateId',
            sendOptions: {
              sendWhen: 'Aged to lost & item returned - fine adjusted',
              sendHow: 'Upon At'
            }
          },
        ],
      };

      expect(setSendHowValue('feeFineNotices', policy)).to.eql(expectedResult);
    });

    it('should not change sendHow if it exists', () => {
      const policy = {
        name: 'Test',
        active: true,
        feeFineNotices: [
          {
            format: 'Email',
            realTime: true,
            templateId: 'templateId',
            sendOptions: {
              sendWhen: 'Aged to lost - fine charged',
              sendHow: 'Upon At',
            }
          },
        ],
      };

      expect(setSendHowValue('feeFineNotices', policy)).to.eql(policy);
    });
  });
});
