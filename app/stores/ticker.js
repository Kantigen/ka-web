//
// This is just a basic store that updates once a second.
// Useful for views which require a frequent update, e.g
// server clock or menu bars that show resource changes.
//

import { makeAutoObservable } from 'mobx';
import _ from 'lodash';
import BoostsRPCStore from 'app/stores/rpc/empire/boosts';
import EmpireRPCStore from 'app/stores/rpc/empire';
import ServerRPCStore from 'app/stores/rpc/server';
import BodyRPCStore from 'app/stores/rpc/body';

const INTERVAL_TIME = 1000;

class TickerStore {
    ticking = false;
    interval = _.noop;
    clockTicks = 0;

    constructor() {
        makeAutoObservable(this);
    }

    tick() {
        this.clockTicks += 1;
        BoostsRPCStore.tick();
        BodyRPCStore.tick();
        EmpireRPCStore.tick();
        ServerRPCStore.tick();
    }

    start() {
        if (!this.ticking) {
            this.interval = setInterval(() => this.tick(), INTERVAL_TIME);
            this.ticking = true;
        }
    }

    stop() {
        if (this.ticking) {
            clearInterval(this.interval);
            this.ticking = false;
        }
    }
}

export default new TickerStore();
