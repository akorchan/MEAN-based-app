'use strict';

var examplesController = require('../server/api-controllers/examples.js');

module.exports = function (app) {
    app.get('/example/action/:value', examplesController.getSimpleData);
};