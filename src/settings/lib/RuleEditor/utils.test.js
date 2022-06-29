import addIndentToEditorRules from './utils';

describe('utils', () => {
  describe('addIndentToEditorRules', () => {
    const rule = 'some rule';

    describe('when position is before', () => {
      it('should add indent before', () => {
        expect(addIndentToEditorRules(rule, 'before')).toBe(` ${rule}`);
      });
    });

    describe('when position is after', () => {
      it('should add indent after', () => {
        expect(addIndentToEditorRules(rule, 'after')).toBe(`${rule} `);
      });
    });

    describe('when position is not passed', () => {
      it('should return rule', () => {
        expect(addIndentToEditorRules(rule)).toBe(rule);
      });
    });
  });
});
