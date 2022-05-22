import React from 'react';
import Empire from 'app/client/empire';
import WindowsStore from 'app/stores/windows';
import environment from 'app/environment';

import YAHOO from 'app/shims/yahoo';

class LoginWindow extends React.Component {
  empireNameField = React.createRef<HTMLInputElement>();
  passwordField = React.createRef<HTMLInputElement>();
  rememberEmpireField = React.createRef<HTMLInputElement>();

  async loginClick() {
    const LoginDialog = YAHOO.lacuna.Game.LoginDialog;
    const empireName = this.empireNameField.current?.value || '';
    const password = this.passwordField.current?.value || '';
    const rememberEmpire = this.rememberEmpireField.current?.checked;
    const fingerprint = 'todo';

    // TODO: handle empire not founded error
    const res = await Empire.login(empireName, password, fingerprint);

    if (res.session_id) {
      LoginDialog.fireEvent('onLoginSuccessful', { result: res });
      WindowsStore.closeAll();

      if (rememberEmpire) {
        // TODO: store empire name in local storage
      }
    }
  }

  registerClick() {
    WindowsStore.closeAll();
    WindowsStore.add('register');
  }

  forgotPasswordClick() {
    const LoginDialog = YAHOO.lacuna.Game.LoginDialog;
    LoginDialog.resetPassword();
    WindowsStore.closeAll();
    // TODO: forgot password experience
    // WindowsStore.add('forgotPassword');
  }

  render() {
    return (
      <>
        <div style={{ marginBottom: '2em' }}>
          <img
            className='ui fluid image'
            src={environment.getAssetsUrl() + 'ui/logo.png'}
            alt='Lacuna Expanse logo'
          />
        </div>

        <div className='ui form'>
          <div className='field'>
            <label htmlFor='empireName'>Empire Name</label>
            <input
              type='text'
              name='empireName'
              placeholder='Empire Name'
              autoComplete='nickname'
              ref={this.empireNameField}
            />
          </div>

          <div className='field'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              placeholder='Password'
              autoComplete='current-password'
              ref={this.passwordField}
            />
          </div>

          <div className='field'>
            <div className='ui checkbox'>
              <input
                type='checkbox'
                name='rememberEmpire'
                ref={this.rememberEmpireField}
                defaultChecked={true}
              />
              <label htmlFor='rememberEmpire'>Remember Empire?</label>
            </div>
          </div>

          <div className='field' style={{ marginTop: '2em' }}>
            <div className='ui fluid buttons'>
              <button className='ui button' onClick={() => this.registerClick()}>
                Register
              </button>
              <div className='or'></div>
              <button className='ui green button' onClick={() => this.loginClick()}>
                Login
              </button>
            </div>
          </div>

          <div className='field' style={{ marginTop: '1em' }}>
            <p>
              <a onClick={() => this.forgotPasswordClick()}>Forgotten your password?</a>
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default LoginWindow;
