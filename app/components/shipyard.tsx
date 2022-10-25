import React from 'react';
import _ from 'lodash';
import BuildFleetTab from 'app/components/shipyard/buildFleetTab';
import BuildQueueTab from 'app/components/shipyard/buildQueueTab';
import withBuildingTabs from 'app/hocs/withBuildingTabs';

export default withBuildingTabs({
  getTabs(building) {
    return [
      {
        title: 'Build Queue',
        component: () => <BuildQueueTab building={building} />,
      },
      {
        title: 'Build Fleet',
        component: () => <BuildFleetTab building={building} />,
      },
      {
        title: 'Repair Ships',
        component: () => <></>,
      },
      {
        title: 'Refit Ships',
        component: () => <></>,
      },
    ];
  }
});
