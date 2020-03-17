'use strict';

var express = require('express');
var path = require('path');

module.exports = function(done) {
    var app = express();
    var port = process.env.PORT || 80;
    var dir = path.join(__dirname, '..');
    console.log('Servering static files from', dir);
    app.use(express.static(dir));

    app.listen(port, function() {
        console.log(`Listening on http://localhost:${port}/ for requests.`);
        done();
    });
};
