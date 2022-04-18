'use strict';

import React from 'react';
import { observer } from 'mobx-react';
import StatsWindowStore from 'app/js/stores/window/stats';

class StatsWindow extends React.Component {
    render() {
        console.log('statswindow', StatsWindowStore.shown);
        if (StatsWindowStore.shown) {
            YAHOO.lacuna.Stats.show();
        }

        return <div></div>;
    }
}

export default observer(StatsWindow);
