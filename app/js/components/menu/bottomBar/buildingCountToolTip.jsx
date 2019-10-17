'use strict';

var React = require('react');

class BuildingCountToolTip extends React.Component {
    render() {
        return (
            <div>
                Your current{' '}
                <a
                    target='_new'
                    href='http://community.lacunaexpanse.com/wiki/plots'
                >
                    plot-using
                </a>{' '}
                building count, and how many{' '}
                <a
                    target='_new'
                    href='http://community.lacunaexpanse.com/wiki/plots'
                >
                    plots
                </a>{' '}
                you have available.
            </div>
        );
    }
}

module.exports = BuildingCountToolTip;
