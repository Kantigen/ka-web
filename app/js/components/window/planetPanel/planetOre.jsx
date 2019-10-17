'use strict';

var React = require('react');
var createReactClass = require('create-react-class');
var Reflux = require('reflux');

var BodyRPCGetBodyStatusStore = require('js/stores/rpc/body/getBodyStatus');

var PlanetDetailLine = require('js/components/window/planetPanel/line');

var constants = require('js/constants');

var PlanetOre = createReactClass({
    displayName: 'PlanetOre',

    mixins: [
        Reflux.connect(BodyRPCGetBodyStatusStore, 'bodyRPCGetBodyStatusStore'),
    ],

    render: function() {
        var ores = constants.ORES;
        var bodyOre = this.state.bodyRPCGetBodyStatusStore.ore;

        var renderOres = [];
        for (var prop in ores) {
            if (ores.hasOwnProperty(prop)) {
                renderOres.push(
                    <PlanetDetailLine
                        title={ores[prop]}
                        value={bodyOre[prop]}
                    />
                );
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
