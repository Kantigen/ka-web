import 'app/shims/jquery';
import 'app/shims/yahoo';

import 'app/vendor-css/semantic.css';
import 'app/vendor-css/vex.css';
import 'app/vendor-css/vex-theme-default.css';
import 'app/css/styles.css';
import 'react-tabs/style/react-tabs.css';

import 'app/js-yui/library';
import 'app/js-yui/textboxList';
import 'app/js-yui/smd';
import 'app/js-yui/rpc';
import 'app/js/game';
import 'app/js-yui/announce';
import 'app/js-yui/speciesDesigner';
import 'app/js-yui/createSpecies';
import 'app/js-yui/createEmpire';
import 'app/js-yui/login';
import 'app/js-yui/mapper';
import 'app/js-yui/mapStar';
import 'app/js-yui/mapPlanet';
import 'app/js-yui/messaging';
import 'app/js-yui/profile';
import 'app/js-yui/stats';
import 'app/js-yui/notify';
import 'app/js/components/menu';

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
