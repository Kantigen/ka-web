import { Route } from '../interfaces.js';
import GenericBuilding from './genericBuilding.js';

const SpaceStationLab: Route = {
  view(req, res) {
    const level_costs = [];

    for (let i = 1; i <= 30; i++) {
      level_costs.push({
        level: 1 * i,
        food: 10000 * i,
        ore: 10000 * i,
        water: 10000 * i,
        energy: 10000 * i,
        waste: 2500 * i,
        time: 1200 * i,
      });
    }

    const response = GenericBuilding.view(req, res);
    response.make_plan = {
      types: [
        {
          type: 'ibs',
          name: 'Interstellar Broadcast Station',
          image: 'ibs',
          url: '/ibs',
        },
        {
          type: 'parliament',
          name: 'Parliament',
          image: 'parliament',
          url: '/parliament',
        },
        {
          type: 'policestation',
          name: 'Police Station',
          image: 'policestation',
          url: '/policestation',
        },
        {
          type: 'stationcommand',
          name: 'Station Command',
          image: 'stationcommand',
          url: '/stationcommand',
        },
        {
          type: 'warehouse',
          name: 'Warehouse',
          image: 'warehouse',
          url: '/warehouse',
        },
        {
          type: 'culinaryinstitute',
          name: 'Culinary Institute',
          image: 'culinaryinstitute',
          url: '/culinaryinstitute',
        },
        {
          type: 'operahouse',
          name: 'Opera House',
          image: 'operahouse',
          url: '/operahouse',
        },
        {
          type: 'artmuseum',
          name: 'Art Museum',
          image: 'artmuseum',
          url: '/artmuseum',
        },
      ],
      level_costs,
    };

    return response;
  },
};

export default SpaceStationLab;
