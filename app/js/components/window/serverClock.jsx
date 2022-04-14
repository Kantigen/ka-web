'use strict';

var React = require('react');
var { observer } = require('mobx-react');

var ServerRPCStore = require('js/stores/rpc/server');
var TickerStore = require('js/stores/ticker');
var WindowsStore = require('js/stores/windows');

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
                <div class='ui row' style={{ marginBottom: 10 }}>
                    <div class='four wide column'>
                        <strong>Server</strong>
                    </div>
                    <div class='ten wide column'>{ServerRPCStore.serverTimeFormatted}</div>
                </div>

                <div class='ui row' style={{ marginBottom: 10 }}>
                    <div class='four wide column'>
                        <strong>Client</strong>
                    </div>
                    <div class='ten wide column'>{ServerRPCStore.clientTimeFormatted}</div>
                </div>

                <div class='ui row' style={{ marginBottom: 10 }}>
                    <div class='four wide column'>
                        <strong>Tick Count</strong>
                    </div>
                    <div class='ten wide column'>{TickerStore.clockTicks}</div>
                </div>
            </div>
        );
    }
}

module.exports = observer(ServerClock);
