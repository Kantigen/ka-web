'use strict';

const { makeAutoObservable } = require('mobx');
var _ = require('lodash');
var util = require('js/util');
var int = util.int;
var clone = util.clone;

function bodyObjectToArray(bodyObj) {
    var arr = [];
    _.each(bodyObj, function(value, key) {
        arr.push({
            id: key,
            name: value,
        });
    });

    // Sort by name.
    return _.sortBy(arr, 'name');
}

class EmpireRPCStore {
    bodies = {
        colonies: [],
        mystations: [],
        ourstations: [],
        babies: [],
    };
    colonies = [];
    essentia = 0;
    exactEssentia = 0;
    has_new_messages = 0;
    home_planet_id = '';
    id = '';
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

    update(empire) {
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
        //  ~ See also: Game.ProcessStatus.
        this.self_destruct_active = int(empire.self_destruct_active);
        this.exactEssentia = parseFloat(empire.essentia, 10);
        this.essentia = int(empire.essentia);
        if (empire.self_destruct_active) {
            this.self_destruct_ms =
                util.serverDateToMs(empire.self_destruct_date) - ServerRPCStore.serverTimeMoment;
        }

        // Fix up all the planet lists.
        empire.colonies = bodyObjectToArray(empire.colonies);
        empire.planets = bodyObjectToArray(empire.planets);
        empire.stations = bodyObjectToArray(empire.stations);
    }

    clear() {
        this.bodies.colonies = [];
        this.bodies.mystations = [];
        this.bodies.ourstations = [];
        this.bodies.babies = [];
        this.colonies = [];
        this.essentia = 0;
        this.exactEssentia = 0;
        this.has_new_messages = 0;
        this.home_planet_id = '';
        this.id = '';
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
        this.stations = [];
        this.status_message = '';
        this.tech_level = 0;
    }
}

module.exports = new EmpireRPCStore();
