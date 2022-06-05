/// <reference types="./vex" />

// Vex is a library for making pretty alert/prompt/confirm windows.
// This module is a simple wrapper around said library to simplify the process of using Vex.

import vex from 'vex-js';
import vexDialog from 'vex-dialog';

vex.registerPlugin(vexDialog);

vex.defaultOptions.className = 'vex-theme-default';

export const alert = function (message: string, callback?: Function) {
  vex.dialog.alert({
    message,
    callback: () => {
      if (typeof callback === 'function') callback();
    },
  });
};

export const confirm = function (message: string, yesCallback?: Function, noCallback?: Function) {
  vex.dialog.confirm({
    message,
    callback(value: boolean) {
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
    message,
    placeholder,
    callback,
  });
};
