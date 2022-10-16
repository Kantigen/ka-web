
export interface CaptchaFetchParams {}

export interface CaptchaFetchResponse {
  guid: string;
  url: string;
}

export interface CaptchaSolveParams {
  guid: string;
  solution: string;
}

export interface CaptchaSolveResponse {}
