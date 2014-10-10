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
    for (var i = 0; i < results.length; i++) {
        results[i] = parseWikiText(results[i]);
    }
    return results;
}

//TODO improve
function parseWikiText(s) {
    // e.g. {{Persondata|NAME=Gordh, Gordon|ALTERNATIVE NAMES=|SHORT DESCRIPTION=Entomologist|DATE OF BIRTH=1945|PLACE OF BIRTH=[[USA]]|DATE OF DEATH=|PLACE OF DEATH=USA}}
    s = s.split(/\|[A-Z ]{5,100}/)[0];

    var pattern = /\[\[(.*?)\]\]/g,
        output = s,
        m;

    // e.g. | SHORT DESCRIPTION=[[United States Senate|U.S. Senator]] from [[Massachusetts]], [[John Kerry presidential campaign, 2004|2004 presidential nominee]] for the [[Democratic Party (United States)|Democratic Party]]
    while (m = pattern.exec(s)) {
        if (m[1].split("|").length > 1) {
            var sub = m[1].split("|")[1];
        } else {
            var sub = m[1];
        }
        output = output.replace(m[0], sub);
    }
    return output.replace(/\s+/g, " ");
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


