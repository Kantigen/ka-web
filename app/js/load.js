'use strict';

require('vendor-css/yui-reset.css');
require('vendor-css/semantic.css');
require('vendor-css/vex.css');
require('vendor-css/vex-theme-default.css');
require('css/styles.css');
require('react-tabs/style/react-tabs.css');

require('shims/jquery');
require('shims/yahoo');

// RPC and core stuff
require('js-yui/library');
require('js-yui/textboxList');
require('js-yui/smd');
require('js-yui/rpc');
require('js/game');
require('js/dao');

// Empire management and star map
require('js-yui/announce');
require('js-yui/speciesDesigner');
require('js-yui/createSpecies');
require('js-yui/createEmpire');
require('js-yui/login');
require('js-yui/mapper');
require('js-yui/mapStar');

// Buildings
require('js-yui/building');
require('js-yui/building/archaeology');
require('js-yui/building/blackHoleGenerator');
require('js-yui/building/capitol');
require('js-yui/building/development');
require('js-yui/building/distributionCenter');
require('js-yui/building/embassy');
require('js-yui/building/energyReserve');
require('js-yui/building/entertainment');
require('js-yui/building/foodReserve');
require('js-yui/building/geneticsLab');
require('js-yui/building/intelligence');
require('js-yui/building/libraryOfJith');
require('js-yui/building/mercenariesGuild');
require('js-yui/building/miningMinistry');
require('js-yui/building/missionCommand');
require('js-yui/building/network19');
require('js-yui/building/observatory');
require('js-yui/building/oreStorage');
require('js-yui/building/park');
require('js-yui/building/planetaryCommand');
require('js-yui/building/security');
require('js-yui/building/shipyard');
require('js-yui/building/spacePort');
require('js-yui/building/spaceStationLab');
require('js-yui/building/subspaceSupplyDepot');
require('js-yui/building/templeOfTheDrajilites');
require('js-yui/building/themePark');
require('js-yui/building/theDillonForge');
require('js-yui/building/tradeMinistry');
require('js-yui/building/transporter');
require('js-yui/building/wasteExchanger');
require('js-yui/building/wasteRecycling');
require('js-yui/building/waterStorage');
require('js-yui/module/parliament');
require('js-yui/module/policeStation');
require('js-yui/module/stationCommand');

// Menu stuff
require('js-yui/mapPlanet');
require('js-yui/messaging');

require('js-yui/profile');
require('js-yui/stats');
require('js-yui/info');
require('js-yui/notify');
require('js/components/menu');

const init = () => {
    // TODO this code can be improved.
    var l = window.location;
    var query = {};
    var vars = l.hash.substring(1).split('&');
    if (vars.length > 0) {
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            query[pair[0]] = decodeURIComponent(pair[1]);
        }
    }
    if (window.history.replaceState) {
        window.history.replaceState(
            {},
            document.title,
            l.protocol + '//' + l.host + l.pathname + l.search
        );
    } else if (l.hash !== '') {
        l.hash = '';
    }

    var mocker = require('js/mock');
    if (process.env.KA_MOCK_SERVER) {
        mocker.setupMocking();
    }

    // Start everything!
    YAHOO.widget.Logger.enableBrowserConsole();
    YAHOO.lacuna.Game.Start(query);
};

$(init);
