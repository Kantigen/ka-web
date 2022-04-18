'use strict';

import React from 'react';
import { observer } from 'mobx-react';

import TopBar from 'app/js/components/menu/topBar';
import BottomBar from 'app/js/components/menu/bottomBar';

import LeftSidebarButton from 'app/js/components/menu/leftSidebarButton';
import RightSidebarButton from 'app/js/components/menu/rightSidebarButton';

import Loader from 'app/js/components/menu/loader';

import MenuStore from 'app/js/stores/menu';

class Menu extends React.Component {
    render() {
        if (MenuStore.menuShown) {
            return (
                <div>
                    <LeftSidebarButton />
                    <RightSidebarButton />
                    <TopBar />

                    <div id='oldYUIPanelContainer'></div>

                    <Loader />
                    <BottomBar />
                </div>
            );
        } else {
            return <div></div>;
        }
    }
}

export default observer(Menu);
