import React from 'react';

import { Tab, Tabs } from 'app/components/tabber';

class StarPanel extends React.Component {
  closeWindow() {
    WindowActions.windowCloseByType('planetPanel');
  }

  render() {
    const tabs = [];
    tabs.push(
      <Tab title='Star Details' key='Star Details'>
        <p>Not Yet Implemented!</p>
      </Tab>
    );

    tabs.push(
      <Tab title='My Fleets' key='My Fleets'>
        <p>Not Yet Implemented</p>
      </Tab>
    );
    tabs.push(
      <Tab title='Foreign Fleets' key='Foreign Fleets'>
        <p>Not Yet Implemented</p>
      </Tab>
    );
    return (
      <div>
        <div>
          <Tabs>{tabs}</Tabs>
        </div>
      </div>
    );
  }
}

export default StarPanel;
