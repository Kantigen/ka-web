'use strict';

const CreditsRPCStore = require('app/js/stores/rpc/stats/credits');
const server = require('app/js/server');

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

module.exports = new StatsService();
