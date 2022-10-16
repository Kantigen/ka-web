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
  | 'starPanel';

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

export interface CaptchaWindowOptions {
  onCaptchaComplete: Function;
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

export interface BuildingComponentProps {
  options: BuildingWindowOptions;
  building: Building;
}

export interface CustomBuildingComponent {
  getTabs(building: Building, options: BuildingWindowOptions): Tab[];
}
