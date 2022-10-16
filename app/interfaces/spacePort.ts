import { ServerDate, IntBool } from 'app/interfaces';

export type Paging = {
  page_number: number;
  items_per_page: number;
};

export type Filter = {
  task?: string;
  tag?: string;
}

export type Fleet = {
  task: string;
  id: number,
  quantity: number;
  details: {
    hold_size: number,
    combat: number,
    efficiency: number,
    speed: number,
    date_started: ServerDate,
    max_occupants: number;
    date_available: ServerDate,
    mark: string;
    berth_level: number;
    can_rename: IntBool,
    name: string;
    stealth: number;
    type: string;
    build_tags: string[];
    can_recall: IntBool,
    payload: any,
    type_human: string;
    can_scuttle: IntBool;
  },
}

export interface SpacePortViewAllFleetsParams {
  building_id: number;
  paging?: Paging;
  filter?: Filter;
  sort?: string;
}

export interface SpacePortViewAllFleetsResponse {
  fleets: Fleet[],
  number_of_fleets: number;
}

export interface SpacePortViewTravellingFleetsParams {
  building_id: number;
  paging?: Paging;
  filter?: Filter;
  sort?: string;
}

export interface SpacePortViewTravellingFleetsResponse {
  travelling: Fleet[],
  number_of_fleets_travelling: number;
  number_of_ships_travelling: number;
}
