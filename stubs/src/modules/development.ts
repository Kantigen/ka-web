import GenericBuilding from './genericBuilding.js';
import Empire from './empire.js';
import { Route } from '../interfaces.js';

const Development: Route = {
  view(req, res) {
    const response = GenericBuilding.view(req, res);

    response.build_queue = [
      {
        building_id: 'building-id-goes-here',
        name: 'Planetary Commmand',
        subsidy_cost: 3, // the essentia cost to subsidize just this building
        to_level: 9,
        seconds_remaining: 537,
        x: 0,
        y: 0,
      },
      {
        building_id: 'building-id-goes-here',
        name: 'Wheat Farm',
        to_level: 15,
        seconds_remaining: 9748,
        x: -1,
        y: 4,
        subsidy_cost: 5,
      },
    ];

    response.subsidy_cost = 15;
    return response;
  },

  subsidize_build_queue(req, res) {
    return { essentia_spent: 10, status: Empire.get_status(req, res) };
  },

  subsidize_one_build(req, res) {
    return { essentia_spent: 10, status: Empire.get_status(req, res) };
  },

  cancel_build(req, res) {
    const response = GenericBuilding.view(req, res);
    response.build_queue = [];
    response.subsidy_cost = 0;
    return response;
  },
};

export default Development;
