import CreditsRPCStore from 'app/stores/rpc/stats/credits';
import server from 'app/server';

class StatsService {
  getCredits() {
    server.call({
      module: 'stats',
      method: 'credits',
      params: [],
      success: (result: any) => {
        CreditsRPCStore.update(result);
      },
    });
  }
}

export default new StatsService();
