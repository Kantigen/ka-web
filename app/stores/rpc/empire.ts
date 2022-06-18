import { makeAutoObservable } from 'mobx';
import _ from 'lodash';
import { int, serverDateToMs } from 'app/util';
import ServerRPCStore from 'app/stores/rpc/server';
import { EmpireGetStatusResponse } from 'app/interfaces';

class EmpireRPCStore {
  bodies: EmpireGetStatusResponse['empire']['bodies'] = {
    colonies: [],
    mystations: [],
    ourstations: [],
    babies: {},
  };

  colonies = [];

  essentia = 0;

  exactEssentia = 0;

  has_new_messages = 0;

  home_planet_id = 0;

  id = 0;

  insurrect_value = 0;

  is_isolationist = 0;

  latest_message_id = 0;

  name = '';

  next_colony_cost = 0;

  next_colony_srcs = 0;

  next_station_cost = 0;

  planets = [];

  primary_embassy_id = 0;

  rpc_count = 0;

  self_destruct_active = 0;

  self_destruct_date = '';

  self_destruct_ms = 0;

  stations = [];

  status_message = '';

  tech_level = 0;

  constructor() {
    makeAutoObservable(this);
  }

  tick() {
    if (this.self_destruct_active && this.self_destruct_ms > 0) {
      this.self_destruct_ms -= 1000;
    }
  }

  update(empire: EmpireGetStatusResponse['empire']) {
    this.has_new_messages = empire.has_new_messages;
    this.home_planet_id = empire.home_planet_id;
    this.id = empire.id;
    this.insurrect_value = empire.insurrect_value;
    this.is_isolationist = empire.is_isolationist;
    this.latest_message_id = empire.latest_message_id;
    this.name = empire.name;
    this.next_colony_cost = empire.next_colony_cost;
    this.next_colony_srcs = empire.next_colony_srcs;
    this.next_station_cost = empire.next_station_cost;
    this.primary_embassy_id = empire.primary_embassy_id;
    this.rpc_count = empire.rpc_count;
    this.self_destruct_active = empire.self_destruct_active;
    this.self_destruct_date = empire.self_destruct_date;
    this.status_message = empire.status_message;
    this.tech_level = empire.tech_level;

    // Possible things to do here:
    //  ~ Turn self_destruct_date into a Date object.
    this.self_destruct_active = empire.self_destruct_active;
    this.exactEssentia = empire.essentia;
    this.essentia = empire.essentia;
    if (empire.self_destruct_active) {
      this.self_destruct_ms =
        serverDateToMs(empire.self_destruct_date) - ServerRPCStore.serverTimeMoment.valueOf();
    }

    this.bodies.colonies = empire.bodies.colonies;
    this.bodies.mystations = empire.bodies.mystations;
    this.bodies.ourstations = empire.bodies.ourstations;
    this.bodies.babies = empire.bodies.babies;
  }

  clear() {
    this.bodies.colonies = [];
    this.bodies.mystations = [];
    this.bodies.ourstations = [];
    this.bodies.babies = {};
    this.colonies = [];
    this.essentia = 0;
    this.exactEssentia = 0;
    this.has_new_messages = 0;
    this.home_planet_id = 0;
    this.id = 0;
    this.insurrect_value = 0;
    this.is_isolationist = 0;
    this.latest_message_id = 0;
    this.name = '';
    this.next_colony_cost = 0;
    this.next_colony_srcs = 0;
    this.next_station_cost = 0;
    this.planets = [];
    this.primary_embassy_id = 0;
    this.rpc_count = 0;
    this.self_destruct_active = 0;
    this.self_destruct_date = '';
    this.self_destruct_ms = 0;
    this.stations = [];
    this.status_message = '';
    this.tech_level = 0;
  }
}

export default new EmpireRPCStore();
