import GenericBuilding from './genericBuilding.js';
import Empire from './empire.js';
import { Route } from '../interfaces.js';

const Intelligence: Route = {
  view(req, res) {
    const response = GenericBuilding.view(req, res);
    response.spies = {
      maximum: 5,
      current: 1,
      in_training: 1,
      training_costs: {
        food: 100,
        water: 120,
        energy: 20,
        ore: 5,
        waste: 10,
        time: 60,
      },
    };
    return response;
  },

  train_spy(req, res) {
    return {
      status: Empire.get_status(req, res),
      trained: 3,
    };
  },

  view_spies(req, res) {
    const spies = [];

    for (let i = 1; i <= 12; i++) {
      spies.push({
        id: i,
        name: 'Agent Null',
        assignment: 'Idle',
        possible_assignments: [
          {
            task: 'Idle',
            recovery: 0,
            skill: 'none',
          },
          {
            task: 'Counter Espionage',
            recovery: 0,
            skill: '*',
          },
          {
            task: 'Security Sweep',
            recovery: 14400,
            skill: 'intel',
          },
        ],
        level: 9,
        politics: 1 * i, // experience in handling happiness
        mayhem: 20 * i, // experience in handling missions involving murder and destruction
        theft: 40 * i, // experience in handling missions involving stealing items
        intel: 33 * i, // experience in handling missions involving information and spies
        offense_rating: 570,
        defense_rating: 150,
        assigned_to: {
          body_id: 1,
          name: 'Earth',
          x: 0,
          y: 0,
        },
        based_from: {
          body_id: 2,
          name: 'Mars',
          x: 50,
          y: -65,
        },
        is_available: 1, // can be reassigned
        available_on: '01 31 2010 13:09:05 +0600', // if can't be reassigned, this is when will be available
        started_assignment: '01 31 2010 13:09:05 +0600',
        seconds_remaining: 45,
        mission_count: {
          offensive: 149,
          defensive: 149,
        },
      });
    }

    return {
      spies,
      spy_count: 12,
      status: Empire.get_status(req, res),
    };
  },

  view_all_spies(req, res) {
    return this.view_spies(req, res);
  },

  burn_spy(req, res) {
    return {
      status: Empire.get_status(req, res),
    };
  },

  name_spy(req, res) {
    return {
      status: Empire.get_status(req, res),
    };
  },

  name_spies(req, res) {
    return this.view_all_spies(req, res);
  },

  assign_spy(req, res) {
    return {
      status: Empire.get_status(req, res),
      mission: {
        result: 'Failure',
        message_id: 'id-goes-here',
        reason: "I'm under heavy fire over here!",
      },
      spy: {
        id: 1,
        name: 'Agent Null',
        assignment: 'Idle',
        possible_assignments: [
          {
            task: 'Idle',
            recovery: 0,
            skill: 'none',
          },
          {
            task: 'Counter Espionage',
            recovery: 0,
            skill: '*',
          },
          {
            task: 'Security Sweep',
            recovery: 14400, // in seconds
            skill: 'intel',
          },
        ],
        level: 9,
        politics: 0, // experience in handling happiness
        mayhem: 20, // experience in handling missions involving murder and destruction
        theft: 40, // experience in handling missions involving stealing items
        intel: 33, // experience in handling missions involving information and spies
        offense_rating: 570,
        defense_rating: 150,
        assigned_to: {
          body_id: 'id-goes-here',
          name: 'Earth',
        },
        is_available: 1, // can be reassigned
        available_on: '01 31 2010 13:09:05 +0600', // if can't be reassigned, this is when will be available
        started_assignment: '01 31 2010 13:09:05 +0600',
        seconds_remaining: 45,
        mission_count: {
          offensive: 149,
          defensive: 149,
        },
      },
    };
  },
};

export default Intelligence;
