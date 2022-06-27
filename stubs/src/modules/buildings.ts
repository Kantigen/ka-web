import Body from './body.js';
import { Route } from './../interfaces.js';

const Buildings: Route = {
  view(req, res) {
    return {
      building: {
        id: 'id-goes-here',
        name: 'Planetary Command',
        image: 'command6',
        level: 6,
        x: 0,
        y: 0,
        food_hour: 500,
        food_capacity: 500,
        energy_hour: -44,
        energy_capacity: 500,
        ore_hour: -310,
        ore_capacity: 500,
        water_hour: -100,
        water_capacity: 500,
        waste_hour: 33,
        waste_capacity: 500,
        happiness_hour: 0,
        efficiency: 100,
        repair_costs: {
          food: 10,
          water: 10,
          energy: 10,
          ore: 10,
        },
        // 'pending_build' : {
        //   'seconds_remaining' : 430,
        //   'start' : '01 31 2010 13:09:05 +0600',
        //   'end' : '01 31 2010 18:09:05 +0600'
        // },
        // 'work' : {
        //   'seconds_remaining' : 49,
        //   'start' : '01 31 2010 13:09:05 +0600',
        //   'end' : '01 31 2010 18:09:05 +0600'
        // },
        downgrade: {
          can: 1,
          reason: '',
          image: 'command5',
        },
        upgrade: {
          can: 0,
          reason: [1011, 'Not enough resources.', 'food'],
          cost: {
            food: 500,
            water: 500,
            energy: 500,
            waste: 500,
            ore: 1000,
            time: 1200,
          },
          production: {
            food_hour: 1500,
            food_capacity: 500,
            energy_hour: -144,
            energy_capacity: 500,
            ore_hour: -1310,
            ore_capacity: 500,
            water_hour: -1100,
            water_capacity: 500,
            waste_hour: 133,
            waste_capacity: 500,
            happiness_hour: 0,
          },
          image: 'command7',
        },
      },
      status: Body.get_status(req, res),
    };
  },
};

export default Buildings;
