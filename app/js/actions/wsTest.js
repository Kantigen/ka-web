'use strict';

var Reflux = require('reflux');
var constants = require('js/constants');

var WsTestActions = Reflux.createActions([
    'loginWithPassword',
    'loginWithEmail',
    'register',
    'logout',

    // The following are all actions triggered by a server Web Socket message
    'serverClientCode',
    'serverLoginWithPassword',
    'serverRegister',
    'serverWelcome',
]);

var testWs = function() {
    var ws = new WebSocket(constants.WS_BASE);
    var clientCode = 'bad';

    ws.onmessage = function() {
        // TODO Better error checking for valid function names
        // TODO Check for message error codes
        console.log('WsTestActions: message [' + event.data + ']');
        var json = JSON.parse(event.data);
        var func = json.route;
        // Lose the first '/' and replace all others with '_'
        func = func.slice(1);
        func = func.replace(/\//g, '_');
        // Capitalize First Letter and prepend 'server'
        func = func.charAt(0).toUpperCase() + func.slice(1);
        func = 'server' + func;

        console.log('Userstore: func [' + func + ']');
        // Convert the route into an action
        WsTestActions[func](json.content);
    };

    ws.onopen = function(event) {
        // Validate the clientCode
        console.log('WsTestActions: clientCode needs to be initialized');
        ws.send(
            JSON.stringify({
                route: '/clientCode',
                content: {
                    msg_id: '123',
                    client_code: clientCode,
                },
            })
        );
    };

    // TODO I don't like storing the client code locally, look at how
    // to implement this in a 'cleaner' way.
    WsTestActions.serverClientCode.listen(function(content) {
        console.log('WsTestActions:ws_clientCode [' + content.client_code + ']');
        clientCode = content.client_code;
    });

    ////// Convert user actions into server calls
    //

    WsTestActions.loginWithPassword.listen(function(username, password) {
        console.log('WsTestActions:loginWithPassword');
        ws.send(
            JSON.stringify({
                route: '/loginWithPassword',
                content: {
                    client_code: clientCode,
                    username: username,
                    password: password,
                },
            })
        );
    });

    WsTestActions.register.listen(function(username, password, email) {
        console.log('WsTestActions:register');
        ws.send(
            JSON.stringify({
                route: '/register',
                content: {
                    client_code: clientCode,
                    username: username,
                    password: password,
                    email: email,
                },
            })
        );
    });
};

if (process.env.KA_TEST_WS) {
    testWs();
}

module.exports = WsTestActions;
