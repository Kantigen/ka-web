import Buildings from './buildings.js';
import Body from './body.js';

const { buildings } = Body.get_buildings();

const GenericBuilding = {
  view(req, res) {
    const response = Buildings.view();
    const id = req.body.params[1];
    const b = buildings[id];

    if (b) {
      response.building.id = id;
      response.building.x = b.x;
      response.building.y = b.y;
      response.building.efficiency = b.efficiency;
      response.building.name = b.name;
      response.building.image = b.image;
      response.building.level = b.level;
      response.building.url = b.url;
    }

    return response;
  },
};

export default GenericBuilding;
