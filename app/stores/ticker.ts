//
// This is just a basic store that updates once a second.
// Useful for views which require a frequent update, e.g
// server clock or menu bars that show resource changes.
//

import { makeAutoObservable } from 'mobx';
import BoostsRPCStore from 'app/stores/rpc/empire/boosts';
import EmpireRPCStore from 'app/stores/rpc/empire';
import ServerRPCStore from 'app/stores/rpc/server';
import BodyRPCStore from 'app/stores/rpc/body';

import YAHOO from 'app/shims/yahoo';
import LegacyHooks from 'app/legacyHooks';

const INTERVAL_TIME = 1000;

class TickerStore {
  ticking = false;

  interval = 0;

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
    LegacyHooks.tick();
  }

  start() {
    if (!this.ticking) {
      this.interval = window.setInterval(() => this.tick(), INTERVAL_TIME);
      this.ticking = true;
    }
  }

  stop() {
    if (this.ticking) {
      window.clearInterval(this.interval);
      this.ticking = false;
    }
  }
}

export default new TickerStore();
