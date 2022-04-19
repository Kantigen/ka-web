import PropTypes from 'prop-types';

import React from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';

import BodyRPCStore from 'app/js/stores/rpc/body';
import GenericBuildingRPCStore from 'app/js/stores/rpc/genericBuilding';

import ActionButton from 'app/js/components/window/building/actionButton';
import ResourceProduction from 'app/js/components/window/building/resourceProduction';
import ResourceCost from 'app/js/components/window/building/resourceCost';
import ResourceLine from 'app/js/components/window/building/resourceLine';

import * as util from 'app/js/util';
import * as vex from 'app/js/vex';

class ProductionTab extends React.Component {
    onDemolishClick() {
        var name = this.props.building.name + ' ' + this.props.building.level;

        vex.confirm(
            'Are you sure you want to demolish your ' + name + '?',
            _.bind(function() {
                GenericBuildingRPCActions.requestGenericBuildingRPCDemolish(
                    this.props.building.url,
                    { building_id: this.props.building.id }
                );
            }, this)
        );
    }

    onDowngradeClick() {
        var name = this.props.building.name + ' ' + this.props.building.level;

        vex.confirm(
            'Are you sure you want to downgrade your ' + name + '?',
            _.bind(function() {
                GenericBuildingRPCActions.requestGenericBuildingRPCDowngrade(
                    this.props.building.url,
                    this.props.building.id
                );
            }, this)
        );
    }

    onUpgradeClick() {
        GenericBuildingRPCActions.requestGenericBuildingRPCUpgrade(
            this.props.building.url,
            this.props.building.id
        );
    }

    render() {
        var b = GenericBuildingRPCStore;
        var body = BodyRPCStore;

        // Don't let the user downgrade a level 1 building. They should demolish it instead.
        if (b.level === 1) {
            b.downgrade.can = 0;
            b.downgrade.reason = [1009, 'You cannot downgrade a level 1 building.', undefined];
        }

        return (
            <div className='ui grid'>
                <div className='ui centered row'>
                    <div className='five wide column'>
                        <div
                            style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            Current production
                        </div>
                    </div>
                    <div className='five wide column'>
                        <div
                            style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            Upgrade production
                        </div>
                    </div>
                    <div className='five wide column'>
                        <div
                            style={{
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            Upgrade cost
                        </div>
                    </div>
                </div>

                <div className='ui centered row'>
                    <div className='five wide column'>
                        <ResourceProduction icon='food' number={b.food_hour} />
                        <ResourceProduction icon='diamond' number={b.ore_hour} />

                        <ResourceProduction icon='theme' number={b.water_hour} />

                        <ResourceProduction icon='lightning' number={b.energy_hour} />

                        <ResourceProduction icon='trash' number={b.waste_hour} />

                        <ResourceProduction icon='smile' number={b.happiness_hour} />
                    </div>

                    <div className='five wide column'>
                        <ResourceProduction icon='food' number={b.upgrade.production.food_hour} />
                        <ResourceProduction icon='diamond' number={b.upgrade.production.ore_hour} />

                        <ResourceProduction icon='theme' number={b.upgrade.production.water_hour} />

                        <ResourceProduction
                            icon='lightning'
                            number={b.upgrade.production.energy_hour}
                        />

                        <ResourceProduction icon='trash' number={b.upgrade.production.waste_hour} />

                        <ResourceProduction
                            icon='smile'
                            number={b.upgrade.production.happiness_hour}
                        />
                    </div>

                    <div className='five wide column'>
                        <ResourceCost
                            icon='food'
                            number={b.upgrade.cost.food}
                            stored={body.food_stored}
                        />
                        <ResourceCost
                            icon='diamond'
                            number={b.upgrade.cost.ore}
                            stored={body.ore_stored}
                        />

                        <ResourceCost
                            icon='theme'
                            number={b.upgrade.cost.water}
                            stored={body.water_stored}
                        />

                        <ResourceCost
                            icon='lightning'
                            number={b.upgrade.cost.energy}
                            stored={body.energy_stored}
                        />

                        <ResourceCost icon='trash' number={b.upgrade.cost.waste} />

                        <ResourceLine
                            icon='wait'
                            title=''
                            content={util.formatTime(b.upgrade.cost.time)}
                        />
                    </div>
                </div>

                <div className='ui centered row'>
                    <div className='fifteen wide column'>
                        <div className='3 ui medium fluid buttons'>
                            <ActionButton
                                color='red'
                                actionName='Demolish'
                                onClick={() => this.onDemolishClick()}
                            />

                            <ActionButton
                                color='green'
                                actionName='Upgrade'
                                error={b.upgrade.can ? '' : b.upgrade.reason[1]}
                                onClick={() => this.onUpgradeClick()}
                            />

                            <ActionButton
                                color='blue'
                                actionName='Downgrade'
                                error={b.downgrade.can ? '' : b.downgrade.reason[1]}
                                onClick={() => this.onDowngradeClick()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default observer(ProductionTab);
