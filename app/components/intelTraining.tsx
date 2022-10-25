import React from 'react';
import SpyTrainingStatus from 'app/components/spyTraining/spyTrainingStatus';
import withBuildingTabs from 'app/hocs/withBuildingTabs';
import { SpyTrainingBuilding } from 'app/interfaces';

export default withBuildingTabs<SpyTrainingBuilding>({
  getTabs(building) {
    return [
      {
        title: 'Spy Training',
        component: () => <SpyTrainingStatus building={building} />,
      },
    ];
  },
});
