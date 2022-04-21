import PropTypes from 'prop-types';

import React from 'react';
import createReactClass from 'create-react-class';

import GenericBuildingStore from 'app/js/stores/rpc/genericBuilding';

import StandardTabs from 'app/js/components/window/building/standardTabs';
import BuildingInformation from 'app/js/components/window/building/information';
import SpyTrainingStatus from 'app/js/components/window/spyTraining/spyTrainingStatus';

import { Tab, Tabs } from 'app/js/components/tabber';

let TheftTraining = createReactClass({
    displayName: 'TheftTraining',

    statics: {
        options: {
            title: 'Theft Training',
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
        TheftTrainingRPCActions.requestTheftTrainingRPCView(this.props.options.id);
    },

    closeWindow: function () {
        WindowActions.windowCloseByType('building');
    },

    render: function () {
        let building = this.state.genericBuildingStore;
        let tabs = StandardTabs.tabs(this.props.options, building);
        if (building.extraViewData.spies) {
            tabs.push(
                <Tab title='Spy Training' key='Spy Training'>
                    <SpyTrainingStatus
                        inTraining={building.extraViewData.spies.in_training}
                        pointsPerHour={building.extraViewData.spies.points_per}
                        maxPoints={building.extraViewData.spies.max_points}
                    />
                </Tab>
            );
        }

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

export default TheftTraining;
