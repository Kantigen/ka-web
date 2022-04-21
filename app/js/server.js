import constants from 'app/js/constants';

import _ from 'lodash';
import * as util from 'app/js/util';

import ServerRPCStore from 'app/js/stores/rpc/server';
import EmpireRPCStore from 'app/js/stores/rpc/empire';
import BodyRPCStore from 'app/js/stores/rpc/body';
import MenuStore from 'app/js/stores/menu';
import SessionStore from 'app/js/stores/session';
import Captcha from 'app/js/components/window/captcha';

let defaults = {
    module: '',
    method: '',
    params: {},
    addSession: true,
    success: _.noop,
    error: _.noop,
    scope: window,
};

let handleDefaults = function (options) {
    // NOTE: we merge this into `{}` so as to avoid leaking stuff into `defaults`.
    // The Lo-dash docs are not clear about this, so we just need to make sure.
    return _.merge({}, defaults, options || {});
};

let addSession = function (options) {
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

let handleParams = function (options) {
    // If there was only one parameter passed and it's an object, it's fine. Otherwise make it into
    // an array to be sent off.
    if (!_.isObject(options.params) && !_.isArray(options.params)) {
        options.params = [options.params];
    }

    return addSession(options);
};

let handleConfig = function (options) {
    options = handleDefaults(options);
    return handleParams(options);
};

let createData = function (options) {
    return JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: options.method,
        params: options.params,
    });
};

let createUrl = function (options) {
    return constants.RPC_BASE + options.module;
};

let handleSuccess = function (options, result) {
    if (result) {
        if (result.status) {
            splitStatus(result.status);
        } else if (options.method === 'get_status') {
            splitStatus(result);
        }
    }

    if (typeof options.success === 'function') {
        options.success.call(options.scope, result);
    }
};

let handleError = function (options, error) {
    window.alert(error.message + ' (' + error.code + ')');
    console.error('Request error: ', error);

    if (typeof options.error === 'function') {
        options.error.call(options.scope, error);
    }
};

let sendRequest = function (url, data, options, retry) {
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

        error: function (jqXHR, textStatus, errorThrown) {
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
                WindowActions.windowAdd(Captcha, 'captcha', {
                    success: retry,
                });
            } else {
                fail();
            }
        },
    });
};

let call = function (obj) {
    MenuStore.showLoader();

    let options = handleConfig(obj);
    let data = createData(options);
    let url = createUrl(options);

    let retry = function () {
        call(obj);
    };

    sendRequest(url, data, options, retry);
};

// Split the status message into server, body, empire
// and call the corresponding actions
//
let splitStatus = function (status) {
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
