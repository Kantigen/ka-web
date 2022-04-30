import PropTypes from 'prop-types';

import React from 'react';
import createReactClass from 'create-react-class';

import GenericBuildingStore from 'app/stores/rpc/genericBuilding';

import StandardTabs from 'app/components/building/standardTabs';
import BuildingInformation from 'app/components/building/information';
import SpyTrainingStatus from 'app/components/spyTraining/spyTrainingStatus';
import { Tabs, Tab } from 'app/components/tabber';

const IntelTraining = createReactClass({
  displayName: 'IntelTraining',

  statics: {
    options: {
      title: 'Intel Training',
      width: 700,
      height: 420,
    },
  },

  propTypes: {
    options: PropTypes.object,
  },

  // mixins: [Reflux.connect(GenericBuildingStore, 'genericBuildingStore')],

  componentWillMount() {
    BuildingWindowActions.buildingWindowClear();
    IntelTrainingRPCActions.requestIntelTrainingRPCView(this.props.options.id);
  },

  closeWindow() {
    WindowActions.windowCloseByType('building');
  },

  render() {
    const building = this.state.genericBuildingStore;
    const tabs = StandardTabs.tabs(this.props.options, building);
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

export default IntelTraining;
