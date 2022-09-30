import ClientBase from 'app/services/base';
import { BodyRearrangeBuildingsParams } from 'app/interfaces';

class BodyService extends ClientBase {
  getBuildings(id: number) {
    return this.call('body', 'get_buildings', { body_id: id });
  }

  getStatus(id: number) {
    return this.call('body', 'get_status', [id]);
  }

  rearrangeBuildings(params: BodyRearrangeBuildingsParams) {
    return this.call('body', 'rearrange_buildings', params);
  }
}

export default new BodyService();
