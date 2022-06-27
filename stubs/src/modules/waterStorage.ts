import Empire from './empire.js';
import GenericBuilding from './genericBuilding.js';
import { Route } from '../interfaces.js';

const WaterSroage: Route = {
  ...GenericBuilding,

  dump(req, res) {
    return {
      status: Empire.get_status(req, res),
    };
  },
};

export default WaterSroage;
