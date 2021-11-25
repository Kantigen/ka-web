'use strict';

var React = require('react');
var { observer } = require('mobx-react');

var ServerRPCStore = require('js/stores/rpc/server');

class AboutTab extends React.Component {
    render() {
        return (
            <div>
                <h1>Kenó Antigen</h1>

                <p>
                    Copyright {new Date().getFullYear()} Kenó Antigen open source contributors.
                    Originally forked from code provided by The Lacuna Expanse Corp copyright 2010.
                </p>

                <p>Server Version: {ServerRPCStore.version}.</p>
            </div>
        );
    }
}

module.exports = observer(AboutTab);
