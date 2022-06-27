import moment from 'moment';
import Server from './server.js';
import Captcha from './captcha.js';
import { DATE_FORMAT } from './../constants.js';
import { Route } from '../interfaces.js';

const Empire: Route = {
  create(req, res) {
    return {
      empire_id: 1,
    };
  },

  update_species(req, res) {
    return {
      update_species: 1,
    };
  },

  redefined_species(req, res) {
    return {
      status: Empire.get_status(req, res),
    };
  },

  found(req, res) {
    return {
      session_id: 'this-is-a-session-id',
      welcome_message_id: 5,
      status: Empire.get_status(req, res),
    };
  },

  get_status(req, res) {
    return {
      empire: this.status_block(req, res),
      server: Server.status_block(req, res),
    };
  },

  fetch_captcha(req, res) {
    return Captcha.fetch(req, res);
  },

  login(req, res) {
    return {
      session_id: 'this-is-a-session-id',
      status: Empire.get_status(req, res),
    };
  },

  logout(req, res) {
    return {
      logout: 1,
    };
  },

  status_block(req, res) {
    const colonies = [];

    for (let i = 1; i <= 40; i++) {
      colonies.push({
        id: i,
        name: `Planet #${i}`,
        x: 0,
        y: 0,
        orbit: 1,
        type: `p${i}`,
        empire_name: 'Rome',
        empire_id: 1,
        zone: '0|0',
      });
    }

    return {
      id: 1,
      bodies: {
        colonies,
        mystations: [
          {
            id: 200,
            name: 'Death Star',
            x: 100,
            y: -50,
            orbit: 2,
            empire_name: 'Rome',
            empire_id: 1,
            zone: '0|0',
            type: 'station',
          },
        ],
        ourstations: [
          {
            id: 300,
            name: 'Hubble',
            x: 150,
            y: 500,
            orbit: 5,
            empire_name: 'Star Explorers',
            empire_id: 2,
            zone: '0|1',
            type: 'station',
          },
        ],
        babies: {
          'Taylor Swift': {
            bodies: [
              {
                id: 500,
                name: 'Red',
                x: 15,
                y: -27,
                orbit: 8,
                empire_name: 'Taylor Swift',
                empire_id: 3,
                zone: '0|-1',
                type: 'p5',
              },
            ],
          },
        },
      },
      colonies: {
        1: 'Earth',
        3: 'Mars',
      },
      rpc_count: 250,
      insurrect_value: 100000,
      is_isolationist: 0,
      name: 'Rome',
      status_message: 'Making the Lacuna Expanse a better Expanse',
      home_planet_id: 1,
      has_new_messages: 4,
      latest_message_id: 4,
      essentia: 521,
      next_colony_cost: 100000,
      next_station_cost: 1000000,
      planets: {
        1: 'Earth',
        2: 'Death Star',
        3: 'Mars',
      },
      tech_level: 30,
      self_destruct_active: 0,
      self_destruct_date: '',
      stations: {
        2: 'Death Star',
      },
      primary_embassy_id: 100,
    };
  },

  get_invite_friend_url(req, res) {
    return {
      referral_url: 'https://demo.kenoantigen.com/',
      status: Empire.get_status(req, res),
    };
  },

  view_profile(req, res) {
    return this.get_own_profile(req, res);
  },

  get_own_profile(req, res) {
    return {
      profile: {
        id: 1234,
        name: 'Rome',
        description: 'A test empire',
        status_message: 'Making the Lacuna Expanse a better expanse',
        medals: [
          {
            id: 1234,
            name: 'Built Level 1 Building',
            image: 'building1',
            date: '2013 01 31 12:34:45 +0600',
            public: 1,
            times_earned: 10,
          },
          {
            id: 12345,
            name: 'Built Level 2 Building',
            image: 'building2',
            date: '2013 01 31 12:34:45 +0600',
            public: 0,
            times_earned: 4,
          },
        ],
        city: '',
        country: '',
        notes: 'Just keep building...',
        skype: '',
        player_name: '',
        skip_happiness_warnings: 0,
        skip_resource_warnings: 0,
        skip_pollution_warnings: 0,
        skip_medal_messages: 0,
        skip_facebook_wall_posts: 0,
        skip_found_nothing: 0,
        skip_excavator_resources: 0,
        skip_excavator_glyph: 0,
        skip_excavator_plan: 0,
        skip_spy_recovery: 0,
        skip_probe_detected: 0,
        skip_attack_messages: 0,
        email: 'hello@example.com',
        sitter_password: '',
      },
      status: Empire.get_status(req, res),
    };
  },

  invite_friend(req, res) {
    return {
      sent: [],
      not_sent: [],
      status: Empire.get_status(req, res),
    };
  },

  view_boosts(req, res) {
    return this.get_boosts(req, res);
  },

  get_boosts(req, res) {
    return {
      boosts: {
        food: moment().add(1, 'week').format(DATE_FORMAT),
        ore: moment().add(1, 'week').format(DATE_FORMAT),
        energy: moment().add(1, 'week').format(DATE_FORMAT),
        water: moment().add(1, 'week').format(DATE_FORMAT),
        happiness: moment().add(2, 'days').format(DATE_FORMAT),
        storage: moment().add(1, 'hour').format(DATE_FORMAT),
        building: moment().add(1, 'hour').format(DATE_FORMAT),
        ship_build: moment().add(1, 'hour').format(DATE_FORMAT),
        ship_speed: moment().subtract(2, 'days').format(DATE_FORMAT),
        spy_training: moment().subtract(2, 'days').format(DATE_FORMAT),
      },
      status: Empire.get_status(req, res),
    };
  },

  edit_profile(req, res) {
    return Empire.get_own_profile(req, res);
  },

  send_password_reset_message(req, res) {
    return {
      sent: 1,
    };
  },

  reset_password(req, res) {
    return Empire.login(req, res);
  },
};

export default Empire;
