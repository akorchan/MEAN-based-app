'use strict';

var wordsController = require('../server/api-controllers/words.js');

module.exports = function (app) {
    app.get('/words/:word/:lang', wordsController.getMeaning);
};