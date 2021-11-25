'use strict';

var React = require('react');
var { observer } = require('mobx-react');
var InviteRPCStore = require('js/stores/rpc/empire/invite');
var EmpireService = require('js/services/empire');
var WindowsStore = require('js/stores/windows');

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

module.exports = observer(InviteWindow);
