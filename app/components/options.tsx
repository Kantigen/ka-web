import React from 'react';
import { observer } from 'mobx-react';
import OptionsWindowStore from 'app/stores/window/options';

import YAHOO from 'app/shims/yahoo';

class OptionsWindow extends React.Component {
  render() {
    if (OptionsWindowStore.shown) {
      YAHOO.lacuna.Profile.show();
    }

    return <div />;
  }
}

export default observer(OptionsWindow);
