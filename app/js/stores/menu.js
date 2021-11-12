'use strict';

const { makeAutoObservable } = require('mobx');

var PLANET_MAP_MODE = 'planetMap';
var STAR_MAP_MODE = 'starMap';

class MenuStore {
    show = false;
    mapMode = PLANET_MAP_MODE;
    planetId = 0;

    constructor() {
        makeAutoObservable(this);
    }

    showMenu() {
        this.show = true;
    }

    hideMenu() {
        this.show = false;
    }

    showPlanetMap() {
        this.mapMode = PLANET_MAP_MODE;
    }

    showStarMap() {
        this.mapMode = STAR_MAP_MODE;
    }

    changePlanet(id) {
        console.log('Changing to planet (#' + id + ').');
        this.mapMode = PLANET_MAP_MODE;
        this.planetId = id;
    }
}

module.exports = new MenuStore();
module.exports.PLANET_MAP_MODE = PLANET_MAP_MODE;
module.exports.STAR_MAP_MODE = STAR_MAP_MODE;
