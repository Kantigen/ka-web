import ClientBase from 'app/client/base';

class Body extends ClientBase {
  getStatus(id: number) {
    return this.call('body', 'get_status', [id]);
  }
}

export default new Body();
