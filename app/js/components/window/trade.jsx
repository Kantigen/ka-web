'use strict';

import PropTypes from 'prop-types';

import React from 'react';
import createReactClass from 'create-react-class';

import GenericBuildingStore from 'app/js/stores/rpc/genericBuilding';

import StandardTabs from 'app/js/components/window/building/standardTabs';
import BuildingInformation from 'app/js/components/window/building/information';

import { Tab, Tabs } from 'app/js/components/tabber';

var Trade = createReactClass({
    displayName: 'Trade',

    statics: {
        options: {
            title: 'Trade',
            width: 700,
            height: 420,
        },
    },

    propTypes: {
        options: PropTypes.object,
    },

    // mixins: [Reflux.connect(GenericBuildingStore, 'genericBuildingStore')],

    componentWillMount: function() {
        BuildingWindowActions.buildingWindowClear();
        TradeRPCActions.requestTradeRPCView(this.props.options.id);
    },

    closeWindow: function() {
        WindowActions.windowCloseByType('building');
    },

    render: function() {
        var building = this.state.genericBuildingStore;
        var tabs = StandardTabs.tabs(this.props.options, building);
        tabs.push(
            <Tab title='Push' key='Push'>
                <p>Not Yet Implemented!</p>
            </Tab>
        );

        tabs.push(
            <Tab title='Trades' key='Trades'>
                <p>Not Yet Implemented</p>
            </Tab>
        );
        tabs.push(
            <Tab title='My Trades' key='My Trades'>
                <p>Not Yet Implemented</p>
            </Tab>
        );
        tabs.push(
            <Tab title='Add Trade' key='Add Trade'>
                <p>Not Yet Implemented</p>
            </Tab>
        );

        tabs.push(
            <Tab title='Supply Chains' key='Supply Chains'>
                <p>Not Yet Implemented</p>
                <p>Will combine Supply Chains and Supply Ships</p>
            </Tab>
        );

        tabs.push(
            <Tab title='Waste Chain' key='Waste Chain'>
                <p>Not Yet Implemented</p>
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

export default Trade;
