'use strict';

import CreditsRPCStore from 'app/js/stores/rpc/stats/credits';
import server from 'app/js/server';

class StatsService {
    getCredits() {
        server.call({
            module: 'stats',
            method: 'credits',
            params: [],
            success: (result) => {
                CreditsRPCStore.update(result);
            },
        });
    }
}

export default new StatsService();
