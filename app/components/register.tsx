import React from 'react';
import WindowsStore from 'app/stores/windows';
import EmpireService from 'app/services/empire';
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
    const { guid, url } = await EmpireService.fetchCaptcha();
    this.setState({ captcha: { guid, url } });
  }

  async submit(values: EmpireSchema) {
    const res = await EmpireService.create({
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
      const { Game } = Lacuna;

      Game.SpeciesCreator = new Lacuna.CreateSpecies({
        handleCancel: () => {
          WindowsStore.add('login');
        },
      });

      Game.SpeciesCreator.subscribe(
        'onCreateSuccessful',
        (oArgs: any) => {
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
            <div className='bulma'>
              <div className='columns'>
                <div className='column is-half'>
                  <div className='field mb-4'>
                    <label htmlFor='empireName' className='label'>
                      Empire Name
                    </label>
                    <div className='control'>
                      <Field
                        type='text'
                        name='empireName'
                        autoComplete='nickname'
                        placeholder='Empire Name'
                        className='input'
                      />
                    </div>
                    <ErrorMessage name='empireName' component='p' className='help is-danger' />
                  </div>

                  <div className='field mb-4'>
                    <label htmlFor='email' className='label'>
                      Email
                    </label>
                    <div className='control'>
                      <Field
                        type='text'
                        placeholder='Email Address'
                        autoComplete='email'
                        name='email'
                        className='input'
                      />
                    </div>
                    <ErrorMessage name='email' component='p' className='help is-danger' />
                  </div>

                  <div className='field mb-4'>
                    <label htmlFor='password' className='label'>
                      Password
                    </label>
                    <div className='control'>
                      <Field
                        type='password'
                        placeholder='Password'
                        autoComplete='new-password'
                        name='password'
                        className='input'
                      />
                    </div>
                    <ErrorMessage name='password' component='p' className='help is-danger' />
                  </div>

                  <div className='field mb-4'>
                    <label htmlFor='inviteCode' className='label'>
                      Friend Invite code
                    </label>
                    <div className='control'>
                      <Field
                        type='text'
                        placeholder='Friend Invite Code'
                        autoComplete='off'
                        name='inviteCode'
                        className='input'
                      />
                    </div>
                    <ErrorMessage name='inviteCode' component='p' className='help is-danger' />
                  </div>
                </div>

                <div className='column is-half'>
                  <div className='field mb-4'>
                    <label htmlFor='captcha' className='label mb-2'>
                      Captcha
                    </label>
                    {this.state.captcha.url ? (
                      <img
                        src={this.state.captcha.url}
                        width={300}
                        height={80}
                        className='image mb-2'
                      />
                    ) : undefined}
                    <div className='control'>
                      <Field
                        type='text'
                        placeholder='Answer'
                        autoComplete='off'
                        name='captcha'
                        className='input'
                      />
                    </div>
                    <ErrorMessage name='captcha' component='p' className='help is-danger' />
                  </div>

                  <div className='field mb-4'>
                    <label htmlFor='terms' className='checkbox'>
                      <Field type='checkbox' name='terms' /> I agree to the{' '}
                      <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href='https://lacunaexpanse.com/terms/'
                      >
                        Terms of Service
                      </a>
                    </label>
                    <ErrorMessage name='terms' component='p' className='help is-danger' />
                  </div>

                  <div className='field mb-4'>
                    <label htmlFor='rules' className='checkbox'>
                      <Field type='checkbox' name='rules' /> I agree to abide by{' '}
                      <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href='http://lacunaexpanse.com/rules/'
                      >
                        the rules
                      </a>
                    </label>
                    <ErrorMessage name='rules' component='p' className='help is-danger' />
                  </div>

                  <div className='field'>
                    <div className='is-pulled-right'>
                      <button className='button is-success mr-2' type='submit'>
                        Create
                      </button>
                      <button className='button is-primary' onClick={() => this.cancel()}>
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
