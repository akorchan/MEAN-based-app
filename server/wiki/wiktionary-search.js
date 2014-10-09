'use strict';

var util = require('util');
var http = require('http');

var wiktionaryFindWord = "http://%s.wiktionary.org/w/index.php?action=raw&title=%s";
var wiktionaryOpenSearch = "http://%s.wiktionary.org/w/api.php?action=opensearch&search=%s";

function meaning(language, word, successCallback, failureCallback) {
    performRequest(util.format(wiktionaryFindWord, language, word), function (body) {
        if (body !== '') {
            successCallback(cleanupResultsArray(parseWikiResponse(parsreLanguagePart(body, language), parsingItemMapTranslations.meaning[language])));
        }
        else {
            failureCallback();
        }
    });
}

function openSearch(language, word, successCallback, failureCallback) {
    performRequest(util.format(wiktionaryOpenSearch, language, word), function (body) {
        if (body !== '') {
            successCallback(cleanupOpenSearchResults(body));
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


function parsreLanguagePart(textToParse, lang) {
    textToParse = textToParse + '{{-xx-}}'
    var found = [];
    var foundedMatches = [];
    var regex = new RegExp('({{-' + lang + '-}})[\\s*\\S*]+?({{-[a-z]{2}-}}{0,1})', 'g');
    while (found = regex.exec(textToParse)) {
        foundedMatches.push(found[0]);
    }
    return foundedMatches.join('XXXXXXX');
}

function parseWikiResponse(textToParse, parsedElement) {
    var arrayToReturn = [];
    var found = [];
    var foundedMatches = [];
    var regex = new RegExp('(' + parsedElement + '\\s*={3,4})(\\s.*?)+(={3,4})', 'g');
    while (found = regex.exec(textToParse)) {
        foundedMatches.push(found[0]);
    }
    for (var i = 0; i < foundedMatches.length; i++) {
        var match = foundedMatches[i];
        console.log(match);
        if (match !== null) {
            var results = match.split('# ');
            if (results.length > 2) {
                arrayToReturn = arrayToReturn.concat(results.slice(1, results.length - 1));
            } else if (results.length = 2) {
                arrayToReturn = arrayToReturn.concat(results.slice(1));
            }
        }
    }
    return arrayToReturn;
}

function cleanupResultsArray(results) {
    //TODO remove redundant symbols
    return results;
}

function cleanupOpenSearchResults(results) {
    return JSON.parse(results.substring(9))[1];
}

var parsingItemMapTranslations = {
    meaning: {
        "ru": "Значение"
    }
}

exports.meaning = meaning;
exports.openSearch = openSearch;

/*
    testing regex: http://regex101.com/
    words for testing:
    наречеие - на двух языказ значение из разных частей речи (по два для каждого языка)
    конформизм - одно значение
    нонконформизм - три значение
 */


