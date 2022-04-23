import React from 'react';
import { observer } from 'mobx-react';

import EmpireRPCStore from 'app/stores/rpc/empire';
import BoostsTab from 'app/components/essentia/boostsTab';
import GetEssentiaTab from 'app/components/essentia/getEssentiaTab';

import { Tabs, Tab } from 'app/components/tabber';

class Essentia extends React.Component {
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

export default Essentia;
