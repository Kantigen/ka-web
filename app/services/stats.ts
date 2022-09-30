import CreditsRPCStore from 'app/stores/rpc/stats/credits';
import ServiceBase from 'app/services/base';

class StatsService extends ServiceBase {
  async getCredits() {
    const res = await this.call('stats', 'credits', []);
    CreditsRPCStore.update(res);
  }
}

export default new StatsService();
