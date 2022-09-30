import React from 'react';
import EmpireService from 'app/services/empire';
import WindowsStore from 'app/stores/windows';
import environment from 'app/environment';

import YAHOO from 'app/shims/yahoo';

class LoginWindow extends React.Component {
  empireNameField = React.createRef<HTMLInputElement>();

  passwordField = React.createRef<HTMLInputElement>();

  rememberEmpireField = React.createRef<HTMLInputElement>();

  async loginClick() {
    const { LoginDialog } = YAHOO.lacuna.Game;
    const empireName = this.empireNameField.current?.value || '';
    const password = this.passwordField.current?.value || '';
    const rememberEmpire = this.rememberEmpireField.current?.checked;
    const fingerprint = 'todo';

    // TODO: handle empire not founded error
    const res = await EmpireService.login(empireName, password, fingerprint);

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
    const { LoginDialog } = YAHOO.lacuna.Game;
    LoginDialog.resetPassword();
    WindowsStore.closeAll();
    // TODO: forgot password experience
    // WindowsStore.add('forgotPassword');
  }

  handleEnter(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.loginClick();
    }
  }

  render() {
    return (
      <div className='bulma'>
        <div className='block mb-4'>
          <img
            className='image'
            src={`${environment.getAssetsUrl()}ui/logo.png`}
            alt='Lacuna Expanse logo'
          />
        </div>

        <div className='field mb-4'>
          <label htmlFor='empireName' className='label'>
            Empire Name
          </label>
          <div className='control'>
            <input
              type='text'
              name='empireName'
              placeholder='Empire Name'
              autoComplete='nickname'
              className='input'
              ref={this.empireNameField}
              onKeyDown={(e) => this.handleEnter(e)}
            />
          </div>
        </div>

        <div className='field mb-4'>
          <label htmlFor='password' className='label'>
            Password
          </label>
          <div className='control'>
            <input
              type='password'
              name='password'
              placeholder='Password'
              autoComplete='current-password'
              className='input'
              ref={this.passwordField}
              onKeyDown={(e) => this.handleEnter(e)}
            />
          </div>
        </div>

        <div className='field mb-4'>
          <label htmlFor='rememberEmpire' className='checkbox'>
            <input
              type='checkbox'
              name='rememberEmpire'
              ref={this.rememberEmpireField}
              defaultChecked
            />{' '}
            Remember Empire?
          </label>
        </div>

        <div className='field mb-4'>
          <button className='button is-success is-fullwidth mb-2' onClick={() => this.loginClick()}>
            Login
          </button>
          <button className='button is-primary is-fullwidth' onClick={() => this.registerClick()}>
            Register
          </button>
        </div>

        <div className='field mb-4'>
          <p>
            <a onClick={() => this.forgotPasswordClick()}>Forgotten your password?</a>
          </p>
        </div>
      </div>
    );
  }
}

export default LoginWindow;
