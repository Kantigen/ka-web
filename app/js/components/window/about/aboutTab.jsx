import React from 'react';
import { observer } from 'mobx-react';

import ServerRPCStore from 'app/js/stores/rpc/server';

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

export default observer(AboutTab);
