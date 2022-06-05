import Buildings from './buildings.js';
import Body from './body.js';

const { buildings } = Body.get_buildings();

const GenericBuilding = {
  view(req, res) {
    const response = Buildings.view();
    const id = req.body.params[1];
    const b = buildings[id];

    if (b) {
      response.building = { ...response.building, ...b };
    }

    return response;
  },
};

export default GenericBuilding;
