import { makeAutoObservable } from 'mobx';

class SessionStore {
  session = '';

  constructor() {
    makeAutoObservable(this);
  }

  update(session: string) {
    this.session = session;
  }
}

export default new SessionStore();
