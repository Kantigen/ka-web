'use strict';

import React from 'react';

class RegisterWindow extends React.Component {
    static options = {
        title: 'Register',
        width: 500,
        height: 200,
    };

    closeWindow = () => {
        WindowActions.windowCloseByType('register');
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
                    <input type='text' placeholder='Email Address' ref='email' />
                </div>
                <div className='ui green large labeled icon button' onClick={this.authorizeAllies}>
                    Register
                </div>
            </div>
        );
    }
}

export default RegisterWindow;
