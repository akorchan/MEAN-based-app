'use strict';

require('./db');

var mongoose = require('mongoose');

var Word = mongoose.model('Word');

exports.addNewWord = function (word, meaning, callback) {
    new Word({
        word: word,
        meaning: meaning,
    }).save(function (err, word, count) {
            if (err) {
                console.log("Error:", err);
            } else {
               callback();
            }
        });
};
