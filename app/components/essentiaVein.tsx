import React from 'react';
import DrainTab from 'app/components/essentiavein/drainTab';
import withBuildingTabs from 'app/hocs/withBuildingTabs';

export default withBuildingTabs({
  getTabs(building) {
    return [
      {
        title: 'Drain',
        component: () => <DrainTab building={building} />,
      },
    ];
  },
});
