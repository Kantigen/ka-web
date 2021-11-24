'use strict';

const { makeAutoObservable } = require('mobx');

class InviteRPCStore {
    referralUrl = '';

    constructor() {
        makeAutoObservable(this);
    }
}

module.exports = new InviteRPCStore();
