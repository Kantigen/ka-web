import GenericBuilding from './genericBuilding.js';

const EssentiaVein = {
  view(req, res) {
    const response = GenericBuilding.view(req, res);
    response.building.drain_capable = 3;
    return response;
  },

  drain(req, res) {
    return EssentiaVein.view(req, res);
  },
};

export default EssentiaVein;
