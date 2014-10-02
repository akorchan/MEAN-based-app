'use strict';

var wiktionarySearch = require('./../wiki/wiktionary-search.js');

exports.addWord = function (req, res) {
};

exports.getMeaning = function (req, res) {
    if ((typeof(req.query.word) === 'undefined') || (typeof(req.query.lang) === 'undefined')) {
        res.send('GET parameter was not passed.')
        return;
    }
    var word = req.query.word;
    word = 'нонконформизм';
    var lang = req.query.lang;
    lang = 'ru';
    wiktionarySearch.meaning(lang, word,
        function (results) {
            res.send(results);
        }, function () {
            res.send('Can not find word [' + word + '] for language [' + lang + '].');
        });
};

exports.getWords = function (req, res) {
};

exports.rateWord = function (req, res) {
};


