import {
  EmpireCreateParams,
  EmpireBoostParams,
  EmpireGetBoostsParams,
  EmpireGetBoostsResult,
} from 'app/interfaces';
import * as vex from 'app/vex';
import BoostsRPCStore from 'app/stores/rpc/empire/boosts';
import environment from 'app/environment';
import InviteRPCStore from 'app/stores/rpc/empire/invite';
import ReactTooltip from 'react-tooltip';
import server from 'app/server';
import ServiceBase from 'app/services/base';

import YAHOO from 'app/shims/yahoo';
import LegacyHooks from 'app/legacyHooks';

class EmpireService extends ServiceBase {
  async getStatus() {
    return this.call('empire', 'get_status', {});
  }

  async create(empire: EmpireCreateParams) {
    return this.call('empire', 'create', empire);
  }

  async fetchCaptcha() {
    return this.call('empire', 'fetch_captcha', [], false);
  }

  async login(name: string, password: string, browserFingerprint: string) {
    return this.call(
      'empire',
      'login',
      {
        name,
        password,
        browser: browserFingerprint,
        api_key: environment.getApiKey(),
      },
      false
    );
  }

  async logout() {
    await this.call('empire', 'logout', {});

    LegacyHooks.resetGame();

    // Hide all our tooltips
    ReactTooltip.hide();
  }

  getBoosts() {
    const params: EmpireGetBoostsParams = {};
    server.call({
      module: 'empire',
      method: 'get_boosts',
      params: params,
      addSession: true,
      success: (result: EmpireGetBoostsResult) => {
        BoostsRPCStore.update(result);
      },
    });
  }

  setBoost(type: string, weeks: number) {
    const params: EmpireBoostParams = { type, weeks };
    server.call({
      module: 'empire',
      method: 'set_boost',
      params: params,
      addSession: true,
      success: (result: EmpireGetBoostsResult) => {
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
}

export default new EmpireService();
