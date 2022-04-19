import server from 'app/js/server';
import GenericBuildingRPCStore from 'app/js/stores/rpc/genericBuilding';

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

export default new GenericBuildingService();
