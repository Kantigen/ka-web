import ReactTooltip from 'react-tooltip';
import BoostsRPCStore from 'app/stores/rpc/empire/boosts';
import InviteRPCStore from 'app/stores/rpc/empire/invite';
import server from 'app/server';
import * as vex from 'app/vex';

declare const YAHOO: any;

class EmpireService {
    getBoosts() {
        server.call({
            module: 'empire',
            method: 'get_boosts',
            params: [],
            success: (result: any) => {
                BoostsRPCStore.update(result);
            },
        });
    }

    getInviteFriendUrl() {
        server.call({
            module: 'empire',
            method: 'invite_friend',
            params: [],
            success: (result: any) => {
                InviteRPCStore.update(result);
            },
        });
    }

    inviteFriend(email: string, message: string) {
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
