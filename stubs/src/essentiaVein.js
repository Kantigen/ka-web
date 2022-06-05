import GenericBuilding from './genericBuilding.js';

const EssentiaVein = {
  view() {
    const res = GenericBuilding.view();
    res.building.drain_capable = 3;
    return res;
  },

  drain() {
    return EssentiaVein.view();
  },
};

export default EssentiaVein;
