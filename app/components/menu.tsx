import React from 'react';
import { observer } from 'mobx-react';

import TopBar from 'app/components/menu/topBar';
import BottomBar from 'app/components/menu/bottomBar';

import LeftSidebarButton from 'app/components/menu/leftSidebar/button';
import RightSidebarButton from 'app/components/menu/rightSidebar/button';

import Loader from 'app/components/menu/loader';

import MenuStore from 'app/stores/menu';

class Menu extends React.Component {
  render() {
    if (MenuStore.menuShown) {
      return (
        <div>
          <LeftSidebarButton />
          <RightSidebarButton />
          <TopBar />

          <div id='oldYUIPanelContainer' />

          <Loader />
          <BottomBar />
        </div>
      );
    }
    return <div />;
  }
}

export default observer(Menu);
