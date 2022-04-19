import { makeAutoObservable } from 'mobx';
import ServerRPCStore from 'app/js/stores/rpc/server';
import _ from 'lodash';
import * as util from 'app/js/util';
var int = util.int;

class BodyRPCStore {
    id = 0;
    x = 0;
    y = 0;
    star_id = '';
    star_name = '';
    orbit = 0;
    type = '';
    name = '';
    image = '';
    size = 0;
    water = 0;
    ore = {
        anthracite: 0,
        bauxite: 0,
        beryl: 0,
        chromite: 0,
        chalcopyrite: 0,
        fluorite: 0,
        galena: 0,
        goethite: 0,
        gold: 0,
        gypsum: 0,
        halite: 0,
        kerogen: 0,
        magnetite: 0,
        methane: 0,
        monazite: 0,
        rutile: 0,
        sulfur: 0,
        trona: 0,
        uraninite: 0,
        zircon: 0,
    };
    empire = {
        id: '',
        name: '',
        alignment: '',
        is_isolationist: 0,
    };
    station = {
        id: 0,
        x: 0,
        y: 0,
        name: '',
    };
    needs_surface_refresh = 0;
    building_count = 0;
    build_queue_size = 0;
    build_queue_len = 0;
    plots_available = 0;
    happiness = 0;
    happiness_hour = 0;
    unhappy_date = '01 13 2014 16:11:21 +0600';
    neutral_entry = '01 13 2014 16:11:21 +0600';
    propaganda_boost = 0;
    food_stored = 0;
    food_capacity = 0;
    food_hour = 0;
    energy_stored = 0;
    energy_capacity = 0;
    energy_hour = 0;
    ore_hour = 0;
    ore_capacity = 0;
    ore_stored = 0;
    waste_hour = 0;
    waste_stored = 0;
    waste_capacity = 0;
    water_stored = 0;
    water_hour = 0;
    water_capacity = 0;
    skip_incoming_ships = 0;
    num_incoming_enemy = 0;
    num_incoming_ally = 0;
    num_incoming_own = 0;
    incoming_enemy_ships = [];
    incoming_ally_ships = [];
    incoming_own_ships = [];
    food_percent_full = 0;
    ore_percent_full = 0;
    water_percent_full = 0;
    energy_percent_full = 0;
    waste_percent_full = 0;
    alliance = {
        id: '',
        name: '',
    };
    influence = {
        total: 0,
        spent: 0,
    };

    constructor() {
        makeAutoObservable(this);
    }

    clear() {}

    update(body) {
        this.id = body.id;
        this.x = int(body.x);
        this.y = int(body.y);
        this.star_id = body.star_id;
        this.star_name = body.star_name;
        this.orbit = int(body.orbit);
        this.type = body.type;
        this.name = body.name;
        this.image = body.image;
        this.size = body.size;
        this.water = body.water;

        this.ore.anthracite = body.ore.anthracite;
        this.ore.bauxite = body.ore.bauxite;
        this.ore.beryl = body.ore.beryl;
        this.ore.chromite = body.ore.chromite;
        this.ore.chalcopyrite = body.ore.chalcopyrite;
        this.ore.fluorite = body.ore.fluorite;
        this.ore.galena = body.ore.galena;
        this.ore.goethite = body.ore.goethite;
        this.ore.gold = body.ore.gold;
        this.ore.gypsum = body.ore.gypsum;
        this.ore.halite = body.ore.halite;
        this.ore.kerogen = body.ore.kerogen;
        this.ore.magnetite = body.ore.magnetite;
        this.ore.methane = body.ore.methane;
        this.ore.monazite = body.ore.monazite;
        this.ore.rutile = body.ore.rutile;
        this.ore.sulfur = body.ore.sulfur;
        this.ore.trona = body.ore.trona;
        this.ore.uraninite = body.ore.uraninite;
        this.ore.zircon = body.ore.zircon;

        this.empire.id = body.empire.id;
        this.empire.name = body.empire.name;
        this.empire.alignment = body.empire.alignment;
        this.empire.is_isolationist = body.empire.is_isolationist;
        this.station.id = body.station.id;
        this.station.x = body.station.x;
        this.station.y = body.station.y;
        this.station.name = body.station.name;
        this.needs_surface_refresh = body.needs_surface_refresh;
        this.building_count = int(body.building_count);
        this.build_queue_size = body.build_queue_size;
        this.build_queue_len = body.build_queue_len;
        this.plots_available = int(body.plots_available);
        this.happiness = body.happiness;
        this.happiness_hour = body.happiness_hour;
        this.unhappy_date = body.unhappy_date;
        this.neutral_entry = body.neutral_entry;
        this.propaganda_boost = body.propaganda_boost;
        this.food_stored = body.food_stored;
        this.food_capacity = body.food_capacity;
        this.food_hour = body.food_hour;
        this.energy_stored = body.energy_stored;
        this.energy_capacity = body.energy_capacity;
        this.energy_hour = body.energy_hour;
        this.ore_hour = body.ore_hour;
        this.ore_capacity = body.ore_capacity;
        this.ore_stored = body.ore_stored;
        this.waste_hour = body.waste_hour;
        this.waste_stored = body.waste_stored;
        this.waste_capacity = body.waste_capacity;
        this.water_stored = body.water_stored;
        this.water_hour = body.water_hour;
        this.water_capacity = body.water_capacity;
        this.skip_incoming_ships = body.skip_incoming_ships;
        this.num_incoming_own = int(body.num_incoming_own);
        this.num_incoming_ally = int(body.num_incoming_ally);
        this.num_incoming_enemy = int(body.num_incoming_enemy);
        this.incoming_enemy_ships = body.incoming_enemy_ships;
        this.incoming_ally_ships = body.incoming_ally_ships;
        this.incoming_own_ships = body.incoming_own_ships;
        this.alliance = body.alliance;
        this.influence = body.influence;

        var updateShip = function(ship) {
            ship.arrival_ms = util.serverDateToMs(ship.date_arrives) - ServerRPCStore.serverTimeMs;
            return ship;
        };

        _.map(this.incoming_own_ships, updateShip);
        _.map(this.incoming_ally_ships, updateShip);
        _.map(this.incoming_enemy_ships, updateShip);
    }

    tick() {
        var tickIncoming = function(ship) {
            ship.arrival_ms -= 1000;
            return ship;
        };

        _.map(this.incoming_own_ships, tickIncoming);
        _.map(this.incoming_ally_ships, tickIncoming);
        _.map(this.incoming_enemy_ships, tickIncoming);

        var tickResource = function(production, capacity, stored, stopAtZero) {
            var amount = production / 60 / 60;
            var rv = stored + amount;

            if (typeof capacity !== 'undefined' && rv > capacity) {
                return int(capacity);
            } else if (rv < 0 && stopAtZero) {
                return 0;
            } else {
                return int(rv);
            }
        };

        this.food_stored = tickResource(this.food_hour, this.food_capacity, this.food_stored, 1);
        this.ore_stored = tickResource(this.ore_hour, this.ore_capacity, this.ore_stored, 1);
        this.water_stored = tickResource(
            this.water_hour,
            this.water_capacity,
            this.water_stored,
            1
        );
        this.energy_stored = tickResource(
            this.energy_hour,
            this.energy_capacity,
            this.energy_stored,
            1
        );
        this.waste_stored = tickResource(
            this.waste_hour,
            this.waste_capacity,
            this.waste_stored,
            1
        );
        this.happiness = tickResource(this.happiness_hour, undefined, this.happiness, undefined);
    }

    get food_percent_full() {
        return int((this.food_stored / this.food_capacity) * 100);
    }

    get ore_percent_full() {
        return int((this.ore_stored / this.ore_capacity) * 100);
    }

    get water_percent_full() {
        return int((this.water_stored / this.water_capacity) * 100);
    }

    get energy_percent_full() {
        return int((this.energy_stored / this.energy_capacity) * 100);
    }

    get waste_percent_full() {
        return int((this.waste_stored / this.waste_capacity) * 100);
    }
}

export default new BodyRPCStore();
