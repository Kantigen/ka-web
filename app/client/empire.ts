import ClientBase from 'app/client/base';
import constants from 'app/constants';
import { EmpireCreateParams } from 'app/interfaces';

class Empire extends ClientBase {
  async getStatus() {
    return this.call('empire', 'get_status', []);
  }

  async create(empire: EmpireCreateParams) {
    return this.call('empire', 'create', empire);
  }

  async fetchCaptcha() {
    return this.call('empire', 'fetch_captcha', [], false);
  }

  async login(empireName: string, password: string, browserFingerprint: string) {
    return this.call(
      'empire',
      'login',
      {
        name: empireName,
        password,
        browser: browserFingerprint,
        api_key: constants.API_KEY,
      },
      false
    );
  }

  async logout() {
    return this.call('empire', 'logout', []);
  }
}

export default new Empire();
