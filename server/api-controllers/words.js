'use strict';

require('./../storage/db');
var wiktionarySearch = require('./../wiki/wiktionary-search.js');
var mongoose = require('mongoose');

var Word = mongoose.model('Word');

exports.addWord = function (req, res) {
    var word = req.query.word;
    var meaning = req.query.meaning;
    if ((typeof(word) === 'undefined') || (typeof(meaning) === 'undefined')) {
        res.send('POST parameters were not passed.')
        return;
    }
    new Word({
        word: word,
        meaning: meaning,
    }).save(function (err, comment, count) {
            if (err) {
                console.log("Error:", err);
            } else {
                console.log("asd");
                console.log(comment);
                console.log(count);
            }
        });
};

exports.getMeaning = function (req, res) {
    var word = req.query.word;
    var lang = req.query.lang;
    if ((typeof(word) === 'undefined') || (typeof(lang) === 'undefined')) {
        res.send('GET parameters were not passed.')
        return;
    }
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


