import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  serialize(...args) {
    const json = ApplicationSerializer.prototype.serialize.apply(this, args);
    console.log(json);
    json.totalRecords = json.staffSlips.length;
    return json;
  }
});
