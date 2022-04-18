'use strict';

var React = require('react');
var { observer } = require('mobx-react');

var EmpireRPCStore = require('app/js/stores/rpc/empire');
var BoostsRPCStore = require('app/js/stores/rpc/empire/boosts');
var BoostsTab = require('app/js/components/window/essentia/boostsTab');
var GetEssentiaTab = require('app/js/components/window/essentia/getEssentiaTab');

var { Tabs, Tab } = require('app/js/components/tabber');

class Essentia extends React.Component {
    static options = {
        title: 'Essentia',
        width: 600,
        height: 350,
    };

    closeWindow() {
        WindowsStore.close('essentia');
    }

    render() {
        return (
            <Tabs>
                <Tab title='Boosts'>
                    <BoostsTab
                        essentia={EmpireRPCStore.essentia}
                        exactEssentia={EmpireRPCStore.exactEssentia}
                    />
                </Tab>

                <Tab title='Get More Essentia'>
                    <GetEssentiaTab />
                </Tab>
            </Tabs>
        );
    }
}

module.exports = observer(Essentia);
