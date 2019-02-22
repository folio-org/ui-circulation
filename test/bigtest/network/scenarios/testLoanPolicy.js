// eslint-disable-next-line import/no-extraneous-dependencies
import { loanProfileMap } from '@folio/circulation/src/constants';
import testLoanPolicySettings from '../../constants/testLoanPolicySettings';

export default (server) => {
  server.create('loanPolicy', {
    id: testLoanPolicySettings.id,
    name: testLoanPolicySettings.name,
    renewable: true,
    loanable: true,
    loansPolicy: {
      profileId: loanProfileMap.ROLLING,
    },
    renewalsPolicy: {
      unlimited: false,
      numberAllowed: 666,
    },
  });
};
