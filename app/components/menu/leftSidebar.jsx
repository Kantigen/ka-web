import React from 'react';
import { observer } from 'mobx-react';

import * as vex from 'app/vex';
import * as util from 'app/util';

import MenuStore from 'app/stores/menu';
import EmpireRPCStore from 'app/stores/rpc/empire';
import WindowsStore from 'app/stores/windows';
import OptionsWindowStore from 'app/stores/window/options';

// Because there's a bit of special logic going on here, this is in a separate component.
const SelfDestruct = observer(
  class SelfDestruct extends React.Component {
    handleDestructClick() {
      MenuStore.hideLeftSidebar();

      if (EmpireRPCStore.self_destruct_active === 1) {
        EmpireRPCActions.requestEmpireRPCDisableSelfDestruct();
        return;
      }

      vex.confirm(
        'Are you ABSOLUTELY sure you want to enable self destruct?  If enabled, your empire will be deleted after 24 hours.',
        EmpireRPCActions.requestEmpireRPCEnableSelfDestruct
      );
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

      const verb = destructActive ? 'Disable' : 'Enable';

      return (
        <a className='item' style={itemStyle} onClick={this.handleDestructClick}>
          <i className='bomb icon' />
          {verb} Self Destruct{' '}
          {destructActive ? (
            <span>
              <p
                style={{
                  margin: 0,
                }}
              >
                SELF DESTRUCT ACTIVE
              </p>
              <p
                style={{
                  textAlign: 'right !important',
                }}
              >
                {formattedDestructMs}
              </p>
            </span>
          ) : (
            ''
          )}
        </a>
      );
    }
  }
);

class LeftSidebar extends React.Component {
  componentDidMount() {
    $('#left-sidebar').sidebar({
      context: $('#sidebarContainer'),
      duration: 300,
      transition: 'overlay',
      onHidden: () => {
        MenuStore.hideLeftSidebar();
      },
    });
  }

  componentDidUpdate() {
    $('#left-sidebar').sidebar(MenuStore.leftSidebarShown ? 'show' : 'hide');
  }

  render() {
    const shown = MenuStore.leftSidebarShown;
    return (
      <div className='ui left vertical inverted sidebar menu' id='left-sidebar'>
        <div className='ui horizontal inverted divider'>Actions</div>

        <a
          className='item'
          onClick={function () {
            MenuStore.hideLeftSidebar();
            WindowsStore.add('invite');
          }}
        >
          <i className='add user icon' />
          Invite a Friend
        </a>
        <a
          className='item'
          onClick={function () {
            MenuStore.hideLeftSidebar();
            YAHOO.lacuna.MapPlanet.Refresh();
          }}
        >
          <i className='refresh icon' />
          Refresh
        </a>

        <div className='ui horizontal inverted divider'>Links</div>

        <a
          className='item'
          target='_blank'
          href='/starmap/'
          onClick={() => MenuStore.hideLeftSidebar()}
        >
          <i className='map icon' />
          Alliance Map
        </a>
        <a
          className='item'
          target='_blank'
          href='/changes.txt'
          onClick={() => MenuStore.hideLeftSidebar()}
        >
          <i className='code icon' />
          Changes Log
        </a>
        <a
          className='item'
          target='_blank'
          href='http://community.lacunaexpanse.com/forums'
          onClick={() => MenuStore.hideLeftSidebar()}
          rel='noreferrer'
        >
          <i className='comments layout icon' />
          Forums
        </a>
        <a
          className='item'
          target='_blank'
          href='http://www.lacunaexpanse.com/help/'
          onClick={() => MenuStore.hideLeftSidebar()}
          rel='noreferrer'
        >
          <i className='student icon' />
          Help
        </a>
        <a
          className='item'
          target='_blank'
          href='http://www.lacunaexpanse.com/terms/'
          onClick={() => MenuStore.hideLeftSidebar()}
          rel='noreferrer'
        >
          <i className='info circle icon' />
          Terms of Service
        </a>
        <a
          className='item'
          target='_blank'
          href='http://lacunaexpanse.com/tutorial/'
          onClick={() => MenuStore.hideLeftSidebar()}
          rel='noreferrer'
        >
          <i className='marker icon' />
          Tutorial
        </a>
        <a
          className='item'
          target='_blank'
          href='http://community.lacunaexpanse.com/wiki'
          onClick={() => MenuStore.hideLeftSidebar()}
          rel='noreferrer'
        >
          <i className='share alternate icon' />
          Wiki
        </a>

        <div className='ui horizontal inverted divider'>Windows</div>

        <a
          className='item'
          onClick={() => {
            MenuStore.hideLeftSidebar();
            WindowsStore.add('about');
          }}
        >
          <i className='rocket icon' />
          About
        </a>

        <a
          className='item'
          onClick={() => {
            MenuStore.hideLeftSidebar();
            OptionsWindowStore.show();
          }}
        >
          <i className='options icon' />
          Options
        </a>
        <a
          className='item'
          onClick={function () {
            MenuStore.hideLeftSidebar();
            WindowsStore.add('serverClock');
          }}
        >
          <i className='wait icon' />
          Server Clock
        </a>

        <div className='ui horizontal inverted divider'>Self Destruct</div>

        <SelfDestruct />
      </div>
    );
  }
}

export default observer(LeftSidebar);
