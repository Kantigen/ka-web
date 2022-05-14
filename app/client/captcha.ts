import ClientBase from 'app/client/base';

class Captcha extends ClientBase {
  fetch() {
    return this.call('captcha', 'fetch', []);
  }

  solve(guid: string, solution: string) {
    return this.call('captcha', 'solve', { guid, solution });
  }
}

export default new Captcha();
