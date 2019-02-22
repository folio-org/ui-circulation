export default (server) => {
  server.get('/loan-policy-storage/loan-policies', {
    'loanPolicies': [{
      'id': 'd9cd0bed-1b49-4b5e-a7bd-064b8d177231',
      'name': 'Example Loan Policy',
      'description': 'An example loan policy',
      'loanable': true,
      'loansPolicy': {
        'profileId': 'Rolling',
        'period': {
          'duration': 1,
          'intervalId': 'Months'
        },
        'closedLibraryDueDateManagementId': 'KEEP_CURRENT_DATE',
        'existingRequestsPeriod': {
          'duration': 1,
          'intervalId': 'Weeks'
        },
        'gracePeriod': {
          'duration': 7,
          'intervalId': 'Days'
        }
      },
      'renewable': true,
      'renewalsPolicy': {
        'unlimited': true,
        'renewFromId': 'CURRENT_DUE_DATE',
        'differentPeriod': true,
        'period': {
          'duration': 30,
          'intervalId': 'Days'
        }
      },
      'metadata': {
        'createdDate': '2019-01-08T02:53:58.033+0000',
        'createdByUserId': '1d2a5d7d-e472-55a3-8da2-285ef27f7125',
        'updatedDate': '2019-01-08T02:53:58.033+0000',
        'updatedByUserId': '1d2a5d7d-e472-55a3-8da2-285ef27f7125'
      }
    }, {
      'id': '43198de5-f56a-4a53-a0bd-5a324418967a',
      'name': 'One Hour',
      'loanable': true,
      'loansPolicy': {
        'profileId': 'Rolling',
        'period': {
          'duration': 1,
          'intervalId': 'Hours'
        },
        'closedLibraryDueDateManagementId': 'KEEP_CURRENT_DATE'
      },
      'renewable': true,
      'renewalsPolicy': {
        'unlimited': false,
        'numberAllowed': 3.0,
        'renewFromId': 'SYSTEM_DATE',
        'differentPeriod': false
      },
      'metadata': {
        'createdDate': '2019-01-08T02:53:59.182+0000',
        'createdByUserId': '1d2a5d7d-e472-55a3-8da2-285ef27f7125',
        'updatedDate': '2019-01-08T02:53:59.182+0000',
        'updatedByUserId': '1d2a5d7d-e472-55a3-8da2-285ef27f7125'
      }
    }],
    'totalRecords': 2
  });
};
