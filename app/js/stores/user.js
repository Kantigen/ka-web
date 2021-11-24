'use strict';

var ReactTooltip = require('react-tooltip');

//
// TODO What is the purpose of this store? It does not store anything!
// (it should disappear when the yui code is replaced totally)
//
class UserStore {
    onSuccessEmpireRPCLogout() {
        // Here be the traditional code to reset the game...
        YAHOO.lacuna.Game.Reset();
        YAHOO.lacuna.MapPlanet.Reset();
        YAHOO.lacuna.Game.DoLogin();

        // Hide all our tooltips
        ReactTooltip.hide();
    }
}

module.exports = new UserStore();
