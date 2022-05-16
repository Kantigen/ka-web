import Server from './server.js';
import Captcha from './captcha.js';
import moment from 'moment';
import { DATE_FORMAT } from './constants.js';

const Empire = {
  create() {
    return {
      empire_id: 1,
    };
  },

  update_species() {
    return {
      update_species: 1,
    };
  },

  redefined_species() {
    return {
      status: Empire.get_status(),
    };
  },

  found() {
    return {
      session_id: 'this-is-a-session-id',
      welcome_message_id: 5,
      status: Empire.get_status(),
    };
  },

  get_status() {
    return {
      empire: this.status_block(),
      server: Server.status_block(),
    };
  },

  fetch_captcha(req, res) {
    return Captcha.fetch(req, res);
  },

  login() {
    return {
      session_id: 'this-is-a-session-id',
      status: Empire.get_status(),
    };
  },

  logout() {
    return {
      logout: 1,
    };
  },

  status_block() {
    return {
      id: 1,
      bodies: {
        colonies: [
          {
            id: 1,
            name: 'Earth',
            x: 0,
            y: 0,
            orbit: 1,
            empire_name: 'Rome',
            empire_id: 1,
            zone: '0|0',
          },
        ],
        mystations: [
          {
            id: 2,
            name: 'Death Star',
            x: 100,
            y: -50,
            orbit: 2,
            empire_name: 'Rome',
            empire_id: 1,
            zone: '0|0',
          },
        ],
        ourstations: [],
        babies: [],
      },
      colonies: {
        1: 'Earth',
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

  get_invite_friend_url() {
    return {
      referral_url: 'https://demo.kenoantigen.com/',
      status: Empire.get_status(),
    };
  },

  get_own_profile() {
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
      status: Empire.get_status(),
    };
  },

  invite_friend() {
    return {
      sent: [],
      not_sent: [],
      status: Empire.get_status(),
    };
  },

  get_boosts() {
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
      status: Empire.get_status(),
    };
  },

  edit_profile() {
    return Empire.get_own_profile();
  },

  send_password_reset_message() {
    return {
      sent: 1,
    };
  },

  reset_password() {
    return Empire.login();
  },
};

export default Empire;
