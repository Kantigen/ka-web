import React from 'react';

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
  };
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

  // Essentia Vein
  drain_capable?: number;

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

export interface EmpireGetStatusParams {}

export interface EmpireGetStatusResponse {
  empire: {
    bodies: any;
    colonies: any;
    stations: any;
    planets: any;
    essentia: number;
    has_new_messages: number;
    home_planet_id: number;
    id: number;
    insurrect_value: number;
    is_isolationist: 0 | 1;
    latest_message_id: number;
    name: string;
    next_colony_cost: number;
    next_station_cost: number;
    primary_embassy_id: number;
    rpc_count: number;
    self_destruct_active: 0 | 1;
    self_destruct_date: string;
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

export interface EmpireLogoutParams {}

export interface EmpireLogoutResponse {
  logout: 0 | 1;
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
}

export interface BuildingWindowOptions {
  id: number;
  url: string;
}

export interface WindowConfig {
  title: string;
  width: number;
  height: number | 'auto';
}

export interface WindowDefinition {
  component: React.ReactNode;
  config: WindowConfig;
}

export type WindowType =
  | 'about'
  | 'captcha'
  | 'essentia'
  | 'genericBuilding'
  | 'invite'
  | 'planetPanel'
  | 'serverClock'
  | 'starPanel';
