'use strict';

var wordsController = require('../server/api-controllers/words.js');

module.exports = function (app) {
    app.get('/words/:word/:lang', wordsController.getMeaning);
    app.get('/words/search/:word/:lang', wordsController.startsWith);
    app.post('/words/:word/:meaning', wordsController.addWord);
};