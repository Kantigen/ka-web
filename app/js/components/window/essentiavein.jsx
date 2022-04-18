'use strict';

var PropTypes = require('prop-types');

var React = require('react');
var createReactClass = require('create-react-class');

var GenericBuildingStore = require('app/js/stores/rpc/genericBuilding');

var StandardTabs = require('app/js/components/window/building/standardTabs');

var BuildingInformation = require('app/js/components/window/building/information');
var DrainTab = require('app/js/components/window/essentiavein/drainTab');

var { Tabs, Tab } = require('app/js/components/tabber');

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

    // mixins: [Reflux.connect(GenericBuildingStore, 'genericBuildingStore')],

    componentWillMount: function() {
        BuildingWindowActions.buildingWindowClear();
        EssentiaVeinRPCActions.requestEssentiaVeinRPCView(this.props.options.id);
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
