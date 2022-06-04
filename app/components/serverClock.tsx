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
      <div className='bulma'>
        <div className='block'>
          <div className='has-text-weight-bold mb-2'>Server</div>
          {ServerRPCStore.serverTimeFormatted}
        </div>

        <div className='block'>
          <div className='has-text-weight-bold mb-2'>Client</div>
          {ServerRPCStore.clientTimeFormatted}
        </div>

        <div className='blcok'>
          <div className='has-text-weight-bold mb-2'>Tick Count</div>
          {TickerStore.clockTicks}
        </div>
      </div>
    );
  }
}

export default observer(ServerClock);
