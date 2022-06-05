import _ from 'lodash';
import GenericBuilding from './genericBuilding.js';
import Empire from './empire.js';

const Spaceport = _.merge({}, GenericBuilding, {
  get_ships_for() {
    return {
      incoming: [],
      available: [],
      unavailable: [],
      orbiting: [],
      mining_platforms: [],
      fleet_send_limit: 20,
      status: Empire.status_block(),
    };
  },
});

export default Spaceport;
