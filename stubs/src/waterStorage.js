import Empire from './empire.js';
import GenericBuilding from './genericBuilding.js';

const WaterSroage = {
  ...GenericBuilding,

  dump() {
    return {
      status: Empire.get_status(),
    };
  },
};

export default WaterSroage;
