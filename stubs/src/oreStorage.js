import GenericBuilding from './genericBuilding.js';
import Empire from './empire.js';

const OreStorage = {
  view(req, res) {
    const response = GenericBuilding.view(req, res);
    response.ore_stored = {
      anthracite: 5000,
      bauxite: 5000,
      beryl: 5000,
      chalcopyrite: 5000,
      chromite: 5000,
      fluorite: 5000,
      galena: 5000,
      goethite: 5000,
      gold: 5000,
      gypsum: 5000,
      halite: 5000,
      kerogen: 5000,
      magnetite: 5000,
      methane: 5000,
      monazite: 5000,
      rutile: 5000,
      sulfur: 5000,
      trona: 5000,
      uraninite: 5000,
      zircon: 5000,
    };
    return response;
  },

  dump() {
    return {
      status: Empire.get_status(),
    };
  },
};

export default OreStorage;
