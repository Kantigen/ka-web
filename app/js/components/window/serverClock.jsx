'use strict';

var React = require('react');
var createReactClass = require('create-react-class');

var ServerRPCStore = require('js/stores/rpc/server');
var TickerStore = require('js/stores/ticker');

var ServerClock = createReactClass({
    displayName: 'ServerClock',

    statics: {
        options: {
            title: 'Server Clock',
            width: 330,
            height: 'auto',
        },
    },

    // mixins: [Reflux.connect(TickerStore, 'ticker'), Reflux.connect(ServerRPCStore, 'serverRPC')],

    closeWindow: function() {
        WindowActions.windowCloseByType('serverclock');
    },

    render: function() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <strong>Server</strong>
                            </td>
                            <td>{ServerRPCStoreRPC.serverFormattedTime}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Client</strong>
                            </td>
                            <td>{ServerRPCStoreRPC.clientFormattedTime}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Tick Count</strong>
                            </td>
                            <td>{this.state.ticker.clockTicks}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    },
});

module.exports = ServerClock;
