import testLostItemFeePolicySettings from '../../constants/testLostItemFeePolicySettings';

export default (server) => {
  server.get('/lost-item-fees-policies', function ({ lostItemFeePolicies }) {
    return server.serializerOrRegistry.serialize(lostItemFeePolicies.all());
  });

  server.post('/lost-item-fees-policies', ({ lostItemFeePolicies }, request) => {
    const body = JSON.parse(request.requestBody);
    const lostItemFeePolicy = lostItemFeePolicies.create(body);

    return lostItemFeePolicy.attrs;
  });

  server.put('/lost-item-fees-policies/:id', ({ lostItemFeePolicies }, request) => {
    const {
      id,
      name,
      description,
    } = JSON.parse(request.requestBody);
    const lostItemFeePolicy = lostItemFeePolicies.find(id);

    lostItemFeePolicy.update({ name, description });

    return lostItemFeePolicy.attrs;
  });

  server.delete('/lost-item-fees-policies/:id', ({ lostItemFeePolicies }, request) => {
    const {
      params: {
        id
      }
    } = request;
    const lostItemFeePolicy = lostItemFeePolicies.find(id);

    return lostItemFeePolicy.destroy();
  });

  server.create('lostItemFeePolicy', {
    id: testLostItemFeePolicySettings.id,
    name: testLostItemFeePolicySettings.name
  });
};
