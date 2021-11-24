'use strict';

const { makeAutoObservable } = require('mobx');

class MailWindowStore {
    shown = false;

    constructor() {
        makeAutoObservable(this);
    }

    show() {
        this.shown = true;
    }

    hide() {
        this.shown = false;
    }
}

module.exports = new MailWindowStore();
