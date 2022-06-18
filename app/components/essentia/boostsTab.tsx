import React from 'react';
import { observer } from 'mobx-react';
import EmpireRPCStore from 'app/stores/rpc/empire';
import BoostsRPCStore from 'app/stores/rpc/empire/boosts';
import EmpireService from 'app/services/empire';

import Boost from 'app/components/essentia/boost';

class BoostsTab extends React.Component {
  componentDidMount() {
    EmpireService.getBoosts();
  }

  render() {
    return (
      <div className='ui grid'>
        <div className='centered row'>
          <div className='ui large green labels'>
            <div className='ui label'>
              Essentia
              <div className='detail'>{EmpireRPCStore.exactEssentia}</div>
            </div>
            <div className='ui label'>
              Boost Cost
              <div className='detail'>5 Essentia</div>
            </div>
          </div>
        </div>

        <div className='ui centered row'>
          <div className='eight wide column'>
            <Boost
              type='food'
              description='+25% Food / hr'
              iconStyle='food'
              ms={BoostsRPCStore.foodMsRemaining}
            />
            <Boost
              type='water'
              description='+25% Water / hr'
              iconStyle='water'
              ms={BoostsRPCStore.waterMsRemaining}
            />
            <Boost
              type='happiness'
              description='+25% Happiness / hr'
              iconStyle='happiness'
              ms={BoostsRPCStore.happinessMsRemaining}
            />
            <Boost
              type='building'
              description='+25% Building Construction Speed'
              iconStyle='build'
              ms={BoostsRPCStore.buildingMsRemaining}
            />
          </div>

          <div className='eight wide column'>
            <Boost
              type='ore'
              description='+25% Ore / hr'
              iconStyle='ore'
              ms={BoostsRPCStore.oreMsRemaining}
            />
            <Boost
              type='energy'
              description='+25% Energy / hr'
              iconStyle='energy'
              ms={BoostsRPCStore.energyMsRemaining}
            />
            <Boost
              type='storage'
              description='+25% Storage'
              iconStyle='storage'
              ms={BoostsRPCStore.storageMsRemaining}
            />
            <Boost
              type='spy_training'
              description='+50% Spy Training Speed'
              iconStyle='spy'
              ms={BoostsRPCStore.spyTrainingMsRemaining}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default observer(BoostsTab);
