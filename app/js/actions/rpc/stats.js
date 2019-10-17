'use strict';

var Reflux = require('reflux');

var StatsRPCActions = Reflux.createActions([
    'requestStatsRPCGetCredits',
    'successStatsRPCGetCredits',
    'failureStatsRPCGetCredits',
]);

module.exports = StatsRPCActions;
