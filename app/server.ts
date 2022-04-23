import constants from 'app/constants';

import _ from 'lodash';
import * as util from 'app/util';

import ServerRPCStore from 'app/stores/rpc/server';
import EmpireRPCStore from 'app/stores/rpc/empire';
import BodyRPCStore from 'app/stores/rpc/body';
import MenuStore from 'app/stores/menu';
import SessionStore from 'app/stores/session';
import WindowsStore from 'app/stores/windows';

interface ServerRequest {
    module: string,
    method: string,
    params: object,
    success?: Function,
    error?: Function,
    addSession: boolean,
};

const addSession = function (options: ServerRequest): ServerRequest {
    let sessionId = SessionStore.session;

    if (options.addSession === true && sessionId) {
        if (_.isArray(options.params)) {
            options.params = [sessionId].concat(options.params);
        } else {
            options.params.session_id = sessionId;
        }
    }

    return options;
};

let handleParams = function (options: ServerRequest) {
    // If there was only one parameter passed and it's an object, it's fine. Otherwise make it into
    // an array to be sent off.
    if (!_.isObject(options.params) && !_.isArray(options.params)) {
        options.params = [options.params];
    }

    return addSession(options);
};

let createData = function (options: ServerRequest) {
    return JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: options.method,
        params: options.params,
    });
};

let createUrl = function (options: ServerRequest) {
    return constants.RPC_BASE + options.module;
};

let handleSuccess = function (options: ServerRequest, result: any) {
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

let handleError = function (options: ServerRequest, error: any) {
    window.alert(error.message + ' (' + error.code + ')');
    console.error('Request error: ', error);

    if (typeof options.error === 'function') {
        options.error(error);
    }
};

let sendRequest = function (url: string, data: any, options: ServerRequest, retry: Function) {
    console.log('Calling', options.module + '/' + options.method, options.params);

    $.ajax({
        data: data,
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        url: url,

        success: function (data, textStatus, jqXHR) {
            MenuStore.showLoader();

            let dataToEmit = util.fixNumbers(data.result);

            if (textStatus === 'success' && jqXHR.status === 200) {
                handleSuccess(options, dataToEmit);
            }
        },

        error: function (jqXHR) {
            MenuStore.hideLoader();
            let error = {};

            if (typeof jqXHR.responseJSON === 'undefined') {
                error = {
                    code: -1,
                    message: jqXHR.responseText,
                };
            } else {
                error = jqXHR.responseJSON.error;
            }

            let fail = function () {
                handleError(options, error);
            };

            if (error.code === 1016) {
                WindowsStore.add('captcha', {
                    success: retry,
                });
            } else {
                fail();
            }
        },
    });
};

export const call = function (obj: ServerRequest) {
    MenuStore.showLoader();

    const options = handleParams(obj);
    const data = createData(options);
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
export const splitStatus = function (status: any) {
    if (status.server) {
        let serverStatus = util.fixNumbers(_.cloneDeep(status.server));
        ServerRPCStore.update(serverStatus);
    }
    if (status.empire) {
        let empireStatus = util.fixNumbers(_.cloneDeep(status.empire));
        EmpireRPCStore.update(empireStatus);
    }
    if (status.body) {
        let bodyStatus = util.fixNumbers(_.cloneDeep(status.body));
        BodyRPCStore.update(bodyStatus);
    }
};

export default { call, splitStatus };
