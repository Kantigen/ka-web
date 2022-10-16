import { IntBool, ServerDate } from 'app/interfaces';

export interface BodyGetBuildingsParams {
  body_id: number;
}

export interface BodyGetBuildingsResponse {
  body: {
    surface_image: string;
  };
  buildings: {
    [index: string]: {
      efficiency: number;
      name: string;
      x: number;
      image: string;
      y: number;
      level: number;
      url: string;
    };
  };
}

export interface BodyGetStatusParams {
  0: number;
}

export interface BodyGetStatusResponse {
  body: {
    id: number;
    x: number;
    y: number;
    zone: string;
    star_id: number;
    star_name: string;
    orbit: number;
    type: string;
    name: string;
    image: string;
    size: number;
    water: number;

    ore: {
      anthracite: number;
      bauxite: number;
      beryl: number;
      chromite: number;
      chalcopyrite: number;
      fluorite: number;
      galena: number;
      goethite: number;
      gold: number;
      gypsum: number;
      halite: number;
      kerogen: number;
      magnetite: number;
      methane: number;
      monazite: number;
      rutile: number;
      sulfur: number;
      trona: number;
      uraninite: number;
      zircon: number;
    };

    //
    // This section only exists if an empire occupies it
    //
    empire?: {
      id: number;
      name: string;
      alignment: 'ally' | 'self' | 'hostile';
      is_isolationist: IntBool;
    };

    //
    // This section is included if the body is under the influence of a space station
    //
    station?: {
      id: number;
      x: number;
      y: number;
      name: string;
    };

    //
    // If the body belongs to us then extra information is included
    //
    needs_surface_refresh?: IntBool;
    building_count?: number;
    build_queue_size?: number;
    build_queue_len?: number;
    plots_available?: number;
    happiness?: number;
    happiness_hour?: number;
    unhappy_date?: ServerDate;
    neutral_entry?: ServerDate;
    propaganda_boost?: number;
    food_stored?: number;
    food_capacity?: number;
    food_hour?: number;
    energy_stored?: number;
    energy_capacity?: number;
    energy_hour?: number;
    ore_hour?: number;
    ore_capacity?: number;
    ore_stored?: number;
    population?: number;
    waste_hour?: number;
    waste_stored?: number;
    waste_capacity?: number;
    water_stored?: number;
    water_hour?: number;
    water_capacity?: number;
    skip_incoming_ships?: IntBool;
    num_incoming_enemy?: number;
    num_incoming_ally?: number;
    num_incoming_own?: number;
    incoming_enemy_ships?: any[];
    incoming_ally_ships?: any[];
    incoming_own_ships?: any[];

    //
    // If the body is a station the follwing information will be included:
    //
    alliance?: {
      id: number;
      name: string;
    };

    influence?: {
      total: number;
      spent: number;
    };
  };
}

export interface BodyRearrangeBuildingsParams {
  0: number;
  1: Array<{
    id: number;
    x: number;
    y: number;
  }>;
}

export interface BodyRearrangeBuildingsResponse {
  body: {
    surface_image: string;
  };
  moved: Array<{
    name: string;
    x: number;
    y: number;
    id: string;
  }>;
}
