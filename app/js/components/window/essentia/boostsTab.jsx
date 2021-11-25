'use strict';

var React = require('react');
var { observer } = require('mobx-react');
var EmpireRPCStore = require('js/stores/rpc/empire');
var BoostsRPCStore = require('js/stores/rpc/empire/boosts');
var EmpireService = require('js/services/empire');

var Boost = require('js/components/window/essentia/boost');

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
                            <div className='detail'>{EmpireRPCStore.exact_essentia}</div>
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
                            iconName='food'
                            ms={BoostsRPCStore.foodMsRemaining}
                        />
                        <Boost
                            type='water'
                            description='+25% Water / hr'
                            iconName='theme'
                            ms={BoostsRPCStore.waterMsRemaining}
                        />
                        <Boost
                            type='happiness'
                            description='+25% Happiness / hr'
                            iconName='smile'
                            ms={BoostsRPCStore.happinessMsRemaining}
                        />
                        <Boost
                            type='building'
                            description='+25% Building Construction Speed'
                            iconName='building outline'
                            ms={BoostsRPCStore.buildingMsRemaining}
                        />
                    </div>

                    <div className='eight wide column'>
                        <Boost
                            type='ore'
                            description='+25% Ore / hr'
                            iconName='diamond'
                            ms={BoostsRPCStore.oreMsRemaining}
                        />
                        <Boost
                            type='energy'
                            description='+25% Energy / hr'
                            iconName='lightning'
                            ms={BoostsRPCStore.energyMsRemaining}
                        />
                        <Boost
                            type='storage'
                            description='+25% Storage'
                            iconName='archive'
                            ms={BoostsRPCStore.storageMsRemaining}
                        />
                        <Boost
                            type='spy_training'
                            description='+50% Spy Training Speed'
                            iconName='protect'
                            ms={BoostsRPCStore.spyTrainingMsRemaining}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = observer(BoostsTab);
