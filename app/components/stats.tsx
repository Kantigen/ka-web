import React from 'react';
import { observer } from 'mobx-react';
import StatsWindowStore from 'app/stores/window/stats';

declare const YAHOO: any;

class StatsWindow extends React.Component {
    render() {
        if (StatsWindowStore.shown) {
            YAHOO.lacuna.Stats.show();
        }

        return <div></div>;
    }
}

export default observer(StatsWindow);
