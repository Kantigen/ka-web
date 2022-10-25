import { Building } from 'app/interfaces/building';
import { Tab } from 'app/interfaces/tabber';

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
  | 'starInfo';

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

export interface CaptchaWindowOptions {
  onCaptchaComplete(): void;
}

export interface StarInfoWindowOptions {
  color: string;
  id: number;
  name: string;
  x: number;
  y: number;
  zone: string;
  influence: number;
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

export interface BuildingComponentProps<Type = Building> {
  options: BuildingWindowOptions;
  building: Type;
}

export interface CustomBuildingComponent<Type = Building> {
  getTabs(building: Type, options: BuildingWindowOptions): Tab[];
}
