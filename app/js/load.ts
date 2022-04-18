require('app/shims/jquery');
require('app/shims/yahoo');

require('app/vendor-css/semantic.css');
require('app/vendor-css/vex.css');
require('app/vendor-css/vex-theme-default.css');
require('app/css/styles.css');
require('react-tabs/style/react-tabs.css');

require('app/js-yui/library');
require('app/js-yui/textboxList');
require('app/js-yui/smd');
require('app/js-yui/rpc');
require('app/js/game');
require('app/js-yui/announce');
require('app/js-yui/speciesDesigner');
require('app/js-yui/createSpecies');
require('app/js-yui/createEmpire');
require('app/js-yui/login');
require('app/js-yui/mapper');
require('app/js-yui/mapStar');
require('app/js-yui/mapPlanet');
require('app/js-yui/messaging');
require('app/js-yui/profile');
require('app/js-yui/stats');
require('app/js-yui/notify');
require('app/js/components/menu');

declare const YAHOO: any;

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
