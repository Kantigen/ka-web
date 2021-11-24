'use strict';

var _ = require('lodash');
var util = require('js/util');

var ServerRPCStore = require('js/stores/rpc/server');
var EmpireRPCStore = require('js/stores/rpc/empire');
var BodyRPCStore = require('js/stores/rpc/body');
var MenuStore = require('js/stores/menu');
var SessionStore = require('js/stores/session');
var Captcha = require('js/components/window/captcha');

var constants = require('js/constants');

var defaults = {
    module: '',
    method: '',
    params: {},
    addSession: true,
    success: _.noop,
    error: _.noop,
    scope: window,
};

var handleDefaults = function(options) {
    // NOTE: we merge this into `{}` so as to avoid leaking stuff into `defaults`.
    // The Lo-dash docs are not clear about this, so we just need to make sure.
    return _.merge({}, defaults, options || {});
};

var addSession = function(options) {
    var sessionId = SessionStore.session;

    if (options.addSession === true && sessionId) {
        if (_.isArray(options.params)) {
            options.params = [sessionId].concat(options.params);
        } else {
            options.params.session_id = sessionId;
        }
    }

    return options;
};

var handleParams = function(options) {
    // If there was only one parameter passed and it's an object, it's fine. Otherwise make it into
    // an array to be sent off.
    if (!_.isObject(options.params) && !_.isArray(options.params)) {
        options.params = [options.params];
    }

    return addSession(options);
};

var handleConfig = function(options) {
    options = handleDefaults(options);
    return handleParams(options);
};

var createData = function(options) {
    return JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: options.method,
        params: options.params,
    });
};

var createUrl = function(options) {
    return constants.RPC_BASE + options.module;
};

var handleSuccess = function(options, result) {
    if (result) {
        if (result.status) {
            splitStatus(result.status);

            // Handle the legacy Status stuff...
            YAHOO.lacuna.Game.ProcessStatus(result.status);
        } else if (options.method === 'get_status') {
            splitStatus(result);

            // Handle the legacy Status stuff...
            YAHOO.lacuna.Game.ProcessStatus(result.status);
        }
    }

    if (typeof options.success === 'function') {
        options.success.call(options.scope, result);
    }
};

var handleError = function(options, error) {
    window.alert(error.message + ' (' + error.code + ')');
    console.error('Request error: ', error);

    if (typeof options.error === 'function') {
        options.error.call(options.scope, error);
    }
};

var sendRequest = function(url, data, options, retry) {
    console.log('Calling', options.module + '/' + options.method, options.params);

    $.ajax({
        data: data,
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        url: url,

        success: function(data, textStatus, jqXHR) {
            MenuStore.showLoader();

            var dataToEmit = util.fixNumbers(data.result);

            if (textStatus === 'success' && jqXHR.status === 200) {
                handleSuccess(options, dataToEmit);
            }
        },

        error: function(jqXHR, textStatus, errorThrown) {
            MenuStore.hideLoader();
            var error = {};

            if (typeof jqXHR.responseJSON === 'undefined') {
                error = {
                    code: -1,
                    message: jqXHR.responseText,
                };
            } else {
                error = jqXHR.responseJSON.error;
            }

            var fail = function() {
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

var call = function(obj) {
    MenuStore.showLoader();

    var options = handleConfig(obj);
    var data = createData(options);
    var url = createUrl(options);

    var retry = function() {
        call(obj);
    };

    sendRequest(url, data, options, retry);
};

// Split the status message into server, body, empire
// and call the corresponding actions
//
var splitStatus = function(status) {
    if (status.server) {
        var serverStatus = util.fixNumbers(_.cloneDeep(status.server));
        ServerRPCStore.update(serverStatus);
    }
    if (status.empire) {
        var empireStatus = util.fixNumbers(_.cloneDeep(status.empire));
        EmpireRPCStore.update(empireStatus);
    }
    if (status.body) {
        var bodyStatus = util.fixNumbers(_.cloneDeep(status.body));
        BodyRPCStore.update(bodyStatus);
    }
};

module.exports.call = call;
module.exports.splitStatus = splitStatus;
