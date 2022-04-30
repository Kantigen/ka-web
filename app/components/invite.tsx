import React from 'react';
import { observer } from 'mobx-react';
import InviteRPCStore from 'app/stores/rpc/empire/invite';
import EmpireService from 'app/services/empire';
import WindowsStore from 'app/stores/windows';

class InviteWindow extends React.Component {
  emailInput = React.createRef<HTMLInputElement>();

  messageInput = React.createRef<HTMLTextAreaElement>();

  closeWindow() {
    WindowsStore.close('invite');
  }

  handleInvite() {
    if (this.emailInput.current && this.messageInput.current) {
      const email = this.emailInput.current.value;
      const message = this.messageInput.current.value;
      EmpireService.inviteFriend(email, message);
    }
  }

  componentDidMount() {
    EmpireService.getInviteFriendUrl();
  }

  render() {
    const defaultMessage = [
      "I'm having a great time with this new game called 'Kenó Antigen'.",
      'Come play with me!',
    ].join(' ');

    return (
      <div>
        <div className='ui form'>
          <div className='field'>
            <label style={{ color: '#ffffff' }}>Email</label>
            <input type='text' placeholder='someone@example.com' ref={this.emailInput} />
          </div>

          <div className='field'>
            <label style={{ color: '#ffffff' }}>Message</label>
            <textarea ref={this.messageInput} defaultValue={defaultMessage} />
          </div>

          <div className='ui green button' onClick={() => this.handleInvite()}>
            Send Invite
          </div>
        </div>

        <div className='ui divider' />

        <div className='ui fluid action input'>
          <input
            type='text'
            readOnly
            placeholder='Referral link'
            defaultValue={InviteRPCStore.referral_url}
          />
        </div>
      </div>
    );
  }
}

export default observer(InviteWindow);
