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

  expand() {
    // TODO: how to modify child component state nicely?
    // RightSidebarActions.rightSidebarExpand();
  }

  collapse() {
    // TODO: how to modify child component state nicely?
    // RightSidebarActions.rightSidebarCollapse();
  }

  render() {
    const shown = MenuStore.rightSidebarShown;
    return (
      <div className='ui right vertical inverted sidebar menu' id='right-sidebar'>
        <div style={{ paddingTop: 7 }}>
          <a
            title='Go to home planet'
            className='item'
            onClick={this.homePlanet}
            style={{ display: 'inline' }}
          >
            Home
          </a>

          <div style={{ float: 'right' }}>
            <a
              title='Expand all'
              className='item'
              onClick={this.expand}
              style={{
                display: 'inline',
              }}
            >
              [+]
            </a>

            <a
              title='Collapse all'
              className='item'
              onClick={this.collapse}
              style={{
                display: 'inline',
              }}
            >
              [-]
            </a>
          </div>
        </div>

        <div
          style={{
            overflow: 'auto',
            overflowX: 'hidden',
          }}
        >
          <BodiesAccordion currentBody={MenuStore.planetId} />
        </div>
      </div>
    );
  }
}

export default observer(RightSidebar);
