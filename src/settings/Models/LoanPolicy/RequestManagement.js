import Recalls from './Recalls';
import Holds from './Holds';

class RequestManagement {
  constructor({ recalls, holds } = {}) {
    this.recalls = new Recalls(recalls);
    this.holds = new Holds(holds);
  }
}

export default RequestManagement;
