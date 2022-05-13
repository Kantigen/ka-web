import React from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import _ from 'lodash';

import EmpireService from 'app/services/empire';
import EmpireRPCStore from 'app/stores/rpc/empire';
import ServerRPCStore from 'app/stores/rpc/server';
import MenuStore, { PLANET_MAP_MODE } from 'app/stores/menu';
import WindowsStore from 'app/stores/windows';
import MailWindowStore from 'app/stores/window/mail';
import StatsWindowStore from 'app/stores/window/stats';

class TopBar extends React.Component {
  mapButtonTip() {
    if (MenuStore.mapMode === PLANET_MAP_MODE) {
      return 'To Star Map';
    }
    return 'To Planet Map';
  }

  render() {
    const barClass = classnames('ui inverted compact small menu', {
      red: EmpireRPCStore.self_destruct_active,
      blue: !EmpireRPCStore.self_destruct_active,
    });

    return (
      <div
        className='ui centered grid'
        style={{
          zIndex: 2000,
          position: 'relative',
          top: 15,
        }}
      >
        <div className='center aligned column'>
          <div className={barClass} ref='bar'>
            <a
              className='item'
              data-tip={this.mapButtonTip()}
              onClick={() => MenuStore.toggleMapMode()}
            >
              <i className='map big icon' />
            </a>

            <a className='item' data-tip='Mail' onClick={() => MailWindowStore.show()}>
              <i className='mail big icon' />
              {EmpireRPCStore.has_new_messages > 0 ? (
                <div className='ui yellow label'>{EmpireRPCStore.has_new_messages}</div>
              ) : (
                ''
              )}
            </a>

            <a
              className='item'
              data-tip='Essentia'
              onClick={() => {
                WindowsStore.add('essentia');
              }}
            >
              <i className='money big icon' />
              <div className='ui teal label'>{EmpireRPCStore.essentia}</div>
            </a>

            <a
              className='item'
              data-tip='Universe Rankings'
              onClick={() => StatsWindowStore.show()}
            >
              <i className='find big icon' />
            </a>

            {ServerRPCStore.promotions.length > 0 ? (
              <a
                className='item'
                data-tip={
                  ServerRPCStore.promotions.length > 1 ? 'Active Promotions' : 'Active Promotion'
                }
                onClick={function () {
                  WindowsStore.add('promotions');
                }}
              >
                <i className='announcement big icon' />
                <div className='ui orange floated right circular label'>Event!</div>
              </a>
            ) : (
              ''
            )}

            <a className='item' data-tip='Sign Out' onClick={() => EmpireService.logout()}>
              <i className='power big icon' />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default observer(TopBar);