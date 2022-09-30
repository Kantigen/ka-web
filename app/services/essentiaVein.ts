import ClientBase from 'app/services/base';

class EssentiaVeinService extends ClientBase {
  async drain(buildingId: number, times: number) {
    return this.call('essentiavein', 'drain', [buildingId, times]);
  }
}

export default new EssentiaVeinService();
