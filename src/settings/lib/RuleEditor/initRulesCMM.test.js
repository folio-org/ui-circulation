import React from 'react';

import { EDITOR_SPECIAL_SYMBOL } from '../../../constants';
import { hooks } from './initRulesCMM';

describe('initRulesCMM', () => {
  describe('hooks', () => {
    describe('hash', () => {
      it('should work correctly', () => {
        const stream = {
          eatWhile: jest.fn(),
        };
        const state = {};

        expect(hooks[EDITOR_SPECIAL_SYMBOL.HASH](stream, state)).toBe('ruleName');
        expect(state.ruleLine).toBe(true);
        expect(String(stream.eatWhile.mock.calls[0][0])).toBe(String(/[^/]/));
      });
    });

    describe('slash', () => {
      it('should work correctly', () => {
        const stream = {
          skipToEnd: jest.fn(),
        };

        expect(hooks[EDITOR_SPECIAL_SYMBOL.SLASH](stream)).toBe('comment');
        expect(stream.skipToEnd).toHaveBeenCalled();
      });
    });

    describe('comma', () => {
      it('should work correctly', () => {
        const stream = {
          eatWhile: jest.fn(),
        };

        expect(hooks[EDITOR_SPECIAL_SYMBOL.COMMA](stream)).toBe('comma');
        expect(String(stream.eatWhile.mock.calls[0][0])).toBe(String(/\s/));
      });
    });

    describe('plus', () => {
      it('should work correctly', () => {
        const stream = {
          eatWhile: jest.fn(),
        };

        expect(hooks[EDITOR_SPECIAL_SYMBOL.PLUS](stream)).toBe('and');
        expect(String(stream.eatWhile.mock.calls[0][0])).toBe(String(/\s/));
      });
    });

    describe('colon', () => {
      it('should work correctly', () => {
        const stream = {
          eatWhile: jest.fn(),
        };
        const state = {};

        hooks[EDITOR_SPECIAL_SYMBOL.COLON](stream, state);

        expect(String(stream.eatWhile.mock.calls[0][0])).toBe(String(/\s/));
        expect(state.rValue).toBe(true);
        expect(state.keyProperty).toBe(null);
      });
    });

    describe('negation', () => {
      it('should work correctly', () => {
        const stream = {
          eatWhile: jest.fn(),
        };

        expect(hooks[EDITOR_SPECIAL_SYMBOL.NEGATION](stream)).toBe('not');
        expect(String(stream.eatWhile.mock.calls[0][0])).toBe(String(/\s/));
      });
    });
  });
});
