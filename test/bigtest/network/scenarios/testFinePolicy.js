import testFinePolicySettings from '../../constants/testFinePolicySettings';

export default (server) => {
  server.get('/overdue-fines-policies', function ({ overdueFinePolicies }) {
    return server.serializerOrRegistry.serialize(overdueFinePolicies.all());
  });

  server.post('/overdue-fines-policies', ({ overdueFinePolicies }, request) => {
    const body = JSON.parse(request.requestBody);
    const finePolicy = overdueFinePolicies.create(body);

    return finePolicy.attrs;
  });

  server.put('/overdue-fines-policies/:id', ({ overdueFinePolicies }, request) => {
    const {
      id,
      name,
      description,
    } = JSON.parse(request.requestBody);
    const finePolicy = overdueFinePolicies.find(id);

    finePolicy.update({ name, description });

    return finePolicy.attrs;
  });

  server.delete('/overdue-fines-policies/:id', ({ overdueFinePolicies }, request) => {
    const {
      params: {
        id
      }
    } = request;
    const finePolicy = overdueFinePolicies.find(id);

    return finePolicy.destroy();
  });

  server.create('overdueFinePolicy', {
    id: testFinePolicySettings.id,
    name: testFinePolicySettings.name,
    overdueFine: { quantity: 2, intervalId: 'day' },
    maxOverdueFine: 2,
    overdueRecallFine: { quantity: 2, intervalId: 'day' },
    maxOverdueRecallFine: 3
  });
};
