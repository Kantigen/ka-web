import React from 'react';

class LoginWindow extends React.Component {
  static options = {
    title: 'Web Socket Login',
    width: 500,
    height: 200,
  };

  clickLogin = () => {
    const username = this.refs.username.value;
    const password = this.refs.password.value;

    UserWSActions.requestUserWSLoginWithPassword({
      username,
      password,
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
          <input type='password' placeholder='Password' ref='password' />
        </div>
        <div className='ui green large labeled icon button' onClick={this.clickLogin}>
          Login
        </div>
      </div>
    );
  }
}

export default LoginWindow;
