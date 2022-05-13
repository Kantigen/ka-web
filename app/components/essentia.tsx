import React from 'react';

import EmpireRPCStore from 'app/stores/rpc/empire';
import BoostsTab from 'app/components/essentia/boostsTab';
import GetEssentiaTab from 'app/components/essentia/getEssentiaTab';

import { Tabber } from 'app/components/tabber';

class Essentia extends React.Component {
  render() {
    return (
      <Tabber
        tabs={[
          {
            title: 'Boosts',
            component: () => (
              <BoostsTab
                essentia={EmpireRPCStore.essentia}
                exactEssentia={EmpireRPCStore.exactEssentia}
              />
            ),
          },
          {
            title: 'Get More Essentia',
            component: () => <GetEssentiaTab />,
          },
        ]}
      />
    );
  }
}

export default Essentia;
