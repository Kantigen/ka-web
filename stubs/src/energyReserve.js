import Empire from './empire.js';
import GenericBuilding from './genericBuilding.js';

const EnergyReserve = {
  ...GenericBuilding,

  dump() {
    return {
      status: Empire.get_status(),
    };
  },
};

export default EnergyReserve;
