import React from 'react';
import { observer } from 'mobx-react';

import ServerRPCStore from 'app/stores/rpc/server';
import TickerStore from 'app/stores/ticker';
import WindowsStore from 'app/stores/windows';

class ServerClock extends React.Component {
  closeWindow() {
    WindowsStore.close('serverClock');
  }

  render() {
    return (
      <div>
        <div className='ui row' style={{ marginBottom: 10 }}>
          <div className='four wide column'>
            <strong>Server</strong>
          </div>
          <div className='ten wide column'>{ServerRPCStore.serverTimeFormatted}</div>
        </div>

        <div className='ui row' style={{ marginBottom: 10 }}>
          <div className='four wide column'>
            <strong>Client</strong>
          </div>
          <div className='ten wide column'>{ServerRPCStore.clientTimeFormatted}</div>
        </div>

        <div className='ui row' style={{ marginBottom: 10 }}>
          <div className='four wide column'>
            <strong>Tick Count</strong>
          </div>
          <div className='ten wide column'>{TickerStore.clockTicks}</div>
        </div>
      </div>
    );
  }
}

export default observer(ServerClock);
