'use strict';

var wiktionarySearch = require('./../wiki/wiktionary-search.js');
var dbWords = require('./../storage/db-words');

exports.addWord = function (req, res) {
    var word = req.query.word;
    var meaning = req.query.meaning;
    if ((typeof(word) === 'undefined') || (typeof(meaning) === 'undefined')) {
        res.send('POST parameters were not passed.')
        return;
    }
    dbWords.addNewWord(word, meaning, function() {
        console.log("added");
    });
};

exports.getMeaning = function (req, res) {
    var word = req.query.word;
    var lang = req.query.lang;
    if ((typeof(word) === 'undefined') || (typeof(lang) === 'undefined')) {
        res.status(400).send('GET parameters were not passed.')
        return;
    }
    wiktionarySearch.meaning(lang, word,
        function (results) {
            res.send(results);
        }, function () {
            res.status(204).send('Can not find word [' + word + '] for language [' + lang + '].');
        });
};

exports.startsWith = function (req, res) {
    var word = req.query.word;
    var lang = req.query.lang;
    if ((typeof(word) === 'undefined') || (typeof(lang) === 'undefined')) {
        res.send('GET parameters were not passed.')
        return;
    }
    wiktionarySearch.openSearch(lang, word,
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


