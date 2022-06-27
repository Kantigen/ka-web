import Buildings from './buildings.js';
import Body from './body.js';
import { Route } from '../interfaces.js';

const GenericBuilding: Route = {
  view(req, res) {
    const response = Buildings.view(req, res);
    const id = req.body.params[1];
    const { buildings } = Body.get_buildings(req, res);
    const b = buildings[id];

    if (b) {
      response.building = { ...response.building, ...b, ...{ id } };
    }

    return response;
  },
};

export default GenericBuilding;
