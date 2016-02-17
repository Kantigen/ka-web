'use strict';

var React              = require('react');
var Reflux             = require('reflux');

var BuildingRPCStore   = require('js/stores/rpc/building');
var BodyRPCStore       = require('js/stores/rpc/body');

var ResourceProduction = require('js/components/windows/building/resourceProduction');
var ResourceCost       = require('js/components/windows/building/resourceCost');
var ResourceLine       = require('js/components/windows/building/resourceLine');

var util               = require('js/util');

var ProductionTab = React.createClass({

    mixins : [
        Reflux.connect(BuildingRPCStore, 'building'),
        Reflux.connect(BodyRPCStore, 'body')
    ],

    render : function() {
        var b    = this.state.building;
        var body = this.state.body;

        return (
            <div className="ui grid">

                <div className="ui centered row">
                    <div className="five wide column">
                        <div style={{
                            textAlign  : 'center',
                            fontWeight : 'bold'
                        }}>
                            Current production
                        </div>
                    </div>
                    <div className="five wide column">
                        <div style={{
                            textAlign  : 'center',
                            fontWeight : 'bold'
                        }}>
                            Upgrade production
                        </div>
                    </div>
                    <div className="five wide column">
                        <div style={{
                            textAlign  : 'center',
                            fontWeight : 'bold'
                        }}>
                            Upgrade cost
                        </div>
                    </div>
                </div>

                <div className="ui centered row">

                    <div className="five wide column">
                        <ResourceProduction
                            icon="food"
                            number={b.food_hour}
                        />
                        <ResourceProduction
                            icon="diamond"
                            number={b.ore_hour}
                        />

                        <ResourceProduction
                            icon="theme"
                            number={b.water_hour}
                        />

                        <ResourceProduction
                            icon="lightning"
                            number={b.energy_hour}
                        />

                        <ResourceProduction
                            icon="trash"
                            number={b.waste_hour}
                        />

                        <ResourceProduction
                            icon="smile"
                            number={b.happiness_hour}
                        />
                    </div>

                    <div className="five wide column">
                        <ResourceProduction
                            icon="food"
                            number={b.upgrade.production.food_hour}
                        />
                        <ResourceProduction
                            icon="diamond"
                            number={b.upgrade.production.ore_hour}
                        />

                        <ResourceProduction
                            icon="theme"
                            number={b.upgrade.production.water_hour}
                        />

                        <ResourceProduction
                            icon="lightning"
                            number={b.upgrade.production.energy_hour}
                        />

                        <ResourceProduction
                            icon="trash"
                            number={b.upgrade.production.waste_hour}
                        />

                        <ResourceProduction
                            icon="smile"
                            number={b.upgrade.production.happiness_hour}
                        />
                    </div>

                    <div className="five wide column">
                        <ResourceCost
                            icon="food"
                            number={b.upgrade.cost.food}
                            stored={body.food_stored}
                        />
                        <ResourceCost
                            icon="diamond"
                            number={b.upgrade.cost.ore}
                            stored={body.ore_stored}
                        />

                        <ResourceCost
                            icon="theme"
                            number={b.upgrade.cost.water}
                            stored={body.water_stored}
                        />

                        <ResourceCost
                            icon="lightning"
                            number={b.upgrade.cost.energy}
                            stored={body.energy_stored}
                        />

                        <ResourceCost
                            icon="trash"
                            number={b.upgrade.cost.waste}
                        />

                        <ResourceLine
                            icon="wait"
                            title=""
                            content={util.formatTime(b.upgrade.cost.time)}
                        />
                    </div>
                </div>

                <div className="ui centered row">
                    <div className="fifteen wide column">
                        <div className="3 ui medium fluid buttons">
                            <div className="ui red button">
                                Demolish
                            </div>
                            <div className="ui blue button">
                                Downgrade
                            </div>
                            <div className="ui green button">
                                Upgrade
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ProductionTab;
