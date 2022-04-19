import { makeAutoObservable } from 'mobx';
import * as util from 'app/js/util';
import ServerRPCStore from 'app/js/stores/rpc/server';
import server from 'app/js/server';

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

    update(result) {
        const now = ServerRPCStore.serverTimeMoment;
        this.buildingMsRemaining = util.serverDateToMoment(result.boosts.building) - now;
        this.energyMsRemaining = util.serverDateToMoment(result.boosts.energy) - now;
        this.foodMsRemaining = util.serverDateToMoment(result.boosts.food) - now;
        this.happinessMsRemaining = util.serverDateToMoment(result.boosts.happiness) - now;
        this.oreMsRemaining = util.serverDateToMoment(result.boosts.ore) - now;
        this.spyTrainingMsRemaining = util.serverDateToMoment(result.boosts.spy_training) - now;
        this.storageMsRemaining = util.serverDateToMoment(result.boosts.storage) - now;
        this.waterMsRemaining = util.serverDateToMoment(result.boosts.water) - now;
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
