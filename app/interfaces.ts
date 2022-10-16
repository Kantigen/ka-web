import { EmpireGetStatusResponse } from 'app/interfaces/empire';
import { BodyGetStatusResponse } from 'app/interfaces/body';

export * from 'app/interfaces/body';
export * from 'app/interfaces/building';
export * from 'app/interfaces/captcha';
export * from 'app/interfaces/empire';
export * from 'app/interfaces/essentiaVein';
export * from 'app/interfaces/spacePort';
export * from 'app/interfaces/stats';
export * from 'app/interfaces/window';

//
// TODO: figure out if we can enforce a date format using template types
//
export type ServerDate = string;
export type EmpireName = string;
export type IntBool = 0 | 1;

export interface StatusBlock {
  empire?: EmpireGetStatusResponse['empire'];
  body?: BodyGetStatusResponse['body'];
  server?: EmpireGetStatusResponse['server'];
}
