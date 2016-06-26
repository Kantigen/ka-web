'use strict';

var Reflux = require('reflux');

var UserWSActions = Reflux.createActions([
    'requestUserWSClientCode',
    'successUserWSClientCode',
    'failureUserWSClientCode',
    'requestUserWSRegister',
    'successUserWSRegister',
    'failureUserWSRegister',
    'requestUserWSLoginWithPassword',
    'successUserWSLoginWithPassword',
    'failureUserWSLoginWithPassword',
]);

module.exports = UserWSActions;
