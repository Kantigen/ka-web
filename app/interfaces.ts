import React from 'react';

export interface Window {
    type: WindowType;
    index: number,
    zIndex: number,
    options: WindowOptions,
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
    component: React.ReactNode,
    config: WindowConfig,
}

export type WindowType = 'about' |
    'captcha' |
    'essentia' |
    'genericBuilding' |
    'invite' |
    'planetPanel' |
    'serverClock' |
    'starPanel';
