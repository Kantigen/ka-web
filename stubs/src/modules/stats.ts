import Empire from './empire.js';
import { Route } from '../interfaces.js';

const Stats: Route = {
  alliance_rank(req, res) {
    return {
      status: Empire.get_status(req, res),
      alliances: [
        {
          alliance_id: 'id-goes-here', // unique id
          alliance_name: 'Earthlings', // alliance name
          member_count: '1', // number of empires in the alliance
          space_station_count: 0, // number of space stations this alliance controlls
          influence: 0, // the number of stars under the jurisdiction of this alliance
          colony_count: '1', // number of planets colonized
          population: '7000000000', // number of citizens on all planets in the empires of the alliance
          average_empire_size: '7000000000', // average size of empires in the alliance
          building_count: '50', // number of buildings across all colonies
          average_building_level: '20', // average level of all buildings across all colonies
          offense_success_rate: '0.793', // the offense rate of success of spies at all colonies
          defense_success_rate: '0.49312', // the defense rate of success of spies at all colonies
          dirtiest: '7941', // the number of times a spy has attempted to hurt another empire
        },
      ],
      total_alliances: 1,
      page_number: 1,
    };
  },

  colony_rank(req, res) {
    return {
      status: Empire.get_status(req, res),
      colonies: [
        {
          empire_id: 'id-goes-here', // unique id
          empire_name: 'Earthlings', // empire name
          planet_id: 'id-goes-here', // unique id
          planet_name: 'Earth', // name of the planet
          population: '7000000000', // number of citizens on planet
          building_count: '50', // number of buildings at this colony
          average_building_level: '20', // average level of all buildings at this colony
          highest_building_level: '26', // highest building at this colony
        },
      ],
    };
  },

  credits(req, res) {
    return [
      { 'Game Design': ['JT Smith', 'Jamie Vrbsky'] },
      {
        'Web Client': [
          'John Rozeske',
          'Graham Knop',
          'Matthew Musgrove',
          'vaelxon (Spy Training GUI)',
        ],
      },
      { 'Web Client redesign': ['Nathan McCallum (1vasari)', 'Iain C Docherty (icydee)'] },
      { 'iPhone Client': ['Kevin Runde', 'RedOrion'] },
      {
        'Game Server': [
          'JT Smith',
          'Graham Knop',
          'Matthew Musgrove',
          'Iain C Docherty (icydee)',
          'Mark Lemming (Norway)',
          '(fireartist)',
          '(Winton-Akagane)',
          '(Ysthane)',
          'Darin McBride (The Tower)',
          'RedOrion',
        ],
      },
      {
        'Art and Icons': [
          'Ryan Knope',
          'JT Smith',
          'Joseph Wain / glyphish.com',
          'Keegan Runde',
          'Christoph Thierbach (Husky)',
        ],
      },
      { 'Geology Consultant': ['Geofuels, LLC / geofuelsllc.com'] },
      {
        'Play Testers': [
          'John Oettinger',
          'Jamie Vrbsky',
          'Mike Kastern',
          'Chris Burr',
          'Eric Patterson',
          'Frank Dillon',
          'Kristi McCombs',
          'Ryan McCombs',
          'Mike Helfman',
          'Tavis Parker',
          'Sarah Bownds',
          'Rob Dicke',
          'Gemma Blair',
          'Bev Smith',
          'Mike Vrbsky',
        ],
      },
      {
        'Game Support': [
          'Plain Black Corporation / plainblack.com',
          'Mary Hoerr',
          'Daniel Collins (United Federation)',
          'RedOrion',
          'Infinate Ones',
        ],
      },
      {
        'Lost City of Tyleon': [
          'Steven Binns',
          'Owen Ferguson',
          'Garloo',
          'Mark Lemming (Norway)',
          'Saint',
          'Shadow',
          'JT Smith',
          'Noel Sorensen',
          'James T',
        ],
      },
      { 'AI Design': ['JT Smith', 'Iain C Docherty (icydee)', 'Mark Lemming (Norway)'] },
      { 'Reboot design': ['Iain C Docherty (icydee)', 'Mark Lemming (Norway)'] },
    ];
  },

  empire_rank(req, res) {
    return {
      status: Empire.get_status(req, res),
      empires: [
        {
          empire_id: 'id-goes-here', // unique id
          empire_name: 'Earthlings', // empire name
          alliance_id: 'id-goes-here', // unique id
          alliance_name: 'Earthlings Allied', // alliance name
          colony_count: '1', // number of planets colonized
          population: '7000000000', // number of citizens on all planets in the empire
          empire_size: '7000000000', // size of entire empire
          building_count: '50', // number of buildings across all colonies
          average_building_level: '20', // average level of all buildings across all colonies
          offense_success_rate: '0.793', // the offense rate of success of spies at all colonies
          defense_success_rate: '0.49312', // the defense rate of success of spies at all colonies
          dirtiest: '7941', // the number of times a spy has attempted to hurt another empire
        },
      ],
      total_empires: 1,
      page_number: 1,
    };
  },

  spy_rank(req, res) {
    return {
      status: Empire.get_status(req, res),
      spies: [
        {
          empire_id: 'id-goes-here', // unique id
          empire_name: 'Earthlings', // empire name
          spy_id: 'id-goes-here', // unique id
          spy_name: 'Agent Null', // the name of this spy
          age: '3693', // how old is this guy in seconds
          level: '18', // the level of this spy
          success_rate: '0.731', // the rate of success this spy has had for both offense and defensive tasks
          dirtiest: '7941', // the number of times a spy has attempted to hurt another empire
        },
      ],
    };
  },

  weekly_medal_winners(req, res) {
    return {
      status: Empire.get_status(req, res),
      winners: [
        {
          empire_id: 'id-goes-here',
          empire_name: 'Earthlings',
          medal_name: 'Dirtiest Empire In The Game',
          medal_image: 'dirtiest_empire_in_the_game',
          times_earned: 4,
        },
      ],
    };
  },
};

export default Stats;
