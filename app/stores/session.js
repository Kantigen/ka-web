import { makeAutoObservable } from 'mobx';

class SessionStore {
    session = '';

    constructor() {
        makeAutoObservable(this);
    }

    update(session) {
        this.session = session;
    }
}

export default new SessionStore();
