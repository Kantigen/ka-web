import React from 'react';
import { observer } from 'mobx-react';

import BodyRPCStore from 'app/stores/rpc/body';
import MenuStore, { PLANET_MAP_MODE, STAR_MAP_MODE } from 'app/stores/menu';

declare const YAHOO: any;

// TODO: factor out all this glue code

class Map extends React.Component {
  previousMapMode = '';

  previousPlanetId = -1;

  componentDidUpdate() {
    // Do nothing if the menu isn't shown.
    if (MenuStore.menuShown === false) {
      // Reset these values because we're *probably* logged out.
      this.previousMapMode = PLANET_MAP_MODE;
      this.previousPlanetId = -1;
    }

    if (!MenuStore.planetId) {
      return;
    }

    // console.log('Rendering map');
    // console.log('mapMode = ' + MenuStore.mapMode + '(' + this.previousMapMode + ')');
    // console.log('planet = ' + MenuStore.planetId + '(' + this.previousPlanetId + ')');

    const Lacuna = YAHOO.lacuna;

    if (
      // Render if the planet id has changed... OR...
      this.previousPlanetId !== MenuStore.planetId ||
      // Render if we've changed from the starMap to the planetMap
      (this.previousMapMode !== MenuStore.mapMode && MenuStore.mapMode === PLANET_MAP_MODE)
    ) {
      Lacuna.MapStar.MapVisible(false);
      Lacuna.MapPlanet.MapVisible(true);
      Lacuna.MapPlanet.Load(MenuStore.planetId, true, MenuStore.mapMode === STAR_MAP_MODE);

      this.previousPlanetId = MenuStore.planetId;
      this.previousMapMode = MenuStore.mapMode;

      return;
    }

    if (MenuStore.mapMode !== this.previousMapMode && MenuStore.mapMode === STAR_MAP_MODE) {
      // Render star map view.
      Lacuna.MapPlanet.MapVisible(false);
      Lacuna.MapStar.MapVisible(true);
      Lacuna.MapStar.Load();
      Lacuna.MapStar.Jump(BodyRPCStore.x, BodyRPCStore.y);

      this.previousPlanetId = MenuStore.planetId;
      this.previousMapMode = MenuStore.mapMode;
    }
  }

  render() {
    //
    // We access these values so that MobX knows that we are interested in tracking them.
    // This component doesn't render anything so we need to be explicit about the values
    // we are using, allowing the framework to notify us appropriately.
    //
    const { mapMode } = MenuStore;
    const { planetId } = MenuStore;

    return <div />;
  }
}

export default observer(Map);
