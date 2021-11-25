'use strict';

var React = require('react');
var { observer } = require('mobx-react');

var BodyRPCStore = require('js/stores/rpc/body');
var MenuStore = require('js/stores/menu');

// TODO: factor out all this glue code

class Map extends React.Component {
    previousMapMode = '';
    previousPlanetId = '';

    componentDidUpdate() {
        // Do nothing if the menu isn't shown.
        if (MenuStore.menuShown === false) {
            // Reset these values because we're *probably* logged out.
            this.previousMapMode = MenuStore.PLANET_MAP_MODE;
            this.previousPlanetId = '';
        }

        if (!MenuStore.planetId) {
            return;
        }

        // console.log('Rendering map');
        // console.log('mapMode = ' + MenuStore.mapMode + '(' + this.previousMapMode + ')');
        // console.log('planet = ' + MenuStore.planetId + '(' + this.previousPlanetId + ')');

        var Lacuna = YAHOO.lacuna;

        if (
            // Render if the planet id has changed... OR...
            this.previousPlanetId !== MenuStore.planetId ||
            // Render if we've changed from the starMap to the planetMap
            (this.previousMapMode !== MenuStore.mapMode &&
                MenuStore.mapMode === MenuStore.PLANET_MAP_MODE)
        ) {
            Lacuna.MapStar.MapVisible(false);
            Lacuna.MapPlanet.MapVisible(true);
            Lacuna.MapPlanet.Load(
                MenuStore.planetId,
                true,
                MenuStore.mapMode === MenuStore.STAR_MAP_MODE
            );

            this.previousPlanetId = MenuStore.planetId;
            this.previousMapMode = MenuStore.mapMode;

            return;
        }

        if (
            MenuStore.mapMode !== this.previousMapMode &&
            MenuStore.mapMode === MenuStore.STAR_MAP_MODE
        ) {
            // Render star map view.
            Lacuna.MapPlanet.MapVisible(false);
            Lacuna.MapStar.MapVisible(true);
            Lacuna.MapStar.Load();
            // Lacuna.MapStar.Jump(BodyRPCStore.x, BodyRPCStore.y);

            this.previousPlanetId = MenuStore.planetId;
            this.previousMapMode = MenuStore.mapMode;

            return;
        }
    }

    render() {
        //
        // We access these values so that MobX knows that we are interested in tracking them.
        // This component doesn't render anything so we need to be explicit about the values
        // we are using, allowing the framework to notify us appropriately.
        //
        const mapMode = MenuStore.mapMode;
        const planetId = MenuStore.planetId;

        return <div></div>;
    }
}

module.exports = observer(Map);
