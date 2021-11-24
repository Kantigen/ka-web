'use strict';

const { makeAutoObservable } = require('mobx');

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

module.exports = new CaptchaRPCStore();
