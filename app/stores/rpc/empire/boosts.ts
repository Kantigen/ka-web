import { makeAutoObservable } from 'mobx';
import { serverDateToMoment } from 'app/util';
import ServerRPCStore from 'app/stores/rpc/server';
import { EmpireGetBoostsResult } from 'app/interfaces';

class BoostsEmpireRPCStore {
  foodMsRemaining = 0;

  oreMsRemaining = 0;

  waterMsRemaining = 0;

  energyMsRemaining = 0;

  happinessMsRemaining = 0;

  storageMsRemaining = 0;

  buildingMsRemaining = 0;

  spyTrainingMsRemaining = 0;

  constructor() {
    makeAutoObservable(this);
  }

  update(result: EmpireGetBoostsResult) {
    const now = ServerRPCStore.serverTimeMoment;
    this.buildingMsRemaining = serverDateToMoment(result.boosts.building).diff(now);
    this.energyMsRemaining = serverDateToMoment(result.boosts.energy).diff(now);
    this.foodMsRemaining = serverDateToMoment(result.boosts.food).diff(now);
    this.happinessMsRemaining = serverDateToMoment(result.boosts.happiness).diff(now);
    this.oreMsRemaining = serverDateToMoment(result.boosts.ore).diff(now);
    this.spyTrainingMsRemaining = serverDateToMoment(result.boosts.spy_training).diff(now);
    this.storageMsRemaining = serverDateToMoment(result.boosts.storage).diff(now);
    this.waterMsRemaining = serverDateToMoment(result.boosts.water).diff(now);
  }

  tick() {
    if (this.buildingMsRemaining > 0) this.buildingMsRemaining -= 1000;
    if (this.energyMsRemaining > 0) this.energyMsRemaining -= 1000;
    if (this.foodMsRemaining > 0) this.foodMsRemaining -= 1000;
    if (this.happinessMsRemaining > 0) this.happinessMsRemaining -= 1000;
    if (this.oreMsRemaining > 0) this.oreMsRemaining -= 1000;
    if (this.spyTrainingMsRemaining > 0) this.spyTrainingMsRemaining -= 1000;
    if (this.storageMsRemaining > 0) this.storageMsRemaining -= 1000;
    if (this.waterMsRemaining > 0) this.waterMsRemaining -= 1000;
  }
}

export default new BoostsEmpireRPCStore();
