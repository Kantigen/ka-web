import React from 'react';
import { observer } from 'mobx-react';

import ServerRPCStore from 'app/stores/rpc/server';

class AboutTab extends React.Component {
  render() {
    return (
      <div className='bulma'>
        <h1 className='title is-size-3'>Kenó Antigen</h1>

        <div className='block'>
          Copyright {new Date().getFullYear()} Kenó Antigen open source contributors. Originally
          forked from code provided by The Lacuna Expanse Corp copyright 2010.
        </div>

        <div className='block'>Server Version: {ServerRPCStore.version}</div>
      </div>
    );
  }
}

export default observer(AboutTab);
