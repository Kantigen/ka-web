'use strict';

module.exports = {
    getData: function() {
        return this.state;
    },

    hideWindow: function() {
        this.state.show = false;
        this.trigger(this.state);
    },

    onEscKey: function() {
        if (this.state.show === true) {
            this.hideWindow();
        }
    },
};
