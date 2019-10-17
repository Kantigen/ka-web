'use strict';

var Reflux = require('reflux');

var EmpireRPCActions = Reflux.createActions([
    'requestEmpireRPCLogin',
    'successEmpireRPCLogin',
    'failureEmpireRPCLogin',

    'requestEmpireRPCBoost',
    'successEmpireRPCBoost',
    'failureEmpireRPCBoost',

    'requestEmpireRPCInviteFriend',
    'successEmpireRPCInviteFriend',
    'failureEmpireRPCInviteFriend',

    'requestEmpireRPCGetInviteFriendUrl',
    'successEmpireRPCGetInviteFriendUrl',
    'failureEmpireRPCGetInviteFriendUrl',

    'requestEmpireRPCGetBoosts',
    'successEmpireRPCGetBoosts',
    'failureEmpireRPCGetBoosts',

    'requestEmpireRPCEnableSelfDestruct',
    'successEmpireRPCEnableSelfDestruct',
    'failureEmpireRPCEnableSelfDestruct',

    'requestEmpireRPCDisableSelfDestruct',
    'successEmpireRPCDisableSelfDestruct',
    'failureEmpireRPCDisableSelfDestruct',

    'requestEmpireRPCRedeemEssentiaCode',
    'successEmpireRPCRedeemEssentiaCode',
    'failureEmpireRPCRedeemEssentiaCode',

    'requestEmpireRPCLogout',
    'successEmpireRPCLogout',
    'failureEmpireRPCLogout',
]);

module.exports = EmpireRPCActions;
