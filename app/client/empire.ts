import ClientBase from 'app/client/base';

class Empire extends ClientBase {
  async getStatus() {
    return this.call('empire', 'get_status', []);
  }

  async logout() {
    return this.call('empire', 'logout', []);
  }
}

export default new Empire();
