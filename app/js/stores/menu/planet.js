'use strict';

var Reflux = require('reflux');
var StatefulStore = require('js/stores/mixins/stateful');

var MapActions = require('js/actions/menu/map');
var UserActions = require('js/actions/user');

var PlanetStore = Reflux.createStore({
    listenables: [MapActions, UserActions],

    mixins: [StatefulStore],

    getDefaultData: function() {
        return 0;
    },

    onMapChangePlanet: function(id) {
        console.log('Changing to planet (#' + id + ').');
        this.emit(id);
    },
});

module.exports = PlanetStore;
