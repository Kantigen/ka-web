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
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <strong>Server</strong>
                            </td>
                            <td>{ServerRPCStore.serverTimeFormatted}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Client</strong>
                            </td>
                            <td>{ServerRPCStore.clientTimeFormatted}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Tick Count</strong>
                            </td>
                            <td>{TickerStore.clockTicks}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

module.exports = observer(ServerClock);
