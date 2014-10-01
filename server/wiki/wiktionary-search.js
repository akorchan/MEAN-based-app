'use strict';

var util = require('util');
var http = require('http');

function meaning(language, word) {
    var url = util.format("http://%s.wiktionary.org/w/index.php?action=raw&title=%s", language, word);
    performRequest(url, function (body) {
        parseWikiResponse(body, parsingItemMapTranslations.meaning[language]);
    });
}

function performRequest(url, callback) {
    var bodyToProcess;
    var req = http.request(url, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            bodyToProcess += chunk;
        });
        res.on('end', function () {
            callback(bodyToProcess);
        });
    });
    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    req.end();
}

function parseWikiResponse(textToParse, parsedElement) {
    var str = "For more information, see Chapter 3.4.5.1";
    var regex = new RegExp('(' + parsedElement + '\\s*={3,4})(\\s.*?)+(={3,4})');
    var found = textToParse.match(regex)[0];
    var results = found.split('#');
    results = results.slice(1, results.length - 1);
    console.log(results);
}

var parsingItemMapTranslations = {
    meaning: {
        "ru": "Значение"
    }
}

exports.meaning = meaning;


