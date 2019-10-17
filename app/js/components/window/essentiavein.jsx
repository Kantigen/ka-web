'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');
var Reflux = require('reflux');

var GenericBuildingStore = require('js/stores/genericBuilding');

var StandardTabs = require('js/components/window/building/standardTabs');

var BuildingInformation = require('js/components/window/building/information');
var DrainTab = require('js/components/window/essentiavein/drainTab');

var WindowActions = require('js/actions/window');
var BuildingWindowActions = require('js/actions/windows/building');

var EssentiaVeinRPCActions = require('js/actions/rpc/essentiaVein');

var Tabber = require('js/components/tabber');
var Tabs = Tabber.Tabs;
var Tab = Tabber.Tab;

var EssentiaVein = createReactClass({
    displayName: 'EssentiaVein',

    statics: {
        options: {
            title: 'Essentia Vein',
            width: 700,
            height: 420,
        },
    },

    propTypes: {
        options: PropTypes.object,
    },

    mixins: [Reflux.connect(GenericBuildingStore, 'genericBuildingStore')],

    componentWillMount: function() {
        BuildingWindowActions.buildingWindowClear();
        EssentiaVeinRPCActions.requestEssentiaVeinRPCView(
            this.props.options.id
        );
    },

    closeWindow: function() {
        WindowActions.windowCloseByType('building');
    },

    render: function() {
        var building = this.state.genericBuildingStore;
        var tabs = StandardTabs.tabs(this.props.options, building);

        tabs.push(
            <Tab title='Drain' key='Drain'>
                <DrainTab building={building} />
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

module.exports = EssentiaVein;
