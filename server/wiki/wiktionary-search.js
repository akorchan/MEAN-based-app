'use strict';

var util = require('util');
var http = require('http');

var wiktionaryFindWord = "http://%s.wiktionary.org/w/index.php?action=raw&title=%s";
var wiktionaryOpenSearch = "http://%s.wiktionary.org/w/api.php?action=opensearch&search=%s";

function meaning(language, word, successCallback, failureCallback) {
    performRequest(util.format(wiktionaryUrlPattern, language, word), function (body) {
        if (body !== '') {
            successCallback(cleanupResultsArray(parseWikiResponse(body, parsingItemMapTranslations.meaning[language])));
        }
        else {
            failureCallback();
        }
    });
}

function openSearch(language, word, successCallback, failureCallback) {
    performRequest(util.format(wiktionaryOpenSearch, language, word), function (body) {
        if (body !== '') {
            console.log(body);
//            successCallback(cleanupResultsArray(parseWikiResponse(body, parsingItemMapTranslations.meaning[language])));
        }
        else {
            failureCallback();
        }
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
    return results.slice(1, results.length - 1);
}

function cleanupResultsArray(results) {
    //TODO remove redundant symbols
    return results;
}

var parsingItemMapTranslations = {
    meaning: {
        "ru": "Значение"
    }
}

exports.meaning = meaning;
exports.openSearch = openSearch;


