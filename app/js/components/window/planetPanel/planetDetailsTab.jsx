'use strict';

var React = require('react');
var createReactClass = require('create-react-class');
var Reflux = require('reflux');

var BodyRPCStore = require('js/stores/rpc/body');

var PlanetDetails = require('js/components/window/planetPanel/planetDetails');
var PlanetOre = require('js/components/window/planetPanel/planetOre');

var PlanetDetailsTab = createReactClass({
    displayName: 'PlanetDetailsTab',
    mixins: [Reflux.connect(BodyRPCStore, 'bodyRPCStore')],

    render: function() {
        return (
            <div className='ui grid'>
                <div className='ui centered row'>
                    <div className='nine wide column'>
                        <div
                            style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            Planet Details
                        </div>
                    </div>
                    <div className='seven wide column'>
                        <div
                            style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            Ore
                        </div>
                    </div>
                </div>

                <div className='ui centered row'>
                    <div className='nine wide column'>
                        <PlanetDetails />
                    </div>
                    <div className='seven wide column'>
                        <PlanetOre />
                    </div>
                </div>
            </div>
        );
    },
});

module.exports = PlanetDetailsTab;
