import PropTypes from 'prop-types';

import React from 'react';
import createReactClass from 'create-react-class';
import _ from 'lodash';

import GenericBuildingStore from 'app/stores/rpc/genericBuilding';

import StandardTabs from 'app/components/building/standardTabs';
import BuildingInformation from 'app/components/building/information';
import BuildFleetTab from 'app/components/shipyard/buildFleetTab';
import BuildQueueTab from 'app/components/shipyard/buildQueueTab';

import { Tab, Tabs } from 'app/components/tabber';

let Shipyard = createReactClass({
    displayName: 'Shipyard',

    statics: {
        options: {
            title: 'Shipyard',
            width: 700,
            height: 420,
        },
    },

    propTypes: {
        options: PropTypes.object,
    },

    // mixins: [Reflux.connect(GenericBuildingStore, 'genericBuildingStore')],

    componentWillMount: function () {
        BuildingWindowActions.buildingWindowClear();
        ShipyardRPCActions.requestShipyardRPCView(this.props.options.id);
    },

    closeWindow: function () {
        WindowActions.windowCloseByType('building');
    },

    render: function () {
        let building = this.state.genericBuildingStore;
        let tabs = StandardTabs.tabs(this.props.options, building);
        tabs.push(
            <Tab title='Build Queue' key='Build Queue'>
                <BuildQueueTab buildingId={building.id} />
            </Tab>
        );

        tabs.push(
            <Tab
                title='Build Ships'
                key='Build Ships'
                onSelect={_.partial(ShipyardRPCActions.requestShipyardRPCGetBuildable, building.id)}
            >
                <BuildFleetTab buildingId={building.id} />
            </Tab>
        );

        tabs.push(
            <Tab title='Repair Ships' key='Repair Ships'>
                <p>Not Yet Implemented</p>
                <p>
                    Fleets of ships damaged in an attack can be repaired (at less cost than building
                    from scratch
                </p>
            </Tab>
        );

        tabs.push(
            <Tab title='Refit Ships' key='Refit Ships'>
                <p>Not Yet Implemented</p>
                <p>Fleets of ships will be able to be upgraded to the empires current spec.</p>
            </Tab>
        );

        return (
            <div>
                <BuildingInformation options={this.props.options} />
                <div>
                    <Tabs>{tabs}</Tabs>
                </div>
            </div>
        );
    },
});

export default Shipyard;
