export type BuildingCoordinates = {
  x: number;
  y: number;
};

export type MatrixBuilding = {
  efficiency: number;
  id: number;
  image: string;
  level: number;
  name: string;
  url: string;
  x: number;
  y: number;
};

export type Matrix = undefined[][] | MatrixBuilding[][];

export type SelectedBuilding = undefined | BuildingCoordinates;
