import PropTypes from 'prop-types';

import React from 'react';
import createReactClass from 'create-react-class';

import GenericBuildingStore from 'app/js/stores/rpc/genericBuilding';

import StandardTabs from 'app/js/components/window/building/standardTabs';
import BuildingInformation from 'app/js/components/window/building/information';

import { Tab, Tabs } from 'app/js/components/tabber';

let Transporter = createReactClass({
    displayName: 'Transporter',

    statics: {
        options: {
            title: 'Transporter',
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
        TransporterRPCActions.requestTransporterRPCView(this.props.options.id);
    },

    closeWindow: function () {
        WindowActions.windowCloseByType('building');
    },

    render: function () {
        let building = this.state.genericBuildingStore;
        let tabs = StandardTabs.tabs(this.props.options, building);

        tabs.push(
            <Tab title='One For One' key='One For One'>
                <p>Not Yet Implemented</p>
            </Tab>
        );
        tabs.push(
            <Tab title='Push' key='Push'>
                <p>Not Yet Implemented</p>
            </Tab>
        );
        tabs.push(
            <Tab title='Available Trades' key='Available Trades'>
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

export default Transporter;
