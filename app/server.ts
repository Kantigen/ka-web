import _ from 'lodash';
import $ from 'jquery';
import * as util from 'app/util';
import * as vex from 'app/vex';

import ServerRPCStore from 'app/stores/rpc/server';
import EmpireRPCStore from 'app/stores/rpc/empire';
import BodyRPCStore from 'app/stores/rpc/body';
import MenuStore from 'app/stores/menu';
import SessionStore from 'app/stores/session';
import WindowsStore from 'app/stores/windows';

import environment from 'app/environment';
import { StatusBlock } from 'app/interfaces';

interface ServerRequest {
  module: string;
  method: string;
  params: object | Array<any>;
  addSession: boolean;
  success?: Function;
  error?: Function;
}

interface ServerError {
  code: number;
  message: string;
}

interface RequestBody {
  jsonrpc: '2.0';
  id: number;
  method: string;
  params: object | Array<any>;
}

export const addSession = function (options: ServerRequest): ServerRequest {
  const sessionId = SessionStore.session;

  if (options.addSession === true && sessionId) {
    if (_.isArray(options.params)) {
      options.params = [sessionId].concat(options.params);
    } else {
      options.params = { ...options.params, session_id: sessionId };
    }
  }

  return options;
};

export const createBody = function (options: ServerRequest): RequestBody {
  return {
    jsonrpc: '2.0',
    id: 1,
    method: options.method,
    params: options.params,
  };
};

export const createUrl = function (options: ServerRequest): string {
  return environment.getServerUrl() + options.module;
};

const handleSuccess = function (options: ServerRequest, result: any): void {
  if (result) {
    if (result.status) {
      splitStatus(result.status);
    } else if (options.method === 'get_status') {
      splitStatus(result);
    }
  }

  if (typeof options.success === 'function') {
    options.success(result);
  }
};

const handleError = function (options: ServerRequest, error: ServerError): void {
  vex.alert(`${error.message} ${error.code ? `(${error.code})` : ''}`);
  console.error('Request error: ', error);

  if (typeof options.error === 'function') {
    options.error(error);
  }
};

const sendRequest = function (
  url: string,
  data: string,
  options: ServerRequest,
  retry: Function
): void {
  console.log('Calling', `${options.module}/${options.method}`, options.params);

  $.ajax({
    data,
    dataType: 'json',
    type: 'POST',
    contentType: 'application/json',
    url,

    success(data, textStatus, jqXHR) {
      MenuStore.hideLoader();

      if (textStatus === 'success' && jqXHR.status === 200) {
        handleSuccess(options, util.fixNumbers(data.result));
      }
    },

    error(jqXHR) {
      MenuStore.hideLoader();
      const error: ServerError = jqXHR?.responseJSON?.error || {
        code: -1,
        message: jqXHR.responseText,
      };

      if (error.code === 1016) {
        WindowsStore.add('captcha', {
          onCaptchaComplete: () => retry(),
        });
      } else {
        handleError(options, error);
      }
    },
  });
};

export const call = function (obj: ServerRequest): void {
  MenuStore.showLoader();

  const options = addSession(obj);
  const body = createBody(options);
  const data = JSON.stringify(body);
  const url = createUrl(options);

  const retry = function () {
    call(obj);
  };

  sendRequest(url, data, options, retry);
};

//
// Split the status message into server, body, empire
// and call the corresponding actions
//
export const splitStatus = function (status: StatusBlock): void {
  if (status.server) {
    ServerRPCStore.update(status.server);
  }
  if (status.empire) {
    EmpireRPCStore.update(status.empire);
  }
  if (status.body) {
    BodyRPCStore.update(status.body);
  }
};

export default { call, splitStatus };
