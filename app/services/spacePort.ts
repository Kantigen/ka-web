import ServiceBase from 'app/services/base';
import {
  SpacePortViewAllFleetsParams,
  SpacePortViewTravellingFleetsParams,
  SpacePortViewAvailableFleetsParams,
  SpacePortSendFleetParams,
 } from 'app/interfaces';

class SpacePortService extends ServiceBase {
  viewAllFleets(params: SpacePortViewAllFleetsParams) {
    return this.call('spaceport', 'view_all_fleets', params);
  }

  viewTravellingFleets(params: SpacePortViewTravellingFleetsParams) {
    return this.call('spaceport', 'view_travelling_fleets', params);
  }

  viewAvailableFleets(params: SpacePortViewAvailableFleetsParams) {
    return this.call('spaceport', 'view_available_fleets', params);
  }

  sendFleet(params: SpacePortSendFleetParams) {
    return this.call('spaceport', 'send_fleet', params);
  }
}

export default new SpacePortService();
