import React from 'react';
import { Tabber } from 'app/components/tabber';
import SendFleetsTab from 'app/components/starPanel/sendFleetsTab';

type Props = {
};

class StarPanel extends React.Component {
  render() {
    return (
      <>
        <div>Star details here..</div>
        <Tabber
          tabs={[
            {
              title: 'Send',
              component: () => <SendFleetsTab />,
            },
            {
              title: 'Foreign Fleets',
              component: () => <p>Not Yet Implemented</p>,
            },
          ]}
        />
      </>
    );
  }
}

export default StarPanel;
