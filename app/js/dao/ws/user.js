'use strict';

var dao                 = require('js/dao');
var vex                 = require('js/vex');
var ws                  = require('js/ws');
var UserWSActions       = require('js/actions/ws/user');

UserWSActions.requestUserWSRegister.listen(function(content) {
    ws.call({
        route   : '/user/register',
        content : content
    });
});


// I'm not sure these belong here. but for now
//

UserWSActions.successUserWSClientCode.listen(function(result) {
    vex.alert('Successful Web Socket call for client code - ' + result.clientCode);

    // Test to see if we can send a registration request
    UserWSActions.requestUserWSRegister({
        username    : 'james_bond',
        email       : 'test@iain-docherty.com'
    });
});

module.exports = UserWSActions;
