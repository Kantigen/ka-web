import { makeAutoObservable } from 'mobx';

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

export default new OptionsWindowStore();
