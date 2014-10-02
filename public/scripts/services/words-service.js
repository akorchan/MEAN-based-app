'use strict';

angular.module('app.services').service('WordsService', function ($http, EndPointUrls) {

    var getMeaning = function (word, language, callback) {
        $http({method: "GET", url: EndPointUrls.words, params: {word: word, lang: language}}).
            success(function (data) {
                callback(data);
            }).error(function (data) {
                console.log(data);
            });
    };

    return {
        getMeaning: getMeaning
    };

});