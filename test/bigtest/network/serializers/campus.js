import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  serialize(collecton) {
    const campuses = collecton.models.map(m => m.attrs);
    return {
      loccamps: campuses,
      totalRecords: campuses.length,
    };
  }
});
