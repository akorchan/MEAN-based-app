'use strict';

angular.module('app.services').service('WordsService', function ($http, EndPointUrls) {

    var getMeaning = function (word, language, callback) {
        $http({method: "GET", url: EndPointUrls.findWord, params: {word: word, lang: language}}).
            success(function (data) {
                callback(data);
            }).error(function (data) {
                console.log(data);
            });
    };

    var getMeaningSync = function (word, language) {
        return new Promise(function (resolve, reject) {
            $http({method: "GET", url: EndPointUrls.findWord, params: {word: word, lang: language}}).
                success(function (data) {
                    resolve(data);
                }).error(function (data) {
                    console.log(data);
                    reject(Error(data));
                });
        });


        $http({method: "GET", url: EndPointUrls.findWord, params: {word: word, lang: language}}).
            success(function (data) {
                callback(data);
            }).error(function (data) {
                console.log(data);
            });
    };

    var postWord = function (word, meaning, callback) {
        $http({method: "POST", url: EndPointUrls.postWord, params: {word: word, meaning: meaning}}).
            success(function (data) {
                callback(data);
            }).error(function (data) {
                console.log(data);
            });
    };

    var searchWords = function (word, language, callback) {
        $http({method: "GET", url: EndPointUrls.findWords, params: {word: word, lang: language}}).
            success(function (data) {
                callback(data);
            }).error(function (data) {
                console.log(data);
            });
    };

    return {
        getMeaning: getMeaning,
        getMeaningSync: getMeaningSync,
        postWord: postWord,
        searchWords: searchWords
    };

});