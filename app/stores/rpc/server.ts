import { makeAutoObservable } from 'mobx';
import _ from 'lodash';
import { serverDateToMoment, formatMomentLong } from 'app/util';
import constants from 'app/constants';
import { EmpireGetStatusResponse } from 'app/interfaces';

class ServerRPCStore {
  time = '01 31 2010 13:09:05 +0600';

  version = '1.0';

  announcement = 0;

  rpc_limit = 10000;

  star_map_size = {
    x: [-15, 15],
    y: [-15, 15],
    z: [-15, 15],
  };

  constructor() {
    makeAutoObservable(this);
  }

  update(server: EmpireGetStatusResponse['server']) {
    // TODO: show announcement window if needed.

    this.time = server.time;
    this.rpc_limit = server.rpc_limit;
    this.star_map_size = server.star_map_size;
    this.version = server.version;
  }

  tick() {
    this.time = this.serverTimeMoment.add(1, 'second').format(constants.NEW_SERVER_DATE_FORMAT);
  }

  get serverTimeMoment() {
    return serverDateToMoment(this.time).utcOffset(0);
  }

  get clientTimeMoment() {
    return serverDateToMoment(this.time);
  }

  get serverTimeFormatted() {
    return formatMomentLong(this.serverTimeMoment);
  }

  get clientTimeFormatted() {
    return formatMomentLong(this.clientTimeMoment);
  }

  get serverTimeMs() {
    return this.serverTimeMoment.valueOf();
  }

  get clientTimeMs() {
    return this.clientTimeMoment.valueOf();
  }
}

export default new ServerRPCStore();
