'use strict';

var wiktionarySearch = require('./../wiki/wiktionary-search.js');

exports.getSimpleData = function (req, res) {
    if (typeof(req.query.value) === 'undefined') {
        res.send('GET parameter was not passed.')
        return;
    }
    wiktionarySearch.meaning("ru", "нонконформизм");
    res.send('GET request with parameter: ' + req.query.value);
};


