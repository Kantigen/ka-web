import React from 'react';
import { observer } from 'mobx-react';

import ServerRPCStore from 'app/js/stores/rpc/server';
import TickerStore from 'app/js/stores/ticker';
import WindowsStore from 'app/js/stores/windows';

class ServerClock extends React.Component {
    static options = {
        title: 'Server Clock',
        width: 330,
        height: 'auto',
    };

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
