'use strict';

/** Controllers */
angular.module('app.controllers').controller('MainController', function ($scope, WordsService) {
    $scope.selected = undefined;
    $scope.words = [];
//    var isAutocompelteEnabled = true;
    $scope.onedit = function () {
//        if (isAutocompelteEnabled) {
            $scope.words = [];
            WordsService.searchWords($scope.selected, 'ru', function (searchingData) {
//                isAutocompelteEnabled = false;
            $scope.words = searchingData;
//            duplicates apears here
/*                console.log(searchingData + ' : ' + searchingData);
                if (angular.isArray(searchingData)) {
                    $scope.words = [];
                    searchingData.reduce(function (sequence, word) {
                        return sequence.then(function () {
                            return WordsService.getMeaningSync(word, 'ru')
                        }).then(function (meaning) {
                                if (meaning.length > 0) {
                                    $scope.words.push(word);
                                } else {
                                    console.log(word + "-" + meaning);
                                }
                            });
                    }, Promise.resolve()).then(function () {
                            isAutocompelteEnabled = true;
                        });
                }*/
            });
//        }
    }
});
