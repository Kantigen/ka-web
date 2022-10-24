import React from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';

import BodyRPCStore from 'app/stores/rpc/body';

import ActionButton from 'app/components/building/actionButton';
import ResourceLine from 'app/components/building/resourceLine';

import BuildingsService from 'app/services/buildings';
import WindowsStore from 'app/stores/windows';

import { Building } from 'app/interfaces';

import * as util from 'app/util';
import * as vex from 'app/vex';
import LegacyHooks from 'app/legacyHooks';

declare const YAHOO: any;

type Props = {
  building: Building;
};

class ProductionTab extends React.Component<Props> {
  onDemolishClick() {
    const { name, level, url, id } = this.props.building;
    const module = url.replace('/', '');

    vex.confirm(`Are you sure you want to demolish your ${name} ${level}?`, async () => {
      await BuildingsService.demolish(module, id);
      LegacyHooks.refreshPlanet();
      WindowsStore.closeAll();
    });
  }

  onDowngradeClick() {
    const { name, level, url, id } = this.props.building;
    const module = url.replace('/', '');

    vex.confirm(
      `Are you sure you want to downgrade your ${name} to level ${level - 1}?`,
      async () => {
        await BuildingsService.downgrade(module, id);
        LegacyHooks.refreshPlanet();
        WindowsStore.closeAll();
      }
    );
  }

  async onUpgradeClick() {
    const module = this.props.building.url.replace('/', '');
    const res = await BuildingsService.upgrade(module, this.props.building.id);

    YAHOO.lacuna.MapPlanet.ReloadBuilding({
      ...this.props.building,
      ...{
        pending_build: res.building.pending_build,
      },
    });

    WindowsStore.closeAll();
  }

  render() {
    const b = this.props.building;

    // Don't let the user downgrade a level 1 building. They should demolish it instead.
    if (b.level === 1) {
      b.downgrade.can = 0;
      b.downgrade.reason = [1009, 'You cannot downgrade a level 1 building.', undefined];
    }

    return (
      <div className='bulma'>
        <div className='columns'>
          <div className='column'>
            <div className='has-text-weight-bold has-text-centered'>Current production</div>
          </div>
          <div className='column'>
            <div className='has-text-weight-bold has-text-centered'>Upgrade production</div>
          </div>
          <div className='column'>
            <div className='has-text-weight-bold has-text-centered'>Upgrade cost</div>
          </div>
        </div>

        <div className='columns'>
          <div className='column is-one-third px-6'>
            <ResourceLine
              icon='food'
              content={`${util.reduceNumber(b.food_hour)} / hr`}
              title={util.commify(b.food_hour)}
            />
            <ResourceLine
              icon='ore'
              content={`${util.reduceNumber(b.ore_hour)} / hr`}
              title={util.commify(b.ore_hour)}
            />
            <ResourceLine
              icon='water'
              content={`${util.reduceNumber(b.water_hour)} / hr`}
              title={util.commify(b.water_hour)}
            />
            <ResourceLine
              icon='energy'
              content={`${util.reduceNumber(b.energy_hour)} / hr`}
              title={util.commify(b.energy_hour)}
            />
            <ResourceLine
              icon='waste'
              content={`${util.reduceNumber(b.waste_hour)} / hr`}
              title={util.commify(b.waste_hour)}
            />
            <ResourceLine
              icon='happiness'
              content={`${util.reduceNumber(b.food_hour)} / hr`}
              title={util.commify(b.food_hour)}
            />
          </div>

          <div className='column is-one-third px-6'>
            <ResourceLine
              icon='food'
              content={`${util.reduceNumber(b.upgrade.production.food_hour)} / hr`}
              title={util.commify(b.upgrade.production.food_hour)}
              red={b.food_hour - b.upgrade.production.food_hour > BodyRPCStore.food_hour}
            />
            <ResourceLine
              icon='ore'
              content={`${util.reduceNumber(b.upgrade.production.ore_hour)} / hr`}
              title={util.commify(b.upgrade.production.ore_hour)}
              red={b.ore_hour - b.upgrade.production.ore_hour > BodyRPCStore.ore_hour}
            />
            <ResourceLine
              icon='water'
              content={`${util.reduceNumber(b.upgrade.production.water_hour)} / hr`}
              title={util.commify(b.upgrade.production.water_hour)}
              red={b.water_hour - b.upgrade.production.water_hour > BodyRPCStore.water_hour}
            />
            <ResourceLine
              icon='energy'
              content={`${util.reduceNumber(b.upgrade.production.energy_hour)} / hr`}
              title={util.commify(b.upgrade.production.energy_hour)}
              red={b.energy_hour - b.upgrade.production.energy_hour > BodyRPCStore.energy_hour}
            />
            <ResourceLine
              icon='waste'
              content={`${util.reduceNumber(b.upgrade.production.waste_hour)} / hr`}
              title={util.commify(b.upgrade.production.waste_hour)}
            />
            <ResourceLine
              icon='happiness'
              content={`${util.reduceNumber(b.upgrade.production.food_hour)} / hr`}
              title={util.commify(b.upgrade.production.food_hour)}
            />
          </div>

          <div className='column is-one-third px-6'>
            <ResourceLine
              icon='food'
              content={util.reduceNumber(b.upgrade.cost.food)}
              title={util.commify(b.upgrade.cost.food)}
              red={b.upgrade.cost.food > BodyRPCStore.food_stored}
            />
            <ResourceLine
              icon='ore'
              content={util.reduceNumber(b.upgrade.cost.ore)}
              title={util.commify(b.upgrade.cost.ore)}
              red={b.upgrade.cost.ore > BodyRPCStore.ore_stored}
            />
            <ResourceLine
              icon='water'
              content={util.reduceNumber(b.upgrade.cost.water)}
              title={util.commify(b.upgrade.cost.water)}
              red={b.upgrade.cost.water > BodyRPCStore.water_stored}
            />
            <ResourceLine
              icon='energy'
              content={util.reduceNumber(b.upgrade.cost.energy)}
              title={util.commify(b.upgrade.cost.energy)}
              red={b.upgrade.cost.energy > BodyRPCStore.energy_stored}
            />
            <ResourceLine
              icon='waste'
              content={util.reduceNumber(b.upgrade.cost.waste)}
              title={util.commify(b.upgrade.cost.waste)}
            />
            <ResourceLine icon='time' content={util.formatTime(b.upgrade.cost.time)} title='' />
          </div>
        </div>

        <div className='columns'>
          <div className='column'>
            <ActionButton
              color='red'
              actionName='Demolish'
              onClick={() => this.onDemolishClick()}
            />
          </div>

          <div className='column'>
            <ActionButton
              color='green'
              actionName='Upgrade'
              error={b.upgrade.can ? '' : b.upgrade.reason[1]}
              onClick={() => this.onUpgradeClick()}
            />
          </div>

          <div className='column'>
            <ActionButton
              color='blue'
              actionName='Downgrade'
              error={b.downgrade.can ? '' : b.downgrade.reason[1]}
              onClick={() => this.onDowngradeClick()}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default observer(ProductionTab);
