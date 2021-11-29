'use strict';

require('shims/jquery');
require('shims/yahoo');

require('vendor-css/semantic.css');
require('vendor-css/vex.css');
require('vendor-css/vex-theme-default.css');
require('css/styles.css');
require('react-tabs/style/react-tabs.css');

require('js-yui/library');
require('js-yui/textboxList');
require('js-yui/smd');
require('js-yui/rpc');
require('js/game');
require('js-yui/announce');
require('js-yui/speciesDesigner');
require('js-yui/createSpecies');
require('js-yui/createEmpire');
require('js-yui/login');
require('js-yui/mapper');
require('js-yui/mapStar');
require('js-yui/mapPlanet');
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

    // Start everything!
    YAHOO.util.Event.throwErrors = true;
    YAHOO.widget.Logger.enableBrowserConsole();
    YAHOO.lacuna.Game.Start(query);
};

$(init);
