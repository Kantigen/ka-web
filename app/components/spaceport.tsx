import React from 'react';
import _ from 'lodash';
import withBuildingTabs from 'app/hocs/withBuildingTabs';
import OwnFleetsTab from 'app/components/spacePort/ownFleetsTab';
import TravellingFleetsTab from 'app/components/spacePort/travellingFleetsTab';

export default withBuildingTabs({
  getTabs(building) {
    // tabs.push(
    //   <Tab
    //     title='Own Fleets'
    //     key='Own Fleets'
    //     onSelect={_.partial(SpacePortRPCActions.requestSpacePortRPCViewAllFleets, building.id)}
    //   >
    //     <SpacePortOwnFleetsTab />
    //   </Tab>
    // );

    // tabs.push(
    //   <Tab title='Foreign Orbiting' key='Foreign Orbiting'>
    //     <p>Not Yet Implemented</p>
    //   </Tab>
    // );
    // tabs.push(
    //   <Tab title='Battle Logs' key='Battle Logs'>
    //     <p>Not Yet Implemented</p>
    //   </Tab>
    // );
    // tabs.push(
    //   <Tab title='Send Fleet' key='Send Fleet'>
    //     <p>Not Yet Implemented</p>
    //     <p>This will combine the current 'send' and 'fleet' tabs</p>
    //   </Tab>
    // );

    return [
      {
        title: 'Travelling',
        component: () => <TravellingFleetsTab building={building} />,
      },
      {
        title: 'View',
        component: () => <OwnFleetsTab building={building} />,
      },
    ];
  },
});
