import React from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';

import WindowsStore from 'app/js/stores/windows';
import Panel from 'app/js/components/window/panel';

import AboutWindow from 'app/js/components/window/about';
import EssentiaWindow from 'app/js/components/window/essentia';
import GenericBuildingWindow from 'app/js/components/window/genericBuilding';
import InviteWindow from 'app/js/components/window/invite';
import PlanetPanelWindow from 'app/js/components/window/planetPanel';
import ServerClockWindow from 'app/js/components/window/serverClock';
import StarPanelWindow from 'app/js/components/window/starPanel';

const WINDOW_MAP = {
    about: AboutWindow,
    essentia: EssentiaWindow,
    genericBuilding: GenericBuildingWindow,
    invite: InviteWindow,
    planetPanel: PlanetPanelWindow,
    serverClock: ServerClockWindow,
    starPanel: StarPanelWindow,
};

class WindowManager extends React.Component {
    render() {
        return (
            <React.Fragment>
                {_.map(WindowsStore.windows, function(row, index) {
                    return (
                        <Panel
                            window={WINDOW_MAP[row.type]}
                            type={row.type}
                            options={row.options}
                            zIndex={row.zIndex}
                            key={index}
                        />
                    );
                })}
            </React.Fragment>
        );
    }
}

export default observer(WindowManager);
