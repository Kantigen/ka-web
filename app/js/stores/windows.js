'use strict';

const _ = require('lodash');
const { makeAutoObservable } = require('mobx');

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

class WindowsStore {
    windows = [];
    zIndex = 2000000;

    constructor() {
        makeAutoObservable(this);
    }

    //
    // We only allow one window of each type (e.g. 'about' or 'building')
    //
    add(type, options = {}) {
        var index = this.windows.length;

        // However, if there is an existing window type, we replace it because we only want
        // one of each type of window on screen at a given time.
        var existingWindow = findWindowByType(this.windows, type);
        if (existingWindow) {
            index = existingWindow.index;
        }

        this.windows[index] = {
            type: type,
            zIndex: this.zIndex,
            options: options,
        };

        this.zIndex += 1;
    }

    //
    // Close window by type, e.g. 'captcha'
    //
    close(type) {
        var existingWindow = findWindowByType(this.windows, type);
        if (!existingWindow) return;
        this.windows.splice(existingWindow.index, 1);
    }

    //
    // Close all windows (i.e., where we log out).
    //
    closeAll() {
        this.windows = [];
        this.zIndex = 2000000;
    }

    // Close the window on top when user hits the escape key.
    //
    onEscKey() {
        var toClose = _.chain(this.windows)
            .sortBy('zIndex')
            .reverse()
            .first()
            .value();
        if (!toClose) return;
        this.closeByType(toClose.type);
    }

    //
    // Bring a window to the top of the stack by type.
    //
    bringToTop(type) {
        var toBringToTop = findWindowByType(this.windows, type);
        if (!toBringToTop) return;

        if (this.windows[toBringToTop.index].zIndex === this.zIndex - 1) {
            // We're already the top window and there's therefore nothing to do...
        } else {
            this.windows[toBringToTop.index].zIndex = this.zIndex;
            this.zIndex += 1;
        }
    }
}

module.exports = new WindowsStore();
