import { makeAutoObservable } from 'mobx';

class StatsWindowStore {
  shown = false;

  constructor() {
    makeAutoObservable(this);
  }

  show() {
    console.log('shown got called');
    this.shown = true;
  }

  hide() {
    this.shown = false;
  }
}

export default new StatsWindowStore();
