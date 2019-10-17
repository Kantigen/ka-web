'use strict';

var React = require('react');

var WindowActions = require('js/actions/window');

var RegisterWindow = React.createClass({
    statics: {
        options: {
            title: 'Register',
            width: 500,
            height: 200,
        },
    },

    closeWindow: function() {
        WindowActions.windowCloseByType('register');
    },

    render: function() {
        return (
            <div
                style={{
                    marginTop: 5,
                }}
            >
                <div className='ui large fluid action input'>
                    <input type='text' placeholder='Username' ref='username' />
                </div>
                <div className='ui large fluid action input'>
                    <input
                        type='text'
                        placeholder='Email Address'
                        ref='email'
                    />
                </div>
                <div
                    className='ui green large labeled icon button'
                    onClick={this.authorizeAllies}
                >
                    Register
                </div>
            </div>
        );
    },
});

module.exports = RegisterWindow;
