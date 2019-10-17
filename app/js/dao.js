'use strict';

var server = require('js/server');
var _ = require('lodash');

// TODO Can we replace this with a function to recursively require them?

require('js/dao/stats');
require('js/dao/empire');
require('js/dao/captcha');
require('js/dao/essentiaVein');
require('js/dao/intelTraining');
require('js/dao/mayhemTraining');
require('js/dao/politicsTraining');
require('js/dao/theftTraining');
require('js/dao/genericBuilding');
require('js/dao/shipyard');
require('js/dao/spacePort');
require('js/dao/trade');
require('js/dao/transporter');
require('js/dao/map');
require('js/dao/body');
require('js/dao/ws');

require('js/ws');

module.exports.makeServerCall = function(uri, options, actions) {
    var defaults = {
        module: uri,
        params: {},
        success: 'noop',
        error: 'noop',
    };
    options = _.merge({}, defaults, options || {});

    server.call({
        module: options.module,
        method: options.method,
        params: options.params,
        success: function(result) {
            console.log(
                'makeServerCall: SUCCESS ' +
                    uri +
                    ' - ' +
                    options.method +
                    '_success'
            );
            actions[options.success](result);
        },
        error: function(error) {
            console.log(
                'makeServerCall: FAILURE ' +
                    uri +
                    ' - ' +
                    options.method +
                    '_success'
            );
            actions[options.error](error);
        },
    });
};
