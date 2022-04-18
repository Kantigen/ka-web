'use strict';

// Vex is a library for making pretty alert/prompt/confirm windows.
// This module is a simple wrapper around said library to simplify the process of using Vex.

import vex from 'app/vendor-js/vex.dialog';

vex.defaultOptions.className = 'vex-theme-default';

export const alert = function(message) {
    vex.alert(message);
};

export const confirm = function(message, yesCallback, noCallback) {
    vex.confirm({
        message: message,
        callback: function(value) {
            if (value && typeof yesCallback === 'function') {
                yesCallback();
            } else if (!value && typeof noCallback === 'function') {
                noCallback();
            }
        },
    });
};

export const prompt = function(message, placeholder, callback) {
    vex.prompt({
        message: message,
        placeholder: placeholder,
        callback: callback,
    });
};
