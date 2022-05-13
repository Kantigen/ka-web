import React from 'react';
import createReactClass from 'create-react-class';

import BodyRPCStore from 'app/stores/rpc/body';

import ResourceCost from 'app/components/building/resourceCost';

const RepairTab = createReactClass({
  displayName: 'RepairTab',

  mixins: [
    // Reflux.connect(GenericBuildingStore, 'genericBuildingStore'),
    // Reflux.connect(BodyRPCStore, 'body'),
  ],

  handleClick() {
    GenericBuildingRPCActions.requestGenericBuildingRPCRepair(
      this.state.genericBuildingStore.url,
      this.state.genericBuildingStore.id
    );
  },

  render() {
    const building = this.state.genericBuildingStore;
    const body = BodyRPCStore;

    return (
      <div className='ui grid'>
        <div className='ui row'>
          <div className='five wide column'>
            <div
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              Repair costs
            </div>
          </div>
        </div>

        <div className='ui row'>
          <div className='five wide column'>
            <ResourceCost
              icon='food'
              number={building.repair_costs.food}
              stored={body.food_stored}
            />

            <ResourceCost
              icon='diamond'
              number={building.repair_costs.ore}
              stored={body.ore_stored}
            />

            <ResourceCost
              icon='theme'
              number={building.repair_costs.water}
              stored={body.water_stored}
            />

            <ResourceCost
              icon='lightning'
              number={building.repair_costs.energy}
              stored={body.energy_stored}
            />
          </div>
        </div>

        <div className='ui row'>
          <div className='five wide column'>
            <div className='ui medium fluid green button' onClick={this.handleClick}>
              Repair
            </div>
          </div>
        </div>
      </div>
    );
  },
});

export default RepairTab;
