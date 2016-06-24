'use strict';

var constants           = require('js/constants');

var actionMap = {};
actionMap['user']          = require('js/actions/ws/user');

// TODO clientCode should come from local store
// TODO we need to be able to reconnect to the WebSocket if it fails
var ws          = new WebSocket(constants.WS_BASE);
var clientCode  = 'bad';
var msgId       = 0;

// Handle messages from the Server
//
// for example: if the route comes in as '/user/clientCode'
// We need to do actions from 'js/actions/ws/user'
// and call action 'requestUserWsClientCode
//
ws.onmessage = function(event) {
    console.log("Web Socket: message ["+event.data+"]");
    var json = JSON.parse(event.data);
    var routeMethod = json.route;

    var index   = routeMethod.lastIndexOf('/');
    var route   = routeMethod.substring(1,index-1);
    var method  = routeMethod.substring(index+1);

    var actionClass  = actionMap[route];

    // Capitalize first letter of 'method' and 'route'
    method      = method.charAt(0).toUpperCase() + method.slice(1);
    route       = route.charAt(0).toUpperCase() + route.slice(1);

    // Combine to create the action name
    var action  = "request" + route + "WS" + method;

    if (! actionClass) {
        console.log("ERROR: could not find route to ["+routeMethod+"]");
        return;
    }

    // Convert the route and method into an action
    actionClass[action](json.content);
}

// Automatically add the clientCode to the outgoing message
var addClientCode = function(message) {

    message.clientCode = clientCode;
    return message;
}

ws.onopen = function(event) {
    // Validate the clientCode
    console.log("Validate clientCode");

    call({
        "route" :   "/user/clientCode"
    });
};

// Send the message.
// Add the clientCode
// Add the msgId (next number in series)
// 
var call = function(message) {
    message.msgId       = ++msgId;
    message.clientCode  = clientCode

    ws.send(JSON.stringify(message));
    return msgId;
};

module.exports.clientCode   = clientCode;
module.exports.call         = call;

