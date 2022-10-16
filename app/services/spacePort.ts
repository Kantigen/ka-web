import ServiceBase from 'app/services/base';
import { SpacePortViewAllFleetsParams, SpacePortViewTravellingFleetsParams } from 'app/interfaces';

class SpacePortService extends ServiceBase {
  viewAllFleets(params: SpacePortViewAllFleetsParams) {
    return this.call('spaceport', 'view_all_fleets', params);
  }

  viewTravellingFleets(params: SpacePortViewTravellingFleetsParams) {
    return this.call('spaceport', 'view_travelling_fleets', params);
  }
}

export default new SpacePortService();
