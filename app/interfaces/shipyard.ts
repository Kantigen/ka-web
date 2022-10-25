import { IntBool } from 'app/interfaces';

export interface BuildableFleet {
  attributes: {
    max_occupants: number;
    stealth: number;
    combat: number;
    hold_size: number;
    speed: number;
    berth_level: number;
  };
  can: IntBool,
  cost: {
    food: number;
    water: number;
    energy: number;
    ore: number;
    waste: number;
    seconds: number;
  }
  reason?: { 0: number, 1: string };
  tags: string[],
  type_human: string;
}

export interface FleetBeingWorkedOn {
  type: string;
  attributes: {
    max_occupants: number;
    stealth: number;
    combat: number;
    hold_size: number;
    speed: number;
    berth_level: number;
  };
  quantity: number;
  id: number;
  type_human: string;
  date_completed: string;
}

export interface ShipyardViewBuildQueueParams {
  building_id: number;
  page_number?: number;
  items_per_page?: number;
  no_paging?: IntBool;
};

export interface ShipyardViewBuildQueueResponse {
  number_of_fleets: number;
  cost_to_subsidize: number;
  fleets_building: Array<FleetBeingWorkedOn>;
};

export interface ShipyardGetBuildableParams {
  building_id: number;
  tag?: string;
};

export interface ShipyardGetBuildableResponse {
  build_queue_max: number;
  build_queue_used: number;
  docks_available: number;
  buildable: {
    [index: string]: BuildableFleet;
  }
};

export interface ShipyardBuildFleetParams {
  building_ids: number[];
  type: string;
  quantity: number;
  auto_select: string;
};

export interface ShipyardBuildFleetResponse extends ShipyardViewBuildQueueResponse {};
