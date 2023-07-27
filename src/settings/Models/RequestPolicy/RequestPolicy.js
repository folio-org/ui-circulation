import { Metadata } from '../common';

export default class RequestPolicy {
  static defaultPolicy() {
    return { requestTypes: [] };
  }

  constructor(policy = {}) {
    this.id = policy.id;
    this.name = policy.name;
    this.description = policy.description;
    this.requestTypes = policy.requestTypes;
    this.allowedServicePoints = policy.allowedServicePoints;
    this.metadata = new Metadata(policy.metadata);
  }
}
