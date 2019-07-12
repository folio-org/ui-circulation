export default (server) => {
  server.createList('payments', 3);

  server.get('/payments');
};
