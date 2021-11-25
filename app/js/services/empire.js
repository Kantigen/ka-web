'use strict';

const BoostsRPCStore = require('js/stores/rpc/empire/boosts');
const server = require('js/server');

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

    login() {
        //
    }

    logout() {
        //
    }
}

module.exports = new EmpireService();
