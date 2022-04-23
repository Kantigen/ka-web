// let util = require('app/util');

// let StatefulMixinsStore = require('app/stores/mixins/stateful');

// let clone = util.clone;

// let BuildQueueShipyardRPCStore = Reflux.createStore({
//     listenables: [ShipyardRPCActions],

//     mixins: [StatefulMixinsStore],

//     getDefaultData: function() {
//         let state = {
//             number_of_ships_building: 0,
//             number_of_fleets_building: 0,
//             cost_to_subsidize: 0,
//             fleets_building: [],
//         };
//         return state;
//     },

//     handleNewData: function(result) {
//         let state = clone(this.state);

//         state.number_of_ships_building = result.number_of_ships_building + 0;
//         state.number_of_fleets_building = result.number_of_fleets_building + 0;
//         state.cost_to_subsidize = result.cost_to_subsidize + 0;
//         state.fleets_building =
//             $.map(result.fleets_building, function(value, index) {
//                 return [value];
//             }) || [];

//         this.emit(state);
//     },

//     onSuccessShipyardRPCViewBuildQueue: function(result) {
//         this.handleNewData(result);
//     },
// });

// module.exports = BuildQueueShipyardRPCStore;
