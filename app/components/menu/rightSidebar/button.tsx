import React from 'react';
import { observer } from 'mobx-react';

import BodyRPCStore from 'app/stores/rpc/body';
import MenuStore from 'app/stores/menu';

class RightSidebarButton extends React.Component {
  click() {
    MenuStore.showRightSidebar();
  }

  render() {
    return (
      <div
        style={{
          position: 'absolute',
          zIndex: 2500,
          right: '15px',
          top: '15px',
        }}
      >
        <div className='ui right labeled icon blue button' onClick={() => this.click()}>
          <i className='world icon' />
          {BodyRPCStore.name}
        </div>
      </div>
    );
  }
}

export default observer(RightSidebarButton);
