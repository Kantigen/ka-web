'use strict';

var React = require('react');

var WindowActions = require('js/actions/window');
var UserWSActions = require('js/actions/ws/user');

class LoginWindow extends React.Component {
    static options = {
        title: 'Web Socket Login',
        width: 500,
        height: 200,
    };

    clickLogin = () => {
        var username = this.refs.username.value;
        var password = this.refs.password.value;

        UserWSActions.requestUserWSLoginWithPassword({
            username: username,
            password: password,
        });
    };

    closeWindow = () => {
        WindowActions.windowCloseByType('login');
    };

    render() {
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
                        type='password'
                        placeholder='Password'
                        ref='password'
                    />
                </div>
                <div
                    className='ui green large labeled icon button'
                    onClick={this.clickLogin}
                >
                    Login
                </div>
            </div>
        );
    }
}

module.exports = LoginWindow;
