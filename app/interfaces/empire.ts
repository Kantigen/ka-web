import { ServerDate, IntBool, EmpireName } from 'app/interfaces';

export interface BodiesList {
  empire_id: number;
  empire_name: string;
  id: number;
  name: string;
  orbit: number;
  x: number;
  y: number;
  zone: string;
  type: string;
}

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
