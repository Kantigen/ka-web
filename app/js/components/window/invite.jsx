import React from 'react';
import { observer } from 'mobx-react';
import InviteRPCStore from 'app/js/stores/rpc/empire/invite';
import EmpireService from 'app/js/services/empire';
import WindowsStore from 'app/js/stores/windows';

class InviteWindow extends React.Component {
    static options = {
        title: 'Invite a Friend',
        width: 450,
        height: 400,
    };

    closeWindow() {
        WindowsStore.close('invite');
    }

    handleInvite() {
        var email = this.refs.email.value;
        var message = this.refs.message.value;
        EmpireService.inviteFriend(email, message);
    }

    componentDidMount() {
        EmpireService.getInviteFriendUrl();
    }

    componentDidUpdate() {
        var $el = $(this.refs.referral);

        $el.off().click(function() {
            $(this).select();
        });
    }

    render() {
        var defaultMessage = [
            "I'm having a great time with this new game called 'Kenó Antigen'.",
            'Come play with me!',
        ].join(' ');

        return (
            <div>
                <div className='ui form'>
                    <div className='field'>
                        <label style={{ color: '#ffffff' }}>Email</label>
                        <input type='text' placeholder='someone@example.com' ref='email'></input>
                    </div>

                    <div className='field'>
                        <label style={{ color: '#ffffff' }}>Message</label>
                        <textarea ref='message' defaultValue={defaultMessage}></textarea>
                    </div>

                    <div className='ui green button' onClick={() => this.handleInvite()}>
                        Send Invite
                    </div>
                </div>

                <div className='ui divider'></div>

                <div className='ui fluid action input' ref='referralContainer'>
                    <input
                        type='text'
                        readOnly
                        placeholder='Referral link'
                        value={InviteRPCStore.referral_url}
                    />
                </div>
            </div>
        );
    }
}

export default observer(InviteWindow);
