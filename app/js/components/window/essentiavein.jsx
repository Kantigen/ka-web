import PropTypes from 'prop-types';

import React from 'react';
import createReactClass from 'create-react-class';

import GenericBuildingStore from 'app/js/stores/rpc/genericBuilding';

import StandardTabs from 'app/js/components/window/building/standardTabs';

import BuildingInformation from 'app/js/components/window/building/information';
import DrainTab from 'app/js/components/window/essentiavein/drainTab';

import { Tabs, Tab } from 'app/js/components/tabber';

let EssentiaVein = createReactClass({
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

    componentWillMount: function () {
        BuildingWindowActions.buildingWindowClear();
        EssentiaVeinRPCActions.requestEssentiaVeinRPCView(this.props.options.id);
    },

    closeWindow: function () {
        WindowActions.windowCloseByType('building');
    },

    render: function () {
        let building = this.state.genericBuildingStore;
        let tabs = StandardTabs.tabs(this.props.options, building);

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

export default EssentiaVein;
