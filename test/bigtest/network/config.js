// typical mirage config export
export default function config() {
  this.get('/circulation/rules', {
    'id' : '4c70f818-2edc-4cf8-aa27-16c14c5c7b58',
    'rulesAsText': 'priority: t, s, c, b, a, m, g\nfallback-policy: m 1a54b431-2e4f-452d-9cae-9cee66c9a892 :l d9cd0bed-1b49-4b5e-a7bd-064b8d177231 r 1a29c562-d725-4a28-a071-24fdfd23a990 n 1e5cb907-2dfd-4529-a8d8-0ba1cd86dd87'
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

  this.get('/fixed-due-date-schedule-storage/fixed-due-date-schedules', {
    fixedDueDateSchedules: [],
    totalRecords: 0,
  });

  this.get('/templates', {
    templates: [],
    totalRecords: 0,
  });

  this.get('/users', {
    users: [
      {
        active: true,
        createdDate: '2019-01-30T01:54:56.642+0000',
        id: '2aec72a0-33b2-5fd2-a502-f4b8b8efb5fa',
        personal: {
          lastName: 'ADMINISTRATOR',
          firstName: 'DIKU',
          email: 'admin@diku.example.org',
          addresses: []
        },
        addresses: [],
        email: 'admin@diku.example.org',
        firstName: 'DIKU',
        lastName: 'ADMINISTRATOR',
        proxyFor: [],
        updatedDate: '2019-01-30T01:54:56.642+0000',
        username: 'diku_admin',
      }
    ]
  });
  this.get('/templates', function ({ templates }) {
    return this.serializerOrRegistry.serialize(templates.all());
  });

  this.get('/request-policy-storage/request-policies', function ({ requestPolicies }) {
    return this.serializerOrRegistry.serialize(requestPolicies.all());
  });

  this.get('/loan-policy-storage/loan-policies', function ({ loanPolicies }) {
    return this.serializerOrRegistry.serialize(loanPolicies.all());
  });

  this.get('/patron-notice-policy-storage/patron-notice-policies', ({ patronNoticePolicies }) => {
    return this.serializerOrRegistry.serialize(patronNoticePolicies.all());
  });

  this.post('/request-policy-storage/request-policies', ({ requestPolicies }, request) => {
    const body = JSON.parse(request.requestBody);
    const requestPolicy = requestPolicies.create(body);
    return requestPolicy.attrs;
  });

  this.post('/loan-policy-storage/loan-policies', ({ loanPolicies }, request) => {
    const body = JSON.parse(request.requestBody);
    const loanPolicy = loanPolicies.create(body);
    return loanPolicy.attrs;
  });

  this.put('/loan-policy-storage/loan-policies/:id', ({ loanPolicies }, request) => {
    const { id, name, description } = JSON.parse(request.requestBody);
    const loanPolicy = loanPolicies.find(id);
    loanPolicy.update({ name, description });
    return loanPolicy.attrs;
  });

  this.put('/patron-notice-policy-storage/patron-notice-policies/:id', ({ patronNoticePolicies }, request) => {
    const { id, name, description } = JSON.parse(request.requestBody);
    const patronNoticePolicy = patronNoticePolicies.find(id);
    patronNoticePolicy.update({ name, description });
    return patronNoticePolicy.attrs;
  });

  this.delete('/patron-notice-policy-storage/patron-notice-policies/:id', ({ patronNoticePolicies }, request) => {
    const { params: { id } } = request;
    const patronNoticePolicy = patronNoticePolicies.find(id);

    return patronNoticePolicy.destroy();
  });

  this.delete('/loan-policy-storage/loan-policies/:id', ({ loanPolicies }, request) => {
    const { params: { id } } = request;
    const loanPolicy = loanPolicies.find(id);

    return loanPolicy.destroy();
  });

  this.put('/request-policy-storage/request-policies/:id', ({ requestPolicies }, request) => {
    const body = JSON.parse(request.requestBody);
    const { name, description } = body;
    const requestPolicy = requestPolicies.find(body.id);
    requestPolicy.update({ name, description });
    return requestPolicy.attrs;
  });
}
