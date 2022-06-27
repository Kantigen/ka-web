import GenericBuilding from './genericBuilding.js';
import { Route } from '../interfaces.js';

const MayhemTraining: Route = {
  view(req, res) {
    const response = GenericBuilding.view(req, res);
    response.building.spies = {
      max_points: 2600,
      points_per: 45,
      in_training: 4,
    };
    return response;
  },
};

export default MayhemTraining;
