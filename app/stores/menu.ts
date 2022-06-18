import { makeAutoObservable } from 'mobx';

type MapMode = 'planetMap' | 'starMap';

export const PLANET_MAP_MODE = 'planetMap';
export const STAR_MAP_MODE = 'starMap';

class MenuStore {
  menuShown = false;

  leftSidebarShown = false;

  rightSidebarShown = false;

  loaderShown = false;

  mapMode: MapMode = PLANET_MAP_MODE;

  planetId = 0;

  constructor() {
    makeAutoObservable(this);
  }

  showMenu() {
    this.menuShown = true;
  }

  hideMenu() {
    this.menuShown = false;
  }

  showPlanetMap() {
    this.mapMode = PLANET_MAP_MODE;
  }

  showStarMap() {
    this.mapMode = STAR_MAP_MODE;
  }

  toggleMapMode() {
    this.mapMode = this.mapMode == PLANET_MAP_MODE ? STAR_MAP_MODE : PLANET_MAP_MODE;
  }

  changePlanet(id: number) {
    console.log(`Changing to planet (#${id}).`);
    this.mapMode = PLANET_MAP_MODE;
    this.planetId = id;
  }

  showLeftSidebar() {
    this.leftSidebarShown = true;
  }

  hideLeftSidebar() {
    this.leftSidebarShown = false;
  }

  showRightSidebar() {
    this.rightSidebarShown = true;
  }

  hideRightSidebar() {
    this.rightSidebarShown = false;
  }

  showLoader() {
    this.loaderShown = true;
  }

  hideLoader() {
    this.loaderShown = false;
  }
}

export default new MenuStore();
