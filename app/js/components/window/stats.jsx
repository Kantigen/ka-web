'use strict';

var React = require('react');
var { observer } = require('mobx-react');
var StatsWindowStore = require('js/stores/windows/stats');

class StatsWindow extends React.Component {
    render() {
        if (StatsWindowStore.shown) {
            YAHOO.lacuna.Stats.show();
        }

        // TODO: make this into a React component!!

        return <div></div>;
    }
}

module.exports = observer(StatsWindow);
