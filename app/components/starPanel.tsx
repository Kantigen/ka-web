import React from 'react';
import { Tabber } from 'app/components/tabber';

class StarPanel extends React.Component {
  render() {
    return (
      <Tabber
        tabs={[
          {
            title: 'Star Details',
            component: () => <p>Not Yet Implemented</p>,
          },
          {
            title: 'My Fleets',
            component: () => <p>Not Yet Implemented</p>,
          },
          {
            title: 'Foreign Fleets',
            component: () => <p>Not Yet Implemented</p>,
          },
        ]}
      />
    );
  }
}

export default StarPanel;
