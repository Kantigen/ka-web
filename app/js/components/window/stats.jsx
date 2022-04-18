'use strict';

var React = require('react');
var { observer } = require('mobx-react');
var StatsWindowStore = require('app/js/stores/window/stats');

class StatsWindow extends React.Component {
    render() {
        console.log('statswindow', StatsWindowStore.shown);
        if (StatsWindowStore.shown) {
            YAHOO.lacuna.Stats.show();
        }

        return <div></div>;
    }
}

module.exports = observer(StatsWindow);
