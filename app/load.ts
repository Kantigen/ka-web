import $ from 'app/shims/jquery';
import YAHOO from 'app/shims/yahoo';

import 'app/vendor/fomantic/fomantic.css';
import 'vex-js/dist/css/vex.css';
import 'vex-js/dist/css/vex-theme-default.css';
import 'app/css/styles.css';
import 'app/css/bulma.scss';
import 'react-tabs/style/react-tabs.css';

import 'app/yui/library';
import 'app/yui/textboxList';
import 'app/yui/smd';
import 'app/yui/rpc';
import 'app/game';
import 'app/yui/announce';
import 'app/yui/speciesDesigner';
import 'app/yui/createSpecies';
import 'app/yui/createEmpire';
import 'app/yui/login';
import 'app/yui/mapper';
import 'app/yui/mapStar';
import 'app/yui/building';
import 'app/yui/building/archaeology';
import 'app/yui/building/blackHoleGenerator';
import 'app/yui/building/capitol';
import 'app/yui/building/development';
import 'app/yui/building/distributionCenter';
import 'app/yui/building/embassy';
import 'app/yui/building/energyReserve';
import 'app/yui/building/entertainment';
import 'app/yui/building/foodReserve';
import 'app/yui/building/geneticsLab';
import 'app/yui/building/intelligence';
import 'app/yui/building/libraryOfJith';
import 'app/yui/building/mercenariesGuild';
import 'app/yui/building/miningMinistry';
import 'app/yui/building/missionCommand';
import 'app/yui/building/network19';
import 'app/yui/building/observatory';
import 'app/yui/building/oreStorage';
import 'app/yui/building/park';
import 'app/yui/building/planetaryCommand';
import 'app/yui/building/security';
import 'app/yui/building/shipyard';
import 'app/yui/building/spacePort';
import 'app/yui/building/spaceStationLab';
import 'app/yui/building/subspaceSupplyDepot';
import 'app/yui/building/templeOfTheDrajilites';
import 'app/yui/building/theDillonForge';
import 'app/yui/building/themePark';
import 'app/yui/building/tradeMinistry';
import 'app/yui/building/transporter';
import 'app/yui/building/wasteExchanger';
import 'app/yui/building/wasteRecycling';
import 'app/yui/building/waterStorage';
import 'app/yui/module/parliament';
import 'app/yui/module/policeStation';
import 'app/yui/module/stationCommand';
import 'app/yui/mapPlanet';
import 'app/yui/messaging';
import 'app/yui/profile';
import 'app/yui/stats';
import 'app/yui/notify';

interface QueryParams {
  [index: string]: string;
}

const init = () => {
  // TODO this code can be improved.
  const l = window.location;
  const query: QueryParams = {};
  const vars = l.hash.substring(1).split('&');
  if (vars.length > 0) {
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      query[pair[0]] = decodeURIComponent(pair[1]);
    }
  }
  if (window.history.replaceState) {
    window.history.replaceState(
      {},
      document.title,
      `${l.protocol}//${l.host}${l.pathname}${l.search}`
    );
  } else if (l.hash !== '') {
    l.hash = '';
  }

  // Start everything!
  YAHOO.util.Event.throwErrors = true;
  YAHOO.widget.Logger.enableBrowserConsole();
  YAHOO.lacuna.Game.Start(query);
};

$(init);
