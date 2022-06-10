import React from 'react';
import MenuStore from 'app/stores/menu';
import EmpireRPCStore from 'app/stores/rpc/empire';
import * as util from 'app/util';
import * as vex from 'app/vex';
import { observer } from 'mobx-react';

class SelfDestructButton extends React.Component {
  handleDestructClick() {
    MenuStore.hideLeftSidebar();

    vex.alert('Not implemented');

    // if (EmpireRPCStore.self_destruct_active === 1) {
    //   EmpireRPCActions.requestEmpireRPCDisableSelfDestruct();
    //   return;
    // }

    // vex.confirm(
    //   'Are you ABSOLUTELY sure you want to enable self destruct?  If enabled, your empire will be deleted after 24 hours.',
    //   EmpireRPCActions.requestEmpireRPCEnableSelfDestruct
    // );
  }

  render() {
    const destructMs = EmpireRPCStore.self_destruct_ms;
    const destructActive = EmpireRPCStore.self_destruct_active && destructMs > 0;
    const formattedDestructMs = destructActive ? util.formatMillisecondTime(destructMs) : '';

    const itemStyle = destructActive
      ? {
          color: 'red',
        }
      : {};

    return (
      <a className='item' style={itemStyle} onClick={this.handleDestructClick}>
        <i className='bomb icon' />
        {destructActive ? 'Disable' : 'Enable'} Self Destruct{' '}
        {destructActive ? (
          <span>
            <p style={{ margin: 0 }}>SELF DESTRUCT ACTIVE</p>
            <p style={{ textAlign: 'right' }}>{formattedDestructMs}</p>
          </span>
        ) : (
          ''
        )}
      </a>
    );
  }
}

export default observer(SelfDestructButton);
