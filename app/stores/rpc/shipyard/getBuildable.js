// let util = require('app/util');

// let StatefulMixinsStore = require('app/stores/mixins/stateful');

// let clone = util.clone;

// let GetBuildableShipyardRPCStore = Reflux.createStore({
//     listenables: [ShipyardRPCActions],

//     mixins: [StatefulMixinsStore],

//     getDefaultData: function() {
//         let state = {
//             buildable: {},
//             docks_available: 0,
//             build_queue_max: 0,
//             build_queue_used: 0,
//         };
//         return state;
//     },

//     handleNewData: function(result) {
//         let state = clone(this.state);

//         state.buildable = result.buildable;
//         state.docks_available = result.docks_available + 0;
//         state.build_queue_max = result.build_queue_max + 0;
//         state.build_queue_used = result.build_queue_used + 0;

//         this.emit(state);
//     },

//     onSuccessShipyardRPCGetBuildable: function(result) {
//         this.handleNewData(result);
//     },
// });

// module.exports = GetBuildableShipyardRPCStore;
