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
