import React from 'react';
import CaptchaService from 'app/services/captcha';
import { CaptchaWindowOptions } from 'app/interfaces';
import WindowsStore from 'app/stores/windows';

type Props = {
  options: CaptchaWindowOptions;
};

type State = {
  guid: string;
  url: string;
  solution: string;
};

class Captcha extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      guid: '',
      url: '',
      solution: '',
    };
  }

  async fetchCaptcha() {
    const { guid, url } = await CaptchaService.fetch();
    this.setState({ guid, url, solution: '' });
  }

  componentDidMount() {
    this.fetchCaptcha();
  }

  handleEnterKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.onClickSolve();
    }
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ solution: e.target.value });
  }

  async onClickSolve() {
    await CaptchaService.solve(this.state.guid, this.state.solution);
    WindowsStore.close('captcha');
    this.props.options.onCaptchaComplete();
  }

  onClickRefresh() {
    this.fetchCaptcha();
  }

  onClickClose() {
    WindowsStore.close('captcha');
  }

  render() {
    return (
      <div>
        <div
          style={{
            width: 300,
            height: 80,
            ...(this.state.url ? { backgroundImage: `url(${this.state.url})` } : {}),
          }}
        />

        <br />

        <div className='ui action input'>
          <input
            type='text'
            autoComplete='one-time-code'
            onKeyDown={(e) => this.handleEnterKey(e)}
            onChange={(e) => this.onChange(e)}
            placeholder='Enter the code you see above'
            value={this.state.solution}
            style={{
              // Magic number to make it the same width as the image.
              width: 140,
            }}
          />

          <div className='ui large icon buttons'>
            <div className='ui green button' onClick={() => this.onClickSolve()}>
              <i className='checkmark icon' />
            </div>
            <div className='ui blue button' onClick={() => this.onClickRefresh()}>
              <i className='refresh icon' />
            </div>
            <div className='ui red button' onClick={() => this.onClickClose()}>
              <i className='remove icon' />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Captcha;
