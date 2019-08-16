export default str => str
  .replace(/^\W+/, '')
  .replace(/\W+$/, '')
  .replace(/\W+/g, '-');
