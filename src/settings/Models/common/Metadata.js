export default class Metadata {
  constructor(metadata = {}) {
    this.createdByUserId = metadata.createdByUserId;
    this.createdDate = metadata.createdDate;
    this.updatedByUserId = metadata.updatedByUserId;
    this.updatedDate = metadata.updatedDate;
  }
}
