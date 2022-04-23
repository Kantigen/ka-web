import server from 'app/server';
import GenericBuildingRPCStore from 'app/stores/rpc/genericBuilding';

class GenericBuildingService {
    view(url: string, id: string) {
        GenericBuildingRPCStore.clear();
        server.call({
            module: url.replace(/^\//, ''),
            method: 'view',
            params: [id],
            success: (result: any) => {
                GenericBuildingRPCStore.update(result);
            },
        });
    }
}

export default new GenericBuildingService();
