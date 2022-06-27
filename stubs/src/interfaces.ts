import { Request, Response } from 'express';

export interface Route {
  [index: string]: (req: Request, res: Response) => any;
}

export interface RouteMapping {
  [index: string]: Route;
}
