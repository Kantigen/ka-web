import React from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';

import WindowsStore from 'app/stores/windows';
import Panel from 'app/components/menu/panel';

import AboutWindow from 'app/components/about';
import EssentiaWindow from 'app/components/essentia';
import GenericBuildingWindow from 'app/components/genericBuilding';
import InviteWindow from 'app/components/invite';
import PlanetPanelWindow from 'app/components/planetPanel';
import ServerClockWindow from 'app/components/serverClock';
import StarPanelWindow from 'app/components/starPanel';

import { WindowDefinition } from 'app/interfaces';

interface WindowMap {
    [index: string]: WindowDefinition;
}

const map: WindowMap = {
    about: {
        component: AboutWindow,
        config: {
            title: 'About',
            width: 450,
            height: 400,
        },
    },

    essentia: {
        component: EssentiaWindow,
        config: {
            title: 'Essentia',
            width: 600,
            height: 350,
        },
    },

    genericBuilding: {
        component: GenericBuildingWindow,
        config: {
            title: 'Building',
            width: 700,
            height: 'auto',
        },
    },

    invite: {
        component: InviteWindow,
        config: {
            title: 'Invite a Friend',
            width: 450,
            height: 400,
        },
    },

    planetPanel: {
        component: PlanetPanelWindow,
        config: {
            title: 'Planet Details',
            width: 700,
            height: 450,
        },
    },

    serverClock: {
        component: ServerClockWindow,
        config: {
            title: 'Server Clock',
            width: 330,
            height: 'auto',
        },
    },

    starPanel: {
        component: StarPanelWindow,
        config: {
            title: 'Star Details',
            width: 700,
            height: 420,
        },
    },
};

const WindowManager: React.FunctionComponent = () => (
    <>
        {_.map(WindowsStore.windows, function (row, index) {
            return (
                <Panel
                    window={map[row.type]}
                    type={row.type}
                    options={row.options}
                    zIndex={row.zIndex}
                    key={index}
                />
            );
        })}
    </>
);

export default observer(WindowManager);
