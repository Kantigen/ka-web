'use strict';

var Reflux = require('reflux');
var _ = require('lodash');

var StatefulMixinStore = require('js/stores/mixins/stateful');

var KeyboardActions = require('js/actions/keyboard');
var WindowActions = require('js/actions/window');

var findWindowByType = function(windows, type) {
    var index = _.findIndex(windows, function(o) {
        if (o) {
            return o.type === type;
        }

        return false;
    });

    if (index > -1) {
        var obj = windows[index];

        // Add the index we found this at for convenience.
        obj.index = index;

        return obj;
    } else {
        return undefined;
    }
};

var WindowsStore = Reflux.createStore({
    listenables: [WindowActions, KeyboardActions],

    mixins: [StatefulMixinStore],

    getDefaultData: function() {
        return {
            windows: [],
            zIndex: 2000000,
        };
    },

    // We only allow one window of each type (e.g. 'about' or 'building')
    onWindowAdd: function(newWindow, type, options) {
        var state = _.cloneDeep(this.state);

        // By default, we create a new window.
        var index = state.windows.length;

        // However, if there is an existing window type, we replace it because we only want
        // one of each type of window on screen at a given time.
        var existingWindow = findWindowByType(state.windows, type);
        if (existingWindow) {
            index = existingWindow.index;
        }

        state.windows[index] = {
            window: newWindow,
            type: type,
            zIndex: state.zIndex,
            options: options || {},
        };

        state.zIndex += 1;

        this.emit(state);
    },

    // Close window by type, e.g. 'captcha'
    //
    onWindowCloseByType: function(type) {
        var state = _.cloneDeep(this.state);

        var existingWindow = findWindowByType(state.windows, type);

        if (existingWindow) {
            state.windows.splice(existingWindow.index, 1);
        }

        this.emit(state);
    },

    // Close window based on the window itself
    //
    onWindowClose: function(theWindow) {
        WindowActions.windowCloseByType(theWindow.type);
    },

    // Close all windows (i.e., where we log out).
    //
    onWindowCloseAll: function() {
        this.emit(this.getDefaultData());
    },

    // Close the window on top when user hits the escape key.
    //
    onEscKey: function() {
        var state = _.cloneDeep(this.state);
        var toClose = _.chain(state.windows)
            .sortBy('zIndex')
            .reverse()
            .first()
            .value();

        if (toClose) {
            WindowActions.windowCloseByType(toClose.type);
        }
    },

    // Bring a window to the top of the stack by type.
    //
    onWindowBringToTop: function(type) {
        var state = _.cloneDeep(this.state);
        var toBringToTop = findWindowByType(state.windows, type);

        if (toBringToTop) {
            if (state.windows[toBringToTop.index].zIndex === state.zIndex - 1) {
                // We're already the top window and there's therfore nothing to do...
            } else {
                state.windows[toBringToTop.index].zIndex = state.zIndex;
                state.zIndex += 1;
            }

            this.emit(state);
        }
    },
});

module.exports = WindowsStore;
