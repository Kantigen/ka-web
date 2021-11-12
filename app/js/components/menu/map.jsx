'use strict';

var React = require('react');
var createReactClass = require('create-react-class');
var Reflux = require('reflux');

var BodyRPCStore = require('js/stores/rpc/body');
var MapModeStore = require('js/stores/menu/mapMode');
var PlanetStore = require('js/stores/menu/planet');
var MenuStore = require('js/stores/menu');

// TODO: factor out all this glue code

var Map = createReactClass({
    displayName: 'Map',

    mixins: [
        Reflux.connect(MapModeStore, 'mapMode'),
        Reflux.connect(BodyRPCStore, 'bodyRPC'),
        Reflux.connect(PlanetStore, 'planet'),
        Reflux.connect(MenuStore, 'menuVisible'),
    ],

    previousMapMode: '',
    previousPlanetId: '',

    componentDidUpdate() {
        // Do nothing if the menu isn't shown.
        if (this.state.menuVisible.show === false) {
            // Reset these values because we're *probably* logged out.
            this.previousMapMode = MapModeStore.PLANET_MAP_MODE;
            this.previousPlanetId = '';
            this.state.planet = '';
        }

        if (!this.state.planet) {
            return;
        }

        // console.log('Rendering map');
        // console.log('mapMode = ' + this.state.mapMode + '(' + this.previousMapMode + ')');
        // console.log('planet = ' + this.state.planet + '(' + this.previousPlanetId + ')');

        var Lacuna = YAHOO.lacuna;

        if (
            // Render if the planet id has changed... OR...
            this.previousPlanetId !== this.state.planet ||
            // Render if we've changed from the starMap to the planetMap
            (this.previousMapMode !== this.state.mapMode &&
                this.state.mapMode === MapModeStore.PLANET_MAP_MODE)
        ) {
            Lacuna.MapStar.MapVisible(false);
            Lacuna.MapPlanet.MapVisible(true);
            Lacuna.MapPlanet.Load(
                this.state.planet,
                true,
                this.state.mapMode === MapModeStore.STAR_MAP_MODE
            );

            this.previousPlanetId = this.state.planet;
            this.previousMapMode = this.state.mapMode;

            return;
        }

        if (
            this.state.mapMode !== this.previousMapMode &&
            this.state.mapMode === MapModeStore.STAR_MAP_MODE
        ) {
            // Render star map view.
            Lacuna.MapPlanet.MapVisible(false);
            Lacuna.MapStar.MapVisible(true);
            Lacuna.MapStar.Load();
            Lacuna.MapStar.Jump(this.state.bodyRPC.x, this.state.bodyRPC.y);

            this.previousPlanetId = this.state.planet;
            this.previousMapMode = this.state.mapMode;

            return;
        }
    },

    render: function() {
        return <div></div>;
    },
});

module.exports = Map;
