'use strict';

var React = require('react');
var createReactClass = require('create-react-class');
var Reflux = require('reflux');

var EmpireRPCActions = require('js/actions/rpc/empire');
var WindowActions = require('js/actions/window');

var InviteRPCStore = require('js/stores/rpc/invite');

var InviteWindow = createReactClass({
    displayName: 'InviteWindow',

    statics: {
        options: {
            title: 'Invite a Friend',
            width: 450,
            height: 400,
        },
    },

    mixins: [Reflux.connect(InviteRPCStore, 'inviteRPCStore')],

    closeWindow: function() {
        WindowActions.windowCloseByType('invite');
    },

    handleInvite: function() {
        var email = this.refs.email.value;
        var message = this.refs.message.value;

        EmpireRPCActions.requestEmpireRPCInviteFriend({
            email: email,
            message: message,
        });
    },

    componentDidMount: function() {
        EmpireRPCActions.requestEmpireRPCGetInviteFriendUrl();
    },

    componentDidUpdate: function() {
        var $el = $(this.refs.referral);

        $el.off().click(function() {
            $(this).select();
        });
    },

    render: function() {
        var defaultMessage = [
            "I'm having a great time with this new game called 'Keno Antigen'.",
            'Come play with me!',
        ].join(' ');

        return (
            <div>
                <div className='ui form'>
                    <div className='field'>
                        <label style={{ color: '#ffffff' }}>Email</label>
                        <input
                            type='text'
                            placeholder='someone@example.com'
                            ref='email'
                        ></input>
                    </div>

                    <div className='field'>
                        <label style={{ color: '#ffffff' }}>Message</label>
                        <textarea
                            ref='message'
                            defaultValue={defaultMessage}
                        ></textarea>
                    </div>

                    <div
                        className='ui green button'
                        onClick={this.handleInvite}
                    >
                        Send Invite
                    </div>
                </div>

                <div className='ui divider'></div>

                <div className='ui fluid action input' ref='referralContainer'>
                    <input
                        type='text'
                        readOnly
                        placeholder='Referral link'
                        value={this.state.inviteRPCStore.referral_url}
                    />
                </div>
            </div>
        );
    },
});

module.exports = InviteWindow;
