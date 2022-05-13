import ClientBase from 'app/client/base';

class EssentiaVein extends ClientBase {
  async drain(buildingId: number, times: number) {
    return this.call('essentiavein', 'drain', [buildingId, times]);
  }
}

export default new EssentiaVein();
