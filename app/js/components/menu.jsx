'use strict';

const React = require('react');
const { observer } = require('mobx-react');

var TopBar = require('js/components/menu/topBar');
var BottomBar = require('js/components/menu/bottomBar');

var LeftSidebarButton = require('js/components/menu/leftSidebarButton');
var RightSidebarButton = require('js/components/menu/rightSidebarButton');

var Loader = require('js/components/menu/loader');

var MenuStore = require('js/stores/menu');

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

module.exports = observer(Menu);
