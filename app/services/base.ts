import server from 'app/server';
import {
  BodyGetBuildingsParams,
  BodyGetBuildingsResponse,
  BodyGetStatusParams,
  BodyGetStatusResponse,
  BodyRearrangeBuildingsParams,
  BodyRearrangeBuildingsResponse,
  CaptchaFetchParams,
  CaptchaFetchResponse,
  CaptchaSolveParams,
  CaptchaSolveResponse,
  EmpireCreateParams,
  EmpireCreateResponse,
  EmpireFetchCaptchaParams,
  EmpireFetchCaptchaResponse,
  EmpireGetStatusParams,
  EmpireGetStatusResponse,
  EmpireLoginParams,
  EmpireLoginResponse,
  EmpireLogoutParams,
  EmpireLogoutResponse,
  EssentiaVeinDrainParams,
  EssentiaVeinDrainResponse,
  StatsCreditsParams,
  StatsCreditsResult,
} from 'app/interfaces';

class ServiceBase {
  call(
    module: 'body',
    method: 'get_buildings',
    params: BodyGetBuildingsParams,
    addSession?: boolean
  ): Promise<BodyGetBuildingsResponse>;

  call(
    module: 'body',
    method: 'get_status',
    params: BodyGetStatusParams,
    addSession?: boolean
  ): Promise<BodyGetStatusResponse>;

  call(
    module: 'body',
    method: 'rearrange_buildings',
    params: BodyRearrangeBuildingsParams,
    addSession?: boolean
  ): Promise<BodyRearrangeBuildingsResponse>;

  call(
    module: 'captcha',
    method: 'fetch',
    params: CaptchaFetchParams,
    addSession?: boolean
  ): Promise<CaptchaFetchResponse>;

  call(
    module: 'captcha',
    method: 'solve',
    params: CaptchaSolveParams,
    addSession?: boolean
  ): Promise<CaptchaSolveResponse>;

  call(
    module: 'empire',
    method: 'create',
    params: EmpireCreateParams,
    addSession?: boolean
  ): Promise<EmpireCreateResponse>;

  call(
    module: 'empire',
    method: 'get_status',
    params: EmpireGetStatusParams,
    addSession?: boolean
  ): Promise<EmpireGetStatusResponse>;

  call(
    module: 'empire',
    method: 'fetch_captcha',
    params: EmpireFetchCaptchaParams,
    addSession?: boolean
  ): Promise<EmpireFetchCaptchaResponse>;

  call(
    module: 'empire',
    method: 'login',
    params: EmpireLoginParams,
    addSession?: boolean
  ): Promise<EmpireLoginResponse>;

  call(
    module: 'empire',
    method: 'logout',
    params: EmpireLogoutParams,
    addSession?: boolean
  ): Promise<EmpireLogoutResponse>;

  call(
    module: 'essentiavein',
    method: 'drain',
    params: EssentiaVeinDrainParams,
    addSession?: boolean
  ): Promise<EssentiaVeinDrainResponse>;

  call(
    module: 'stats',
    method: 'credits',
    params: StatsCreditsParams,
    addSession?: boolean
  ): Promise<StatsCreditsResult>;

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

export default ServiceBase;
