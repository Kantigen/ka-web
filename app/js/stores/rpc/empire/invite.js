'use strict';

import { makeAutoObservable } from 'mobx';

class InviteRPCStore {
    referral_url = '';

    constructor() {
        makeAutoObservable(this);
    }

    update(result) {
        this.referral_url = result.referral_url;
    }
}

export default new InviteRPCStore();
