import Empire from './empire.js';
import GenericBuilding from './genericBuilding.js';
import moment from 'moment';
import { DATE_FORMAT, SHIP_TYPES } from './../constants.js';
import { Route } from '../interfaces.js';

const Shipyard: Route = {
  view(req, res) {
    return GenericBuilding.view(req, res);
  },

  view_build_queue(req, res) {
    return {
      status: Empire.get_status(req, res),
      number_of_ships: 10,
      cost_to_subsidize: 30,
      ships_building: [
        {
          id: 1,
          task: 'Building',
          type: 'spy_pod',
          type_human: 'Spy Pod',
          date_completed: moment().add(20, 'minutes').format(DATE_FORMAT),
        },
        {
          id: 2,
          task: 'Building',
          type: 'snark3',
          type_human: 'Snark III',
          date_completed: moment().add(40, 'minutes').format(DATE_FORMAT),
        },
        {
          id: 3,
          task: 'Building',
          type: 'colony_ship',
          type_human: 'Colony Ship',
          date_completed: moment().add(60, 'minutes').format(DATE_FORMAT),
        },
        {
          id: 4,
          task: 'Building',
          type: 'probe',
          type_human: 'Probe',
          date_completed: moment().add(80, 'minutes').format(DATE_FORMAT),
        },
        {
          id: 5,
          task: 'Building',
          type: 'hulk_fast',
          type_human: 'Hulk Fast',
          date_completed: moment().add(100, 'minutes').format(DATE_FORMAT),
        },
        {
          id: 6,
          task: 'Building',
          type: 'huk_huge',
          type_human: 'Hulk Huge',
          date_completed: moment().add(120, 'minutes').format(DATE_FORMAT),
        },
        {
          id: 7,
          task: 'Repairing',
          type: 'sweeper',
          type_human: 'Sweeper',
          date_completed: moment().add(140, 'minutes').format(DATE_FORMAT),
        },
      ],
    };
  },

  subsidize_build_queue(req, res) {
    return {
      status: Empire.get_status(req, res),
      number_of_ships: 0,
      cost_to_subsidize: 0,
      ships_building: [],
    };
  },

  subsidize_ship(req, res) {
    return {
      status: Empire.get_status(req, res),
      number_of_ships: 0,
      cost_to_subsidize: 0,
      ships_building: [],
    };
  },

  get_buildable(req, res) {
    const buildable: any = {};

    Object.keys(SHIP_TYPES).forEach((type) => {
      buildable[type] = {
        type_human: SHIP_TYPES[type],
        can: 1,
        reason: null,
        image: type,
        cost: {
          seconds: 1200,
          food: 1000,
          water: 1000,
          energy: 1000,
          ore: 1000,
          waste: 100,
        },
        attributes: {
          speed: 1000,
          hold_size: 1000,
          max_occupants: 2,
          combat: 0,
          stealth: 1500,
          berth_level: 5,
        },
        tags: [],
      };
    });

    return { buildable, docks_available: 200, status: Empire.get_status(req, res) };
  },

  build_ships(req, res) {
    return this.view_build_queue(req, res);
  },
};

export default Shipyard;
