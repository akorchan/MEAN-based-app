'use strict';

/** Controllers */
angular.module('app.controllers').controller('MainController', function ($scope, WordsService) {
    $scope.selected = undefined;
    $scope.words = [];
    $scope.words2 = [];

    $scope.onedit = function () {
        $scope.words = [];
        $scope.words2 = [];
        WordsService.searchWords($scope.selected, 'ru', function (searchingData) {
            if (angular.isArray(searchingData)) {
                $scope.words2 = searchingData;
                var sequence = Promise.resolve();
                searchingData.forEach(function (word) {
                    sequence = sequence.then(function () {
                        return WordsService.getMeaningSync(word, 'ru')
                    }).then(function (meaning) {
                            if (meaning.length > 0) {
                                $scope.words.push(word);
                            } else {
                                console.log(word + "-" + meaning);
                            }
                        });
                });
            }
        });

    }
});
