import { makeAutoObservable } from 'mobx';

class CaptchaRPCStore {
  guid = '';

  url = '';

  solved = '';

  window = '';

  constructor() {
    makeAutoObservable(this);
  }

  clear() {
    this.guid = '';
    this.url = '';
    this.solved = '';
    this.window = '';
  }
}

export default new CaptchaRPCStore();
