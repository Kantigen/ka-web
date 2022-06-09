import React from 'react';
import BodyRPCStore from 'app/stores/rpc/body';
import ResourceLine from 'app/components/building/resourceLine';
import { Building } from 'app/interfaces';
import * as util from 'app/util';

type Props = {
  building: Building;
};

class RepairTab extends React.Component<Props> {
  handleClick() {
    // GenericBuildingRPCActions.requestGenericBuildingRPCRepair(
    //   this.state.genericBuildingStore.url,
    //   this.state.genericBuildingStore.id
    // );
  }

  render() {
    const { building } = this.props;

    return (
      <div className='bulma'>
        <div className='columns'>
          <div className='column is-one-third'>
            <div className='has-text-weight-bold has-text-centered'>Repair costs</div>
          </div>
        </div>

        <div className='columns'>
          <div className='column is-one-third px-5'>
            <ResourceLine
              icon='food'
              content={util.reduceNumber(building.repair_costs.food)}
              title={util.commify(building.repair_costs.food)}
              red={building.repair_costs.food > BodyRPCStore.food_stored}
            />

            <ResourceLine
              icon='ore'
              content={util.reduceNumber(building.repair_costs.ore)}
              title={util.commify(building.repair_costs.ore)}
              red={building.repair_costs.ore > BodyRPCStore.ore_stored}
            />

            <ResourceLine
              icon='water'
              content={util.reduceNumber(building.repair_costs.water)}
              title={util.commify(building.repair_costs.water)}
              red={building.repair_costs.water > BodyRPCStore.water_stored}
            />

            <ResourceLine
              icon='energy'
              content={util.reduceNumber(building.repair_costs.energy)}
              title={util.commify(building.repair_costs.energy)}
              red={building.repair_costs.energy > BodyRPCStore.energy_stored}
            />
          </div>
        </div>

        <div className='columns'>
          <div className='column is-one-third'>
            <button className='button is-success is-fullwidth' onClick={() => this.handleClick()}>
              Repair
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default RepairTab;
