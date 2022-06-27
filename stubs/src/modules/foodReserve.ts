import GenericBuilding from './genericBuilding.js';
import Empire from './empire.js';
import { Route } from '../interfaces.js';

const FoodReserve: Route = {
  view(req, res) {
    const response = GenericBuilding.view(req, res);
    response.food_stored = {
      algae: 5000,
      apple: 5000,
      bean: 5000,
      beetle: 5000,
      bread: 5000,
      burger: 5000,
      cheese: 5000,
      chip: 5000,
      cider: 5000,
      corn: 5000,
      fungus: 5000,
      lapis: 5000,
      meal: 5000,
      milk: 5000,
      pancake: 5000,
      pie: 5000,
      potato: 5000,
      root: 5000,
      shake: 5000,
      soup: 5000,
      syrup: 5000,
      wheat: 5000,
    };
    return response;
  },

  dump(req, res) {
    return {
      status: Empire.get_status(req, res),
    };
  },
};

export default FoodReserve;
