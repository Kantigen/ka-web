'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');

var GenericBuildingStore = require('app/js/stores/rpc/genericBuilding');

var StandardTabs = require('app/js/components/window/building/standardTabs');
var BuildingInformation = require('app/js/components/window/building/information');
var Tabber = require('app/js/components/tabber');

var Tabs = Tabber.Tabs;
var Tab = Tabber.Tab;

var Transporter = createReactClass({
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

    componentWillMount: function() {
        BuildingWindowActions.buildingWindowClear();
        TransporterRPCActions.requestTransporterRPCView(this.props.options.id);
    },

    closeWindow: function() {
        WindowActions.windowCloseByType('building');
    },

    render: function() {
        var building = this.state.genericBuildingStore;
        var tabs = StandardTabs.tabs(this.props.options, building);

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

module.exports = Transporter;
