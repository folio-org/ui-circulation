// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
import { loanProfileMap, renewFromIds, CURRENT_DUE_DATE_TIME } from '@folio/circulation/src/constants';
import testLoanPolicySettings from '../../constants/testLoanPolicySettings';

export default (server) => {
  server.create('loanPolicy', {
    id: testLoanPolicySettings.id,
    name: testLoanPolicySettings.name,
    renewable: true,
    loanable: true,
    loansPolicy: {
      profileId: loanProfileMap.ROLLING,
      period: {
        duration: 1,
        intervalId: 'Hours',
      },
      itemLimit: 22,
      closedLibraryDueDateManagementId: CURRENT_DUE_DATE_TIME,
    },
    renewalsPolicy: {
      unlimited: false,
      numberAllowed: 666,
      renewFromId: renewFromIds.SYSTEM_DATE,
    },
  });
};
