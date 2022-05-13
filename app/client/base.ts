import server from 'app/server';
import {
  BodyGetStatusParams,
  BodyGetStatusResponse,
  EmpireGetStatusParams,
  EmpireGetStatusResponse,
  EmpireLogoutParams,
  EmpireLogoutResponse,
  EssentiaVeinDrainParams,
  EssentiaVeinDrainResponse,
} from 'app/interfaces';

class ClientBase {
  call(
    module: 'body',
    method: 'get_status',
    params: BodyGetStatusParams
  ): Promise<BodyGetStatusResponse>;

  call(
    module: 'empire',
    method: 'get_status',
    params: EmpireGetStatusParams
  ): Promise<EmpireGetStatusResponse>;

  call(
    module: 'empire',
    method: 'logout',
    params: EmpireLogoutParams
  ): Promise<EmpireLogoutResponse>;

  call(
    module: 'essentiavein',
    method: 'drain',
    params: EssentiaVeinDrainParams
  ): Promise<EssentiaVeinDrainResponse>;

  call(module: string, method: string, params: any, addSession = true): Promise<any> {
    return new Promise((resolve, reject) => {
      server.call({
        module,
        method,
        params,
        addSession,
        success: (res: any) => {
          resolve(res);
        },
        error: (error: any) => {
          reject(error);
        },
      });
    });
  }
}

export default ClientBase;
