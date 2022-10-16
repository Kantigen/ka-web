import React from 'react';

import { observer } from 'mobx-react';

import SelfDestructButton from 'app/components/menu/leftSidebar/selfDestructButton';

import MenuStore from 'app/stores/menu';
import WindowsStore from 'app/stores/windows';
import OptionsWindowStore from 'app/stores/window/options';
import LegacyHooks from 'app/legacyHooks';

class LeftSidebar extends React.Component {
  componentDidMount() {
    //@ts-expect-error
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
    //@ts-expect-error
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
            WindowsStore.add('rearrangeBuildings');
          }}
        >
          <i className=' icon' />
          Rearrange Buildings
        </a>
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
            LegacyHooks.refreshPlanet();
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

        <SelfDestructButton />
      </div>
    );
  }
}

export default observer(LeftSidebar);
