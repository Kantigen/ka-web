import React from 'react';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import _ from 'lodash';
import Icon from 'app/components/menu/icon';

import EmpireService from 'app/services/empire';
import EmpireRPCStore from 'app/stores/rpc/empire';
import ServerRPCStore from 'app/stores/rpc/server';
import MenuStore, { PLANET_MAP_MODE } from 'app/stores/menu';
import WindowsStore from 'app/stores/windows';
import MailWindowStore from 'app/stores/window/mail';
import StatsWindowStore from 'app/stores/window/stats';

class TopBar extends React.Component {
  render() {
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
          <div
            className={classnames('ui inverted compact small menu', {
              red: EmpireRPCStore.self_destruct_active,
              blue: !EmpireRPCStore.self_destruct_active,
            })}
          >
            <a className='item' onClick={() => MenuStore.toggleMapMode()}>
              <Icon
                style={MenuStore.mapMode === PLANET_MAP_MODE ? 'star_map' : 'planet_side'}
                title={MenuStore.mapMode === PLANET_MAP_MODE ? 'Star Map' : 'Back to Planet'}
                size='large'
              />
            </a>

            <a className='item' data-tip='Mail' onClick={() => MailWindowStore.show()}>
              <Icon style='inbox' size='large' />
              {EmpireRPCStore.has_new_messages > 0 ? (
                <div className='ui yellow label'>{EmpireRPCStore.has_new_messages}</div>
              ) : (
                ''
              )}
            </a>

            <a
              className='item'
              onClick={() => {
                WindowsStore.add('essentia');
              }}
            >
              <Icon style='essentia' size='large' />
              <div className='ui teal label'>{EmpireRPCStore.essentia}</div>
            </a>

            <a className='item' onClick={() => StatsWindowStore.show()}>
              <Icon style='stats' size='large' />
            </a>

            <a className='item' onClick={() => EmpireService.logout()}>
              <Icon style='logout' size='large' />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default observer(TopBar);
