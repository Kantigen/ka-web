import Empire from './empire.js';
import GenericBuilding from './genericBuilding.js';
import { Route } from '../interfaces.js';

const EnergyReserve: Route = {
  ...GenericBuilding,

  dump(req, res) {
    return {
      status: Empire.get_status(req, res),
    };
  },
};

export default EnergyReserve;
