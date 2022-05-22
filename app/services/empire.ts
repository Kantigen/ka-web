import ReactTooltip from 'react-tooltip';
import BoostsRPCStore from 'app/stores/rpc/empire/boosts';
import InviteRPCStore from 'app/stores/rpc/empire/invite';
import server from 'app/server';
import { Empire } from 'app/client';
import * as vex from 'app/vex';

import YAHOO from 'app/shims/yahoo';

class EmpireService {
  getBoosts() {
    server.call({
      module: 'empire',
      method: 'get_boosts',
      params: [],
      addSession: true,
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
      addSession: true,
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
        email,
        custom_message: message,
      },
      addSession: true,
      success: () => {
        vex.alert('Invite email sent!');
      },
    });
  }

  login() {
    //
  }

  async logout() {
    await Empire.logout();
    YAHOO.lacuna.Game.Reset();
    YAHOO.lacuna.MapPlanet.Reset();
    YAHOO.lacuna.Game.DoLogin();

    // Hide all our tooltips
    ReactTooltip.hide();
  }
}

export default new EmpireService();
