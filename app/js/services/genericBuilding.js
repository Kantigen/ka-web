'use strict';

const server = require('js/server');
const GenericBuildingRPCStore = require('js/stores/rpc/genericBuilding');

class GenericBuildingService {
    view(url, id) {
        GenericBuildingRPCStore.clear();
        server.call({
            module: url.replace(/^\//, ''),
            method: 'view',
            params: [id],
            success: (result) => {
                GenericBuildingRPCStore.update(result);
            },
        });
    }
}

module.exports = new GenericBuildingService();
