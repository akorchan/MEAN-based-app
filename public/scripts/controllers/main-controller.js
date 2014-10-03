'use strict';

/** Controllers */
angular.module('app.controllers').controller('MainController', function ($scope, WordsService) {
    $scope.selected = undefined;
    $scope.words = [];

    $scope.onedit = function () {
        $scope.words = [];
        WordsService.searchWords($scope.selected, 'ru', function (searchingData) {
//            duplicates apears here
            console.log(searchingData + ' : ' + searchingData);
            if (angular.isArray(searchingData)) {
                $scope.words = [];
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
