'use strict';

const BoostsRPCStore = require('js/stores/rpc/empire/boosts');
const InviteRPCStore = require('js/stores/rpc/empire/invite');
const server = require('js/server');
const vex = require('js/vex');

class EmpireService {
    getBoosts() {
        server.call({
            module: 'empire',
            method: 'get_boosts',
            params: [],
            success: (result) => {
                BoostsRPCStore.update(result);
            },
        });
    }

    getInviteFriendUrl() {
        server.call({
            module: 'empire',
            method: 'invite_friend',
            params: [],
            success: (result) => {
                InviteRPCStore.update(result);
            },
        });
    }

    inviteFriend(email, message) {
        server.call({
            module: 'empire',
            method: 'get_invite_friend_url',
            params: {
                email: email,
                custom_message: message,
            },
            success: () => {
                vex.alert('Invite email sent!');
            },
        });
    }

    login() {
        //
    }

    logout() {
        //
    }
}

module.exports = new EmpireService();
