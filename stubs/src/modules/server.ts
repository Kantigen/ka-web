import moment from 'moment';
import { Route } from '../interfaces.js';
import { DATE_FORMAT } from './../constants.js';

const Server: Route = {
  get_status(req, res) {
    return Server.status_block(req, res);
  },

  status_block(req, res) {
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
