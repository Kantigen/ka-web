'use strict';

var React = require('react');
var { observer } = require('mobx-react');

class StatsWindow extends React.Component {
    static options = {
        title: 'Stats',
        width: 600,
        height: 400,
    };

    render() {
        return <div>This is the stats window.</div>;
    }
}

module.exports = observer(StatsWindow);
