'use strict';

var React = require('react');
var createReactClass = require('create-react-class');
var Reflux = require('reflux');

var ServerRPCStore = require('js/stores/rpc/server');

var AboutTab = createReactClass({
    displayName: 'AboutTab',
    mixins: [Reflux.connect(ServerRPCStore, 'serverRPC')],

    render: function() {
        return (
            <div>
                <h1>Keno Antigen</h1>

                <p>
                    Copyright {new Date().getFullYear()} Keno Antigen open
                    source contributors. Originally forked from code provided by
                    The Lacuna Expanse Corp copyright 2010.
                </p>

                <p>Server Version: {this.state.serverRPC.version}.</p>
            </div>
        );
    },
});

module.exports = AboutTab;
