import moment from 'moment';
import { DATE_FORMAT } from './constants.js';

const Server = {
  get_status() {
    return Server.status_block();
  },

  status_block() {
    return {
      time: moment().format(DATE_FORMAT),
      version: '1.0',
      star_map_size: {
        x: [-15, 15],
        y: [-15, 15],
        z: [-15, 15],
      },
      rpc_limit: 10000,
    };
  },
};

export default Server;
