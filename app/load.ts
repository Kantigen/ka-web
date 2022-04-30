import 'app/shims/jquery';
import 'app/shims/yahoo';

import 'fomantic-ui/dist/semantic.css';
import 'vex-js/dist/css/vex.css';
import 'vex-js/dist/css/vex-theme-default.css';
import 'app/css/styles.css';
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
import 'app/yui/mapPlanet';
import 'app/yui/messaging';
import 'app/yui/profile';
import 'app/yui/stats';
import 'app/yui/notify';

declare const YAHOO: any;

const init = () => {
  // TODO this code can be improved.
  let l = window.location;
  let query = {};
  let vars = l.hash.substring(1).split('&');
  if (vars.length > 0) {
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split('=');
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
