import React from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';

import WindowsStore from 'app/stores/windows';
import Panel from 'app/components/menu/panel';

import AboutWindow from 'app/components/about';
import EssentiaVeinWindow from 'app/components/essentiaVein';
import EssentiaWindow from 'app/components/essentia';
import ForgotPasswordWindow from 'app/components/forgotPassword';
import GenericBuildingWindow from 'app/components/genericBuilding';
import IntelTrainingWindow from 'app/components/intelTraining';
import InviteWindow from 'app/components/invite';
import LoginWindow from 'app/components/login';
import MayhemTrainingWindow from 'app/components/mayhemTraining';
import PlanetPanelWindow from 'app/components/planetPanel';
import PoliticsTrainingWindow from 'app/components/politicsTraining';
import RearrangeBuildings from 'app/components/rearrangeBuildings/rearrangeBuildings';
import RegisterWindow from 'app/components/register';
import ServerClockWindow from 'app/components/serverClock';
import StarPanelWindow from 'app/components/starPanel';
import TheftTrainingWindow from 'app/components/theftTraining';

import { WindowDefinition } from 'app/interfaces';

interface WindowMap {
  [index: string]: WindowDefinition;
}

export const WindowMap: WindowMap = {
  about: {
    component: AboutWindow,
    config: {
      title: 'About',
      width: 450,
      height: 400,
    },
  },

  essentiavein: {
    component: EssentiaVeinWindow,
    config: {
      title: 'Essentia Vein',
      width: 700,
      height: 440,
    },
  },

  essentia: {
    component: EssentiaWindow,
    config: {
      title: 'Essentia',
      width: 600,
      height: 'auto',
    },
  },

  forgotPassword: {
    component: ForgotPasswordWindow,
    config: {
      title: 'Forgot Password',
      width: 400,
      height: 200,
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
      height: 'auto',
    },
  },

  inteltraining: {
    component: IntelTrainingWindow,
    config: {
      title: 'Intel Training',
      width: 700,
      height: 'auto',
    },
  },

  login: {
    component: LoginWindow,
    config: {
      title: 'Login',
      width: 350,
      height: 'auto',
      closable: false,
    },
  },

  mayhemtraining: {
    component: MayhemTrainingWindow,
    config: {
      title: 'Mayhem Training',
      width: 700,
      height: 'auto',
    },
  },

  planetPanel: {
    component: PlanetPanelWindow,
    config: {
      title: 'Planet Details',
      width: 700,
      height: 'auto',
    },
  },

  politicstraining: {
    component: PoliticsTrainingWindow,
    config: {
      title: 'Politics Training',
      width: 700,
      height: 'auto',
    },
  },

  rearrangeBuildings: {
    component: RearrangeBuildings,
    config: {
      title: 'Rearrange Buildings',
      width: 900,
      height: 'auto',
    },
  },

  register: {
    component: RegisterWindow,
    config: {
      title: 'Create Empire',
      width: 700,
      height: 'auto',
      closable: false,
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

  thefttraining: {
    component: TheftTrainingWindow,
    config: {
      title: 'Theft Training',
      width: 700,
      height: 'auto',
    },
  },
};

const WindowManager: React.FunctionComponent = () => (
  <>
    {_.map(WindowsStore.windows, (row, index) => (
      <Panel
        window={WindowMap[row.type]}
        type={row.type}
        options={row.options}
        zIndex={row.zIndex}
        key={index}
      />
    ))}
  </>
);

export default observer(WindowManager);
