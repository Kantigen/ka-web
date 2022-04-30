import { makeAutoObservable } from 'mobx';
import _ from 'lodash';

class GenericBuildingRPCStore {
  id = '';

  name = '';

  image = '';

  level = 0;

  x = 0;

  y = 0;

  food_hour = 0;

  food_capacity = 0;

  energy_hour = 0;

  energy_capacity = 0;

  ore_hour = 0;

  ore_capacity = 0;

  water_hour = 0;

  water_capacity = 0;

  waste_hour = 0;

  waste_capacity = 0;

  happiness_hour = 0;

  efficiency = 0;

  extraViewData = {};

  repair_costs = {
    food: 0,
    water: 0,
    energy: 0,
    ore: 0,
  };

  downgrade = {
    can: 1,
    reason: '',
    image: '',
  };

  upgrade = {
    can: 1,
    reason: '',

    cost: {
      food: 0,
      water: 0,
      energy: 0,
      waste: 0,
      ore: 0,
      time: 0,
      halls: 0,
    },
    production: {
      food_hour: 0,
      food_capacity: 0,
      energy_hour: 0,
      energy_capacity: 0,
      ore_hour: 0,
      ore_capacity: 0,
      water_hour: 0,
      water_capacity: 0,
      waste_hour: 0,
      waste_capacity: 0,
      happiness_hour: 0,
    },
    image: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  update(result: any) {
    this.id = result.building.id;
    this.name = result.building.name;
    this.image = result.building.image;
    this.level = result.building.level;
    this.x = result.building.x;
    this.y = result.building.y;
    this.food_hour = result.building.food_hour;
    this.food_capacity = result.building.food_capacity;
    this.energy_hour = result.building.energy_hour;
    this.energy_capacity = result.building.energy_capacity;
    this.ore_hour = result.building.ore_hour;
    this.ore_capacity = result.building.ore_capacity;
    this.water_hour = result.building.water_hour;
    this.water_capacity = result.building.water_capacity;
    this.waste_hour = result.building.waste_hour;
    this.waste_capacity = result.building.waste_capacity;
    this.happiness_hour = result.building.happiness_hour;
    this.efficiency = result.building.efficiency;

    this.repair_costs.food = result.building.repair_costs.food;
    this.repair_costs.water = result.building.repair_costs.water;
    this.repair_costs.energy = result.building.repair_costs.energy;
    this.repair_costs.ore = result.building.repair_costs.ore;

    this.downgrade.can = result.building.downgrade.can;
    this.downgrade.reason = result.building.downgrade.reason;
    this.downgrade.image = result.building.downgrade.image;

    this.upgrade.can = result.building.upgrade.can;
    this.upgrade.reason = result.building.upgrade.reason;

    this.upgrade.cost.food = result.building.upgrade.cost.food || 0;
    this.upgrade.cost.water = result.building.upgrade.cost.water || 0;
    this.upgrade.cost.energy = result.building.upgrade.cost.energy || 0;
    this.upgrade.cost.waste = result.building.upgrade.cost.waste || 0;
    this.upgrade.cost.ore = result.building.upgrade.cost.ore || 0;
    this.upgrade.cost.time = result.building.upgrade.cost.time || 0;
    this.upgrade.cost.halls = result.building.upgrade.cost.halls || 0;

    this.upgrade.production.food_hour = result.building.upgrade.production.food_hour;
    this.upgrade.production.food_capacity = result.building.upgrade.production.food_capacity;
    this.upgrade.production.energy_hour = result.building.upgrade.production.energy_hour;
    this.upgrade.production.energy_capacity = result.building.upgrade.production.energy_capacity;
    this.upgrade.production.ore_hour = result.building.upgrade.production.ore_hour;
    this.upgrade.production.ore_capacity = result.building.upgrade.production.ore_capacity;
    this.upgrade.production.water_hour = result.building.upgrade.production.water_hour;
    this.upgrade.production.water_capacity = result.building.upgrade.production.water_capacity;
    this.upgrade.production.waste_hour = result.building.upgrade.production.waste_hour;
    this.upgrade.production.waste_capacity = result.building.upgrade.production.waste_capacity;
    this.upgrade.production.happiness_hour = result.building.upgrade.production.happiness_hour;

    this.upgrade.image = result.building.upgrade.image;

    // // Any 'view' call that returns extra data (say, the Planetary Command Center) has that
    // // data put into 'building.extraViewData' so that it is accessible from the store.
    // let extraViewData = {};
    // _.each(result, function(value, key) {
    //     if (key === 'status' || key === 'building') {
    //         return;
    //     }
    //     extraViewData[key] = _.cloneDeep(value);
    // });
    // building.extraViewData = extraViewData;
    // // Manually update the old planet map with the new data we got.
    // YAHOO.lacuna.MapPlanet.ReloadBuilding(_.cloneDeep(building));
  }

  clear() {
    this.id = '';
    this.name = '';
    this.image = '';
    this.level = 0;
    this.x = 0;
    this.y = 0;
    this.food_hour = 0;
    this.food_capacity = 0;
    this.energy_hour = 0;
    this.energy_capacity = 0;
    this.ore_hour = 0;
    this.ore_capacity = 0;
    this.water_hour = 0;
    this.water_capacity = 0;
    this.waste_hour = 0;
    this.waste_capacity = 0;
    this.happiness_hour = 0;
    this.efficiency = 0;
    this.extraViewData = {};

    this.repair_costs = {
      food: 0,
      water: 0,
      energy: 0,
      ore: 0,
    };

    this.downgrade = {
      can: 1,
      reason: '',
      image: '',
    };

    this.upgrade = {
      can: 1,
      reason: '',

      cost: {
        food: 0,
        water: 0,
        energy: 0,
        waste: 0,
        ore: 0,
        time: 0,
        halls: 0,
      },
      production: {
        food_hour: 0,
        food_capacity: 0,
        energy_hour: 0,
        energy_capacity: 0,
        ore_hour: 0,
        ore_capacity: 0,
        water_hour: 0,
        water_capacity: 0,
        waste_hour: 0,
        waste_capacity: 0,
        happiness_hour: 0,
      },
      image: '',
    };
  }
}

export default new GenericBuildingRPCStore();
