import ClientBase from 'app/services/base';

class CaptchaService extends ClientBase {
  fetch() {
    return this.call('captcha', 'fetch', []);
  }

  solve(guid: string, solution: string) {
    return this.call('captcha', 'solve', { guid, solution });
  }
}

export default new CaptchaService();
