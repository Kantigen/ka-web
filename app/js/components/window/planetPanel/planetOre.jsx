'use strict';

var React = require('react');
var createReactClass = require('create-react-class');

var PlanetDetailLine = require('js/components/window/planetPanel/line');

var constants = require('js/constants');

var PlanetOre = createReactClass({
    displayName: 'PlanetOre',

    render: function() {
        var ores = constants.ORES;
        var bodyOre = BodyRPCStoreRPCGetBodyStatusStore.ore;

        var renderOres = [];
        for (var prop in ores) {
            if (ores.hasOwnProperty(prop)) {
                renderOres.push(<PlanetDetailLine title={ores[prop]} value={bodyOre[prop]} />);
            }
        }

        return (
            <div className='ui grid'>
                <div className='sixteen wide column'>{renderOres}</div>
            </div>
        );
    },
});

module.exports = PlanetOre;
