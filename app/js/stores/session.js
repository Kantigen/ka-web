'use strict';

const { makeAutoObservable } = require('mobx');

class SessionStore {
    session = '';

    constructor() {
        makeAutoObservable(this);
    }

    update(session) {
        this.session = session;
    }
}

module.exports = new SessionStore();
