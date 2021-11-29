'use strict';

var { makeAutoObservable } = require('mobx');

class OptionsWindowStore {
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

module.exports = new OptionsWindowStore();
