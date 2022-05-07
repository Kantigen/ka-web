import ClientBase from 'app/client/base';
import { BodyGetStatusResponse } from 'app/interfaces';

class Body extends ClientBase {
  getStatus(id: number): Promise<BodyGetStatusResponse> {
    return this.call('body', 'get_status', [id]);
  }
}

export default new Body();
