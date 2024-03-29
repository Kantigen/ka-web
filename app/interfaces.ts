import React from 'react';
import { BodiesList } from 'app/interfaces/empire';
import { Tab } from 'app/interfaces/tabber';

//
// TODO: figure out if we can enforce a date format using template types
//
export type ServerDate = string;
export type EmpireName = string;
export type IntBool = 0 | 1;

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

export interface Building {
  id: number;
  name: string;
  image: string;
  level: number;
  x: number;
  y: number;
  food_hour: number;
  food_capacity: number;
  energy_hour: number;
  energy_capacity: number;
  ore_hour: number;
  ore_capacity: number;
  water_hour: number;
  water_capacity: number;
  waste_hour: number;
  waste_capacity: number;
  happiness_hour: number;
  efficiency: number;
  url: string;

  // Essentia Vein
  drain_capable?: number;

  // Spy training buildings
  spies?: {
    max_points: number;
    points_per: number;
    in_training: number;
  };

  repair_costs: {
    food: number;
    water: number;
    energy: number;
    ore: number;
  };

  downgrade: {
    can: number;
    reason: any[];
    image: string;
  };

  upgrade: {
    can: number;
    reason: any[];

    cost: {
      food: number;
      water: number;
      energy: number;
      waste: number;
      ore: number;
      time: number;
      halls: number;
    };
    production: {
      food_hour: number;
      food_capacity: number;
      energy_hour: number;
      energy_capacity: number;
      ore_hour: number;
      ore_capacity: number;
      water_hour: number;
      water_capacity: number;
      waste_hour: number;
      waste_capacity: number;
      happiness_hour: number;
    };
    image: string;
  };
}

export interface BuildingsViewResponse {
  building: Building;
}

export interface CaptchaFetchParams {}

export interface BuildingsUpgradeParams {
  0: number;
}

export interface BuildingsUpgradeResponse {
  building: {
    id: number;
    pending_build: {
      seconds_remaining: number;
      start: ServerDate;
      end: ServerDate;
    };
    level: number;
  };
}

export interface BuildingsDowngradeParams {
  0: number;
}

export interface BuildingsDowngradeResponse {}

export interface BuildingsDemolishParams {
  0: number;
}

export interface BuildingsDemolishResponse {
  building: Building;
}

export interface CaptchaFetchResponse {
  guid: string;
  url: string;
}

export interface CaptchaSolveParams {
  guid: string;
  solution: string;
}

export interface CaptchaSolveResponse {}

export interface EmpireCreateParams {
  name: string;
  password: string;
  password1: string;
  captcha_guid: string;
  captcha_solution: string;
  email: string;
  invite_code?: string;
}

export interface EmpireCreateResponse {
  empire_id: number;
}

export interface EmpireGetBoostsParams {}

export interface EmpireGetBoostsResult {
  boosts: {
    food: ServerDate;
    ore: ServerDate;
    energy: ServerDate;
    water: ServerDate;
    happiness: ServerDate;
    storage: ServerDate;
    building: ServerDate;
    ship_build: ServerDate;
    ship_speed: ServerDate;
    spy_training: ServerDate;
  };
}

export interface EmpireBoostParams {
  type: string;
  weeks?: number;
}

export interface EmpireGetStatusParams {}

export interface EmpireGetStatusResponse {
  empire: {
    bodies: {
      colonies: BodiesList[];
      mystations?: BodiesList[];
      ourstations?: BodiesList[];
      babies?: {
        [index: string]: {
          alliance_id?: number;
          id: number;
          has_new_messages: number;
          bodies: BodiesList[];
        };
      };
    };
    essentia: number;
    has_new_messages: number;
    home_planet_id: number;
    id: number;
    insurrect_value: number;
    is_isolationist: IntBool;
    latest_message_id: number;
    name: EmpireName;
    next_colony_cost: number;
    next_colony_srcs: number;
    next_station_cost: number;
    primary_embassy_id: number;
    rpc_count: number;
    self_destruct_active: IntBool;
    self_destruct_date: ServerDate;
    status_message: string;
    tech_level: number;
  };
  server: {
    rpc_limit: number;
    star_map_size: {
      x: Array<2>;
      y: Array<2>;
      z: Array<2>;
    };
    time: string;
    version: string;
  };
}

export interface EmpireFetchCaptchaParams {}

export interface EmpireFetchCaptchaResponse {
  guid: string;
  url: string;
}

export interface EmpireLoginParams {
  name: string;
  password: string;
  api_key: string;
  browser: string;
}

export interface EmpireLoginResponse {
  session_id: string;
}

export interface EmpireLogoutParams {}

export interface EmpireLogoutResponse {
  logout: IntBool;
}

export interface EssentiaVeinDrainParams {
  0: number;
  1: number;
}

export interface EssentiaVeinDrainResponse {
  building: Building;
}

export interface Window {
  type: WindowType;
  index: number;
  zIndex: number;
  options: WindowOptions;
}

export interface WindowOptions {
  id?: number | string;
  url?: string;
  onCaptchaComplete?: Function;
}

export interface BuildingWindowOptions {
  id: number;
  url: string;
  image: string;
  name: string;
  level: number;
}

export interface WindowConfig {
  title: string;
  width: number;
  height: number | 'auto';
  closable?: boolean;
}

export interface WindowDefinition {
  component: React.ComponentType<any>;
  config: WindowConfig;
}

export interface StatsCreditsParams {}

export interface StatsCreditsResult {
  [index: number]: {
    [index: string]: string[];
  };
}

export type WindowType =
  | 'about'
  | 'captcha'
  | 'essentia'
  | 'forgotPassword'
  | 'genericBuilding'
  | 'invite'
  | 'login'
  | 'planetPanel'
  | 'rearrangeBuildings'
  | 'register'
  | 'serverClock'
  | 'starPanel';

export interface BuildingComponentProps {
  options: BuildingWindowOptions;
  building: Building;
}

export interface StatusBlock {
  empire?: EmpireGetStatusResponse['empire'];
  body?: BodyGetStatusResponse['body'];
  server?: EmpireGetStatusResponse['server'];
}

export interface CustomBuildingComponent {
  getTabs(building: Building, options: BuildingWindowOptions): Tab[];
}
