// let util = require('app/util');

// let StatefulMixinsStore = require('app/stores/mixins/stateful');

// let clone = util.clone;

// let ViewAllFleetsSpacePortRPCStore = Reflux.createStore({
//     listenables: [SpacePortRPCActions],

//     mixins: [StatefulMixinsStore],

//     getDefaultData: function() {
//         let state = {
//             fleets: [],
//             number_of_fleets: 0,
//         };
//         return state;
//     },

//     handleNewData: function(result) {
//         let state = clone(this.state);

//         state.fleets = result.fleets;
//         state.number_of_fleets = result.number_of_fleets * 1;

//         this.emit(state);
//     },

//     onSuccessSpacePortRPCViewAllFleets: function(result) {
//         this.handleNewData(result);
//     },
// });

// module.exports = ViewAllFleetsSpacePortRPCStore;
