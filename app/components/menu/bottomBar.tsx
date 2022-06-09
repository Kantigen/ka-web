import React from 'react';
import { observer } from 'mobx-react';

import BodyRPCStore from 'app/stores/rpc/body';
import ServerRPCStore from 'app/stores/rpc/server';
import EmpireRPCStore from 'app/stores/rpc/empire';

import BottomBarSection from 'app/components/menu/bottomBar/bottomBarSection';

import * as util from 'app/util';

const rn = util.reduceNumber;

class BottomBar extends React.Component {
  render() {
    return (
      <div
        className='ui centered grid'
        style={{
          zIndex: 2000,
          position: 'relative',
          top: 'calc(100vh - 185px)',
        }}
      >
        <div className='center aligned column'>
          <div className='ui blue inverted compact labeled icon menu small'>
            <BottomBarSection
              progressPercent={BodyRPCStore.food_percent_full}
              iconName='food'
              topText={`${rn(BodyRPCStore.food_stored)} / ${rn(BodyRPCStore.food_capacity)}`}
              bottomText={`${rn(BodyRPCStore.food_hour)} / hr`}
            />

            <BottomBarSection
              progressPercent={BodyRPCStore.ore_percent_full}
              iconName='ore'
              topText={`${rn(BodyRPCStore.ore_stored)} / ${rn(BodyRPCStore.ore_capacity)}`}
              bottomText={`${rn(BodyRPCStore.ore_hour)} / hr`}
            />

            <BottomBarSection
              progressPercent={BodyRPCStore.water_percent_full}
              iconName='water'
              topText={`${rn(BodyRPCStore.water_stored)} / ${rn(BodyRPCStore.water_capacity)}`}
              bottomText={`${rn(BodyRPCStore.water_hour)} / hr`}
            />

            <BottomBarSection
              progressPercent={BodyRPCStore.energy_percent_full}
              iconName='energy'
              topText={`${rn(BodyRPCStore.energy_stored)} / ${rn(BodyRPCStore.energy_capacity)}`}
              bottomText={`${rn(BodyRPCStore.energy_hour)} / hr`}
            />

            {BodyRPCStore.type !== 'space station' ? (
              <BottomBarSection
                progressPercent={BodyRPCStore.waste_percent_full}
                iconName='waste'
                topText={`${rn(BodyRPCStore.waste_stored)} / ${rn(BodyRPCStore.waste_capacity)}`}
                bottomText={`${rn(BodyRPCStore.waste_hour)} / hr`}
              />
            ) : (
              ''
            )}

            {BodyRPCStore.type !== 'space station' ? (
              <BottomBarSection
                iconName='happiness'
                topText={rn(BodyRPCStore.happiness)}
                bottomText={`${rn(BodyRPCStore.happiness_hour)} / hr`}
              />
            ) : (
              ''
            )}

            <BottomBarSection
              iconName='plots'
              topText={`${BodyRPCStore.building_count} / ${
                BodyRPCStore.building_count + BodyRPCStore.plots_available
              }`}
              bottomText={`${BodyRPCStore.plots_available} Available`}
              title='This is your current plot-using buildling count and how many plots you have available.'
            />

            <BottomBarSection
              iconName='build'
              topText={
                BodyRPCStore.build_queue_len +
                (BodyRPCStore.type !== 'space station' ? ` / ${BodyRPCStore.build_queue_size}` : '')
              }
              bottomText='Build Q'
              title={
                BodyRPCStore.type !== 'space station'
                  ? 'This is the number of buildings that are or can be queued for construction.'
                  : 'This is the number of modules are queued to be built. Space stations do not have a build queue limit.'
              }
            />

            <BottomBarSection
              iconName='dashboard'
              topText={`${EmpireRPCStore.rpc_count} / ${rn(ServerRPCStore.rpc_limit)}`}
              bottomText='Actions'
              title='This is the maximum number of requests you can send to the server in a 24 hour period.'
            />
          </div>
        </div>
      </div>
    );
  }
}

export default observer(BottomBar);
