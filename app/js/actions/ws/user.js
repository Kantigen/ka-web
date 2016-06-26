'use strict';

var Reflux = require('reflux');

var UserWSActions = Reflux.createActions([
    'requestUserWSClientCode',
    'successUserWSClientCode',
    'failureUserWSClientCode',
    'requestUserWSRegister',
    'successUserWSRegister',
    'failureUserWSRegister'
]);

module.exports = UserWSActions;
