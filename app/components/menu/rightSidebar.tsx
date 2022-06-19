import React from 'react';
import _ from 'lodash';
import { observer } from 'mobx-react';

import BodiesAccordion from 'app/components/menu/rightSidebar/bodiesAccordion';

import EmpireRPCStore from 'app/stores/rpc/empire';
import MenuStore from 'app/stores/menu';

class RightSidebar extends React.Component {
  componentDidMount() {
    //@ts-expect-error
    $('#right-sidebar').sidebar({
      context: $('#sidebarContainer'),
      duration: 300,
      transition: 'overlay',
      onHidden: () => {
        MenuStore.hideRightSidebar();
      },
    });
  }

  componentDidUpdate() {
    //@ts-expect-error
    $('#right-sidebar').sidebar(MenuStore.rightSidebarShown ? 'show' : 'hide');
  }

  homePlanet() {
    MenuStore.hideRightSidebar();
    MenuStore.changePlanet(EmpireRPCStore.home_planet_id);
  }

  render() {
    const shown = MenuStore.rightSidebarShown;
    return (
      <div className='ui right vertical inverted sidebar menu' id='right-sidebar'>
        <div style={{ overflow: 'auto', overflowX: 'hidden' }}>
          <BodiesAccordion />
        </div>
      </div>
    );
  }
}

export default observer(RightSidebar);
