// Vex is a library for making pretty alert/prompt/confirm windows.
// This module is a simple wrapper around said library to simplify the process of using Vex.

import vex from 'vex-js';
import vexDialog from 'vex-dialog';
vex.registerPlugin(vexDialog);

vex.defaultOptions.className = 'vex-theme-default';

export const alert = function (message: string) {
  vex.dialog.alert(message);
};

export const confirm = function (message: string, yesCallback?: Function, noCallback?: Function) {
  vex.dialog.confirm({
    message: message,
    callback: function (value) {
      if (value && typeof yesCallback === 'function') {
        yesCallback();
      } else if (!value && typeof noCallback === 'function') {
        noCallback();
      }
    },
  });
};

export const prompt = function (message: string, placeholder: string, callback: Function) {
  vex.dialog.prompt({
    message: message,
    placeholder: placeholder,
    callback: callback,
  });
};
