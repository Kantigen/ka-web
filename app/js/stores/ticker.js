'use strict';

//
// This is just a basic store that updates once a second.
// Useful for views which require a frequent update, e.g
// server clock or menu bars that show resource changes.
//

const { makeAutoObservable } = require('mobx');
const _ = require('lodash');
const BoostsRPCStore = require('app/js/stores/rpc/empire/boosts');
const EmpireRPCStore = require('app/js/stores/rpc/empire');
const ServerRPCStore = require('app/js/stores/rpc/server');
const BodyRPCStore = require('app/js/stores/rpc/body');

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

module.exports = new TickerStore();
