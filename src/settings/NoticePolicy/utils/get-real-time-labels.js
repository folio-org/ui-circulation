export const REAL_TIME_NOTICES_TRANSLATION_KEYS = {
  feeFineNotices: {
    longTerm: 'ui-circulation.settings.noticePolicy.feeFineNotices.realTime.longTerm',
    shortTerm: 'ui-circulation.settings.noticePolicy.feeFineNotices.realTime.shortTerm',
  },
  loanNotices: {
    longTerm: 'ui-circulation.settings.noticePolicy.notices.send.longTerm',
    shortTerm: 'ui-circulation.settings.noticePolicy.notices.send.shortTerm',
  },
};

export default (isLostItemFees) => (isLostItemFees ?
  REAL_TIME_NOTICES_TRANSLATION_KEYS.feeFineNotices :
  REAL_TIME_NOTICES_TRANSLATION_KEYS.loanNotices);
