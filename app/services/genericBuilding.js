import server from 'app/server';
import GenericBuildingRPCStore from 'app/stores/rpc/genericBuilding';

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
