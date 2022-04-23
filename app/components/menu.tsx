import React from 'react';
import { observer } from 'mobx-react';

import TopBar from 'app/components/menu/topBar';
import BottomBar from 'app/components/menu/bottomBar';

import LeftSidebarButton from 'app/components/menu/leftSidebarButton';
import RightSidebarButton from 'app/components/menu/rightSidebarButton';

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
