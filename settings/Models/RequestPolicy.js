import { Metadata } from './common';

export default class RequestPolicy {
  static defaultPolicy() {
    return {};
  }

  constructor(policy = {}) {
    this.id = policy.id;
    this.name = policy.name;
    this.descrition = policy.descrition;
    this.metadata = new Metadata(policy.metadata);
  }
}
