import GenericBuilding from './genericBuilding.js';
import Empire from './empire.js';
import { Route } from '../interfaces.js';

const Spaceport: Route = {
  ...GenericBuilding,

  get_ships_for(req, res) {
    return {
      incoming: [],
      available: [],
      unavailable: [],
      orbiting: [],
      mining_platforms: [],
      fleet_send_limit: 20,
      status: Empire.get_status(req, res),
    };
  },
};

export default Spaceport;
