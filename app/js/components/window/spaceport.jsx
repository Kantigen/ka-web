'use strict';

import PropTypes from 'prop-types';

import React from 'react';
import createReactClass from 'create-react-class';
import _ from 'lodash';

import GenericBuildingStore from 'app/js/stores/rpc/genericBuilding';
import BodyRPCStore from 'app/js/stores/rpc/body';

import StandardTabs from 'app/js/components/window/building/standardTabs';
import BuildingInformation from 'app/js/components/window/building/information';
import SpacePortOwnFleetsTab from 'app/js/components/window/spacePort/ownFleetsTab';

import { Tab, Tabs } from 'app/js/components/tabber';

var SpacePort = createReactClass({
    displayName: 'SpacePort',

    statics: {
        options: {
            title: 'SpacePort',
            width: 700,
            height: 420,
        },
    },

    propTypes: {
        options: PropTypes.object,
    },

    mixins: [
        // Reflux.connect(GenericBuildingStore, 'genericBuildingStore'),
        // Reflux.connect(BodyRPCStore, 'bodyStore'),
    ],

    componentWillMount: function() {
        BuildingWindowActions.buildingWindowClear();
        SpacePortRPCActions.requestSpacePortRPCView(this.props.options.id);
    },

    closeWindow: function() {
        WindowActions.windowCloseByType('building');
    },

    render: function() {
        var building = this.state.genericBuildingStore;
        var tabs = StandardTabs.tabs(this.props.options, building);
        tabs.push(
            <Tab
                title='Own Fleets'
                key='Own Fleets'
                onSelect={_.partial(
                    SpacePortRPCActions.requestSpacePortRPCViewAllFleets,
                    building.id
                )}
            >
                <SpacePortOwnFleetsTab />
            </Tab>
        );

        tabs.push(
            <Tab title='Foreign Orbiting' key='Foreign Orbiting'>
                <p>Not Yet Implemented</p>
            </Tab>
        );
        tabs.push(
            <Tab title='Battle Logs' key='Battle Logs'>
                <p>Not Yet Implemented</p>
            </Tab>
        );
        tabs.push(
            <Tab title='Send Fleet' key='Send Fleet'>
                <p>Not Yet Implemented</p>
                <p>This will combine the current 'send' and 'fleet' tabs</p>
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

export default SpacePort;
