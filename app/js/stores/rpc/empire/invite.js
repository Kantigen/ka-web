'use strict';

const { makeAutoObservable } = require('mobx');

class InviteRPCStore {
    referral_url = '';

    constructor() {
        makeAutoObservable(this);
    }

    update(result) {
        this.referral_url = result.referral_url;
    }
}

module.exports = new InviteRPCStore();
