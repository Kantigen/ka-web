import PropTypes from 'prop-types';

import React from 'react';
import createReactClass from 'create-react-class';

import CaptchaRPCStore from 'app/stores/rpc/captcha';

const Captcha = createReactClass({
  displayName: 'Captcha',

  statics: {
    options: {
      title: 'Verify Your Humanity',
      width: 320,
      height: 'auto',
    },
  },

  propTypes: {
    options: PropTypes.object.isRequired,
  },

  // mixins: [Reflux.connect(CaptchaRPCStore, 'captchaRPCStore')],

  componentWillMount() {
    CaptchaRPCActions.requestCaptchaRPCFetch();
  },

  componentWillUnmount() {
    const { success } = this.props.options;
    if (typeof success === 'function') {
      if (this.state.captchaRPCStore.solved) {
        success();
      }
    }
  },

  componentDidUpdate(prevProps, prevState) {
    if (prevState.captchaRPCStore.url !== this.state.captchaRPCStore.url) {
      this.clearSolutionField();
    }
  },

  onWindowShow() {
    this.clearSolutionField();
    CaptchaRPCActions.requestCaptchaRPCFetch();
  },

  handleEnterKey(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onClickSolve();
    }
  },

  onClickSolve() {
    const solution = this.refs.solution.value;

    CaptchaRPCActions.requestCaptchaRPCSolve({
      guid: this.state.captchaRPCStore.guid,
      solution,
    });
  },

  onClickRefresh() {
    this.clearSolutionField();
    CaptchaWindowActions.captchaWindowRefresh();
  },

  onClickClose() {
    this.clearSolutionField();
    WindowActions.windowCloseByType('captcha');
  },

  clearSolutionField() {
    this.refs.solution.value = '';
  },

  render() {
    return (
      <div>
        <div
          style={{
            backgroundImage: `url(${this.state.captchaRPCStore.url})`,
            width: 300,
            height: 80,
          }}
        />

        <br />

        <div className='ui action input'>
          <input
            type='text'
            ref='solution'
            onKeyDown={this.handleEnterKey}
            placeholder='Captcha Solution'
            style={{
              // Magic number to make it the same width as the image.
              width: 140,
            }}
          />

          <div className='ui large icon buttons'>
            <div className='ui green button' onClick={this.onClickSolve}>
              <i className='checkmark icon' />
            </div>
            <div className='ui blue button' onClick={this.onClickRefresh}>
              <i className='refresh icon' />
            </div>
            <div className='ui red button' onClick={this.onClickClose}>
              <i className='remove icon' />
            </div>
          </div>
        </div>
      </div>
    );
  },
});

export default Captcha;
