'use strict';

var React = require('react');
var { observer } = require('mobx-react');

var EmpireRPCStore = require('app/js/stores/rpc/empire');
var MenuStore = require('app/js/stores/menu');

class LeftSidebarButton extends React.Component {
    clickLeftSidebarButton() {
        MenuStore.showLeftSidebar();
    }

    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    zIndex: 2500,
                    left: '15px',
                    top: '15px',
                }}
            >
                <div
                    className='ui left labeled icon blue button'
                    onClick={this.clickLeftSidebarButton}
                >
                    <i className='content icon' />
                    {EmpireRPCStore.name}
                </div>
            </div>
        );
    }
}

module.exports = observer(LeftSidebarButton);
