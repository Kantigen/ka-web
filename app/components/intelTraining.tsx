import React from 'react';
import SpyTrainingStatus from 'app/components/spyTraining/spyTrainingStatus';
import withBuildingTabs from 'app/hocs/withBuildingTabs';

export default withBuildingTabs({
  getTabs(building) {
    return [
      {
        title: 'Spy Training',
        component: () => <SpyTrainingStatus building={building} />,
      },
    ];
  },
});
