import ReactTooltip from 'react-tooltip';
import BoostsRPCStore from 'app/js/stores/rpc/empire/boosts';
import InviteRPCStore from 'app/js/stores/rpc/empire/invite';
import server from 'app/js/server';
import * as vex from 'app/js/vex';

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
        server.call({
            module: 'empire',
            method: 'logout',
            success: () => {
                YAHOO.lacuna.Game.Reset();
                YAHOO.lacuna.MapPlanet.Reset();
                YAHOO.lacuna.Game.DoLogin();

                // Hide all our tooltips
                ReactTooltip.hide();
            },
        });
    }
}

export default new EmpireService();
