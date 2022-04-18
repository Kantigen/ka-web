'use strict';

import React from 'react';
import { observer } from 'mobx-react';

import EmpireRPCStore from 'app/js/stores/rpc/empire';
import BoostsTab from 'app/js/components/window/essentia/boostsTab';
import GetEssentiaTab from 'app/js/components/window/essentia/getEssentiaTab';

import { Tabs, Tab } from 'app/js/components/tabber';

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

export default observer(Essentia);
