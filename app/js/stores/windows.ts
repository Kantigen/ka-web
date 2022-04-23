import _ from 'lodash';
import { makeAutoObservable } from 'mobx';
import { Window, WindowType, WindowOptions } from 'app/js/interfaces';

let findWindowByType = function (windows: Window[], type: WindowType) {
    let index = _.findIndex(windows, function (o) {
        if (o) {
            return o.type === type;
        }

        return false;
    });

    if (index > -1) {
        let obj = windows[index];

        // Add the index we found this at for convenience.
        obj.index = index;

        return obj;
    } else {
        return undefined;
    }
};

class WindowsStore {
    windows: Window[] = [];
    zIndex = 2000000;

    constructor() {
        makeAutoObservable(this);
    }

    //
    // We only allow one window of each type (e.g. 'about' or 'building')
    //
    add(type: WindowType, options: WindowOptions = {}) {
        let index = this.windows.length;

        // However, if there is an existing window type, we replace it because we only want
        // one of each type of window on screen at a given time.
        let existingWindow = findWindowByType(this.windows, type);
        if (existingWindow) {
            index = existingWindow.index;
        }

        this.windows[index] = {
            type: type,
            zIndex: this.zIndex,
            options: options,
            index: index,
        };

        this.zIndex += 1;
    }

    //
    // Close window by type, e.g. 'captcha'
    //
    close(type: WindowType) {
        let existingWindow = findWindowByType(this.windows, type);
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

    //
    // Close the window on top when user hits the escape key.
    //
    onEscKey() {
        let toClose = _.chain(this.windows).sortBy('zIndex').reverse().first().value();
        if (!toClose) return;
        this.close(toClose.type);
    }

    //
    // Bring a window to the top of the stack by type.
    //
    bringToTop(type: WindowType) {
        let toBringToTop = findWindowByType(this.windows, type);
        if (!toBringToTop) return;

        if (this.windows[toBringToTop.index].zIndex === this.zIndex - 1) {
            // We're already the top window and there's therefore nothing to do...
        } else {
            this.windows[toBringToTop.index].zIndex = this.zIndex;
            this.zIndex += 1;
        }
    }
}

export default new WindowsStore();
