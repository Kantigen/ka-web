import React from 'react';
import { observer } from 'mobx-react';
import StatsWindowStore from 'app/stores/window/stats';

import YAHOO from 'app/shims/yahoo';

class StatsWindow extends React.Component {
  componentDidUpdate() {
    if (StatsWindowStore.shown) {
      YAHOO.lacuna.Stats.show();
    }
  }

  render() {
    const { shown } = StatsWindowStore;
    return <div />;
  }
}

export default observer(StatsWindow);
