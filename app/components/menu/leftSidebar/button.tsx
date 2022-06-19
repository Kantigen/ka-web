import React from 'react';
import { observer } from 'mobx-react';

import EmpireRPCStore from 'app/stores/rpc/empire';
import MenuStore from 'app/stores/menu';

class LeftSidebarButton extends React.Component {
  click() {
    MenuStore.showLeftSidebar();
  }

  render() {
    return (
      <div
        style={{
          position: 'absolute',
          zIndex: 2500,
          left: '15px',
          top: '15px',
        }}
      >
        <div className='ui left labeled icon blue button' onClick={() => this.click()}>
          <i className='content icon' />
          {EmpireRPCStore.name}
        </div>
      </div>
    );
  }
}

export default observer(LeftSidebarButton);
