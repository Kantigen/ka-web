'use strict';

var React = require('react');
var createReactClass = require('create-react-class');
var Reflux = require('reflux');

var BodyRPCStore = require('js/stores/rpc/body');
var RightSidebarActions = require('js/actions/menu/rightSidebar');

var RightSidebarButton = createReactClass({
    displayName: 'RightSidebarButton',
    mixins: [Reflux.connect(BodyRPCStore, 'body')],

    click: function() {
        RightSidebarActions.rightSidebarShow();
    },

    render: function() {
        return (
            <div
                style={{
                    position: 'absolute',
                    zIndex: 2500,
                    right: '15px',
                    top: '15px',
                }}
            >
                <div
                    className='ui right labeled icon blue button'
                    onClick={this.click}
                >
                    <i className='world icon' />
                    {this.state.body.name}
                </div>
            </div>
        );
    },
});

module.exports = RightSidebarButton;
