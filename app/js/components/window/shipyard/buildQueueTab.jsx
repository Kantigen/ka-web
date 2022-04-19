import PropTypes from 'prop-types';

import React from 'react';
import createReactClass from 'create-react-class';

import BuildQueueShipyardRPCStore from 'app/js/stores/rpc/shipyard/buildQueue';

import BuildQueueItem from 'app/js/components/window/shipyard/buildQueue/item';

var BuildQueueTab = createReactClass({
    displayName: 'BuildQueueTab',

    propTypes: {
        buildingId: PropTypes.number.isRequired,
    },

    componentWillMount: function() {
        ShipyardRPCActions.requestShipyardRPCViewBuildQueue({
            building_id: this.props.buildingId,
        });
    },

    // mixins: [Reflux.connect(BuildQueueShipyardRPCStore, 'buildQueueStore')],

    render: function() {
        var fleetsBuilding = this.state.buildQueueStore.fleets_building;

        var buildQueueLen = fleetsBuilding.length;
        var fleetItems = [];

        for (var i = 0; i < buildQueueLen; i++) {
            fleetItems.push(
                <BuildQueueItem obj={fleetsBuilding[i]} buildingId={this.props.buildingId} />
            );
        }

        return (
            <div>
                <div>
                    You may subsidize the whole build queue for{' '}
                    {this.state.buildQueueStore.cost_to_subsidize} Essentia
                </div>

                <div className='ui sixteen column grid'>
                    <div className='row'>
                        <div className='column three wide'>Ship Type</div>
                        <div className='column four wide'>Number of ships</div>
                        <div className='column four wide'>Time to complete</div>
                        <div className='column five wide'>Subsidize cost</div>
                    </div>
                </div>

                <div className='ui divider'></div>

                <div>{fleetItems}</div>
            </div>
        );
    },
});

export default BuildQueueTab;
