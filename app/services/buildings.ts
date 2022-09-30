import ServiceBase from 'app/services/base';
import server from 'app/server';
import {
  BuildingsUpgradeParams,
  BuildingsUpgradeResponse,
  BuildingsDowngradeParams,
  BuildingsDowngradeResponse,
  BuildingsDemolishParams,
  BuildingsDemolishResponse,
} from 'app/interfaces';

class BuildingsService extends ServiceBase {
  upgrade(module: string, buildingId: number): Promise<BuildingsUpgradeResponse> {
    return new Promise((resolve, reject) => {
      const params: BuildingsUpgradeParams = [buildingId];
      server.call({
        module: module,
        method: 'upgrade',
        params: params,
        addSession: true,
        success: (res: BuildingsUpgradeResponse) => {
          resolve(res);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  downgrade(module: string, buildingId: number): Promise<BuildingsDowngradeResponse> {
    return new Promise((resolve, reject) => {
      const params: BuildingsDowngradeParams = [buildingId];
      server.call({
        module: module,
        method: 'downgrade',
        params: params,
        addSession: true,
        success: (res: BuildingsDowngradeResponse) => {
          resolve(res);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }

  demolish(module: string, buildingId: number): Promise<BuildingsDemolishResponse> {
    return new Promise((resolve, reject) => {
      const params: BuildingsDemolishParams = [buildingId];
      server.call({
        module: module,
        method: 'demolish',
        params: params,
        addSession: true,
        success: (res: BuildingsDemolishResponse) => {
          resolve(res);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }
}

export default new BuildingsService();
