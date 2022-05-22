import React from 'react';
import WindowsStore from 'app/stores/windows';
import Empire from 'app/client/empire';
import _ from 'lodash';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string, boolean, InferType } from 'yup';

import YAHOO from 'app/shims/yahoo';

const empireSchema = object({
  empireName: string().min(3).required().label('Empire name'),
  email: string().email().required().label('Email'),
  password: string().min(6).required().label('Password'),
  inviteCode: string().nullable(),
  captcha: string().required().label('Captcha'),
  terms: boolean().required().oneOf([true], 'You must accept the Terms of Service'),
  rules: boolean().required().oneOf([true], 'You must agree to abide by the rules'),
});

type EmpireSchema = InferType<typeof empireSchema>;

class RegisterWindow extends React.Component {
  state = {
    captcha: {
      guid: '',
      url: '',
    },
  };

  async componentDidMount() {
    const { guid, url } = await Empire.fetchCaptcha();
    this.setState({ captcha: { guid, url } });
  }

  async submit(values: EmpireSchema) {
    const res = await Empire.create({
      name: values.empireName,
      email: values.email,
      password: values.password,
      password1: values.password,
      invite_code: values.inviteCode || '',
      captcha_guid: this.state.captcha.guid,
      captcha_solution: values.captcha,
    });

    if (res.empire_id) {
      WindowsStore.close('register');
      const Lacuna = YAHOO.lacuna;
      const Game = Lacuna.Game;

      Game.SpeciesCreator = new Lacuna.CreateSpecies({
        handleCancel: () => {
          WindowsStore.add('login');
        },
      });

      Game.SpeciesCreator.subscribe(
        'onCreateSuccessful',
        function (oArgs: any) {
          Game.LoginDialog.fireEvent('onLoginSuccessful', oArgs);
        },
        this,
        true
      );

      Game.SpeciesCreator.show(res.empire_id);
    }
  }

  cancel() {
    WindowsStore.close('register');
    WindowsStore.add('login');
  }

  render() {
    return (
      <Formik
        initialValues={{
          empireName: '',
          email: '',
          password: '',
          inviteCode: '',
          captcha: '',
          terms: false,
          rules: false,
        }}
        validationSchema={empireSchema}
        onSubmit={(values) => this.submit(values)}
      >
        {() => (
          <Form>
            <div className='ui grid'>
              <div className='eight wide column'>
                <div className='ui form'>
                  <div className='required field'>
                    <label htmlFor='empireName'>Empire Name</label>
                    <Field
                      type='text'
                      name='empireName'
                      autoComplete='nickname'
                      placeholder='Empire Name'
                    />
                    <ErrorMessage name='empireName' component='p' />
                  </div>

                  <div className='required field'>
                    <label htmlFor='email'>Email</label>
                    <Field
                      type='text'
                      placeholder='Email Address'
                      autoComplete='email'
                      name='email'
                    />
                    <ErrorMessage name='email' component='p' />
                  </div>

                  <div className='required field'>
                    <label htmlFor='password'>Password</label>
                    <Field
                      type='password'
                      placeholder='Password'
                      autoComplete='new-password'
                      name='password'
                    />
                    <ErrorMessage name='password' component='p' />
                  </div>

                  <div className='field'>
                    <label htmlFor='inviteCode'>Friend Invite code</label>
                    <Field
                      type='text'
                      placeholder='Friend Invite Code'
                      autoComplete='off'
                      name='inviteCode'
                    />
                    <ErrorMessage name='inviteCode' component='p' />
                  </div>
                </div>
              </div>

              <div className='eight wide column'>
                <div className='ui form'>
                  <div className='required field'>
                    <label htmlFor='captcha'>Captcha</label>
                    {this.state.captcha.url ? (
                      <img src={this.state.captcha.url} width={300} height={80} />
                    ) : undefined}
                    <Field type='text' placeholder='Answer' autoComplete='off' name='captcha' />
                    <ErrorMessage name='captcha' component='p' />
                  </div>

                  <div className='required field'>
                    <div className='ui checkbox'>
                      <Field type='checkbox' name='terms' />
                      <label htmlFor='terms'>
                        I agree to the{' '}
                        <a
                          target='_blank'
                          rel='noopener noreferrer'
                          href='https://lacunaexpanse.com/terms/'
                        >
                          Terms of Service
                        </a>
                      </label>
                      <ErrorMessage name='terms' component='p' />
                    </div>
                  </div>

                  <div className='required field'>
                    <div className='ui checkbox'>
                      <Field type='checkbox' name='rules' />
                      <label htmlFor='rules'>
                        I agree to abide by{' '}
                        <a
                          target='_blank'
                          rel='noopener noreferrer'
                          href='http://lacunaexpanse.com/rules/'
                        >
                          the rules
                        </a>
                      </label>
                      <ErrorMessage name='rules' component='p' />
                    </div>
                  </div>

                  <div className='field' style={{ marginTop: '2em' }}>
                    <div className='right floated ui buttons'>
                      <button className='ui green button' type='submit'>
                        Create
                      </button>
                      <button className='ui button' onClick={() => this.cancel()}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}

export default RegisterWindow;
