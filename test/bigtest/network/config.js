// typical mirage config export
export default function config() {
  this.get('/circulation/loan-rules', {
    'id' : '4c70f818-2edc-4cf8-aa27-16c14c5c7b58',
    'loanRulesAsTextFile' : 'priority: t, s, c, b, a, m, g\nfallback-policy: 43198de5-f56a-4a53-a0bd-5a324418967a\nm 1a54b431-2e4f-452d-9cae-9cee66c9a892: d9cd0bed-1b49-4b5e-a7bd-064b8d177231',
    'loanRulesAsDrools' : 'package loanrules\nimport org.folio.circulation.loanrules.*\nglobal Match match\n\nrule \'line 2\'\n  salience 2\n  when\n  then\n    match.loanPolicyId = \'43198de5-f56a-4a53-a0bd-5a324418967a\';\n    match.lineNumber = 2;\n    drools.halt();\nend\n\nrule \'line 3\'\n  salience 210000003\n  when\n    ItemType(id == \'1a54b431-2e4f-452d-9cae-9cee66c9a892\')\n  then\n    match.loanPolicyId = \'d9cd0bed-1b49-4b5e-a7bd-064b8d177231\';\n    match.lineNumber = 3;\n    drools.halt();\nend\n\n'
  });

  this.get('/groups', {
    'usergroups': [{
      'group': 'alumni_1383',
      'desc': 'Alumni',
      'id': 'group1',
    }, {
      'group': 'alumni_2121',
      'desc': 'Alumni',
      'id': 'group2',
    }, {
      'group': 'alumni_6422',
      'desc': 'Alumni',
      'id': 'group3',
    }, {
      'group': 'faculty',
      'desc': 'Faculty Member',
      'id': 'group4',
    }, {
      'group': 'graduate',
      'desc': 'Graduate Student',
      'id': 'group5',
    }, {
      'group': 'staff',
      'desc': 'Staff Member',
      'id': 'group6',
    }, {
      'group': 'undergrad',
      'desc': 'Undergraduate Student',
      'id': 'group7',
    }],
    'totalRecords': 7
  });

  this.get('/material-types', {
    'mtypes' : [{
      'id' : '1a54b431-2e4f-452d-9cae-9cee66c9a892',
      'name' : 'book',
      'source' : 'folio',
    }, {
      'id' : '71fbd940-1027-40a6-8a48-49b44d795e46',
      'name' : 'unspecified',
      'source' : 'folio',
      'metadata' : {
        'createdDate' : '2019-01-08T02:49:41.528+0000',
        'createdByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125',
        'updatedDate' : '2019-01-08T02:49:41.528+0000',
        'updatedByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125'
      }
    }, {
      'id' : '615b8413-82d5-4203-aa6e-e37984cb5ac3',
      'name' : 'electronic resource',
      'source' : 'folio',
      'metadata' : {
        'createdDate' : '2019-01-08T02:49:42.616+0000',
        'createdByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125',
        'updatedDate' : '2019-01-08T02:49:42.616+0000',
        'updatedByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125'
      }
    }, {
      'id' : '5ee11d91-f7e8-481d-b079-65d708582ccc',
      'name' : 'dvd',
      'source' : 'folio',
      'metadata' : {
        'createdDate' : '2019-01-08T02:49:43.703+0000',
        'createdByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125',
        'updatedDate' : '2019-01-08T02:49:43.703+0000',
        'updatedByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125'
      }
    }, {
      'id' : '30b3e36a-d3b2-415e-98c2-47fbdf878862',
      'name' : 'video recording',
      'source' : 'folio',
      'metadata' : {
        'createdDate' : '2019-01-08T02:49:44.788+0000',
        'createdByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125',
        'updatedDate' : '2019-01-08T02:49:44.788+0000',
        'updatedByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125'
      }
    }, {
      'id' : 'fd6c6515-d470-4561-9c32-3e3290d4ca98',
      'name' : 'microform',
      'source' : 'folio',
      'metadata' : {
        'createdDate' : '2019-01-08T02:49:45.937+0000',
        'createdByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125',
        'updatedDate' : '2019-01-08T02:49:45.937+0000',
        'updatedByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125'
      }
    }, {
      'id' : 'd9acad2f-2aac-4b48-9097-e6ab85906b25',
      'name' : 'text',
      'source' : 'folio',
      'metadata' : {
        'createdDate' : '2019-01-08T02:49:47.013+0000',
        'createdByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125',
        'updatedDate' : '2019-01-08T02:49:47.013+0000',
        'updatedByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125'
      }
    }, {
      'id' : 'dd0bf600-dbd9-44ab-9ff2-e2a61a6539f1',
      'name' : 'sound recording',
      'source' : 'folio',
      'metadata' : {
        'createdDate' : '2019-01-08T02:49:48.111+0000',
        'createdByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125',
        'updatedDate' : '2019-01-08T02:49:48.111+0000',
        'updatedByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125'
      }
    }],
    'totalRecords' : 8
  });

  this.get('/loan-types', {
    'loantypes': [{
      'id' : 'e8b311a6-3b21-43f2-a269-dd9310cb2d0e',
      'name' : 'Course reserves',
      'metadata' : {
        'createdDate' : '2019-01-08T02:49:27.012+0000',
        'createdByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125',
        'updatedDate' : '2019-01-08T02:49:27.012+0000',
        'updatedByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125'
      }
    }, {
      'id' : '2e48e713-17f3-4c13-a9f8-23845bb210a4',
      'name' : 'Reading room',
      'metadata' : {
        'createdDate' : '2019-01-08T02:49:28.138+0000',
        'createdByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125',
        'updatedDate' : '2019-01-08T02:49:28.138+0000',
        'updatedByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125'
      }
    }, {
      'id' : '2b94c631-fca9-4892-a730-03ee529ffe27',
      'name' : 'Can circulate',
      'metadata' : {
        'createdDate' : '2019-01-08T02:49:29.213+0000',
        'createdByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125',
        'updatedDate' : '2019-01-08T02:49:29.213+0000',
        'updatedByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125'
      }
    }, {
      'id' : 'a1dc1ce3-d56f-4d8a-b498-d5d674ccc845',
      'name' : 'Selected',
      'metadata' : {
        'createdDate' : '2019-01-08T02:49:30.288+0000',
        'createdByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125',
        'updatedDate' : '2019-01-08T02:49:30.288+0000',
        'updatedByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125'
      }
    }],
    'totalRecords' : 4
  });

  this.get('/loan-policy-storage/loan-policies', {
    'loanPolicies' : [{
      'id' : 'd9cd0bed-1b49-4b5e-a7bd-064b8d177231',
      'name' : 'Example Loan Policy',
      'description' : 'An example loan policy',
      'loanable' : true,
      'loansPolicy' : {
        'profileId' : 'Rolling',
        'period' : {
          'duration' : 1,
          'intervalId' : 'Months'
        },
        'closedLibraryDueDateManagementId' : 'KEEP_CURRENT_DATE',
        'existingRequestsPeriod' : {
          'duration' : 1,
          'intervalId' : 'Weeks'
        },
        'gracePeriod' : {
          'duration' : 7,
          'intervalId' : 'Days'
        }
      },
      'renewable' : true,
      'renewalsPolicy' : {
        'unlimited' : true,
        'renewFromId' : 'CURRENT_DUE_DATE',
        'differentPeriod' : true,
        'period' : {
          'duration' : 30,
          'intervalId' : 'Days'
        }
      },
      'metadata' : {
        'createdDate' : '2019-01-08T02:53:58.033+0000',
        'createdByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125',
        'updatedDate' : '2019-01-08T02:53:58.033+0000',
        'updatedByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125'
      }
    }, {
      'id' : '43198de5-f56a-4a53-a0bd-5a324418967a',
      'name' : 'One Hour',
      'loanable' : true,
      'loansPolicy' : {
        'profileId' : 'Rolling',
        'period' : {
          'duration' : 1,
          'intervalId' : 'Hours'
        },
        'closedLibraryDueDateManagementId' : 'KEEP_CURRENT_DATE'
      },
      'renewable' : true,
      'renewalsPolicy' : {
        'unlimited' : false,
        'numberAllowed' : 3.0,
        'renewFromId' : 'SYSTEM_DATE',
        'differentPeriod' : false
      },
      'metadata' : {
        'createdDate' : '2019-01-08T02:53:59.182+0000',
        'createdByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125',
        'updatedDate' : '2019-01-08T02:53:59.182+0000',
        'updatedByUserId' : '1d2a5d7d-e472-55a3-8da2-285ef27f7125'
      }
    }],
    'totalRecords' : 2
  });
}
