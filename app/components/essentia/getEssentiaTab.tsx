import React from 'react';
import * as vex from 'app/vex';
import WindowsStore from 'app/stores/windows';

class GetEssentiaTab extends React.Component {
  purchase() {
    vex.alert('Not available at the moment.');
    // let url = environment.getServerUrl() + 'pay?session_id=' + SessionStore.session;
    // window.open(
    //     url,
    //     'essentiaPayment',
    //     'status=0,toolbar=0,location=0,menubar=0,resizable=1,scrollbars=1,height=550,width=600,directories=0'
    // );
  }

  redeem() {
    vex.alert('Not available at the moment.');
    // let node = this.refs.code;
    // EmpireRPCActions.requestEmpireRPCRedeemEssentiaCode({
    //     code: node.value,
    // });
    // node.value = '';
  }

  invite() {
    WindowsStore.add('invite');
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <div className='ui large green labeled icon button' onClick={() => this.purchase()}>
          <i className='payment icon' />
          Purchase Essentia
        </div>

        <h3>OR</h3>

        <div className='ui large fluid action input'>
          <input type='text' placeholder='Essentia code' ref='code' />
          <button className='ui blue button' onClick={() => this.redeem()}>
            Redeem
          </button>
        </div>

        <h3>OR</h3>

        <p>
          Invite your friends to the game and you get <strong>free Essentia!</strong> For every
          university level past 4 that they achieve, you'll get 5 Essentia. That's up to{' '}
          <u>
            <strong>130 Essentia</strong>
          </u>{' '}
          per friend!
        </p>

        <div className='ui large green labeled icon button' onClick={() => this.invite()}>
          <i className='add user icon' />
          Invite a Friend
        </div>
      </div>
    );
  }
}

export default GetEssentiaTab;
