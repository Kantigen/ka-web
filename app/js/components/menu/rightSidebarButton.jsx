'use strict';

var React = require('react');
var { observer } = require('mobx-react');

var BodyRPCStore = require('js/stores/rpc/body');
var MenuStore = require('js/stores/menu');

class RightSidebarButton extends React.Component {
    click() {
        MenuStore.showRightSidebar();
    }

    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    zIndex: 2500,
                    right: '15px',
                    top: '15px',
                }}
            >
                <div className='ui right labeled icon blue button' onClick={this.click}>
                    <i className='world icon' />
                    {BodyRPCStore.name}
                </div>
            </div>
        );
    }
}

module.exports = observer(RightSidebarButton);
