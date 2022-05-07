import React from 'react';

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
