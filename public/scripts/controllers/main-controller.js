'use strict';

/** Controllers */
angular.module('app.controllers').controller('MainController', function ($scope, $document, WordsService) {
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

    $scope.toTheTop = function() {
        $document.scrollTopAnimated(0).then(function() {
            console && console.log('You just scrolled to the top!');
        });
    }
    var section2 = angular.element(document.getElementById('section-2'));
    $scope.toSection2 = function() {
        $document.scrollToElementAnimated(section2);
    }

}).value('duScrollOffset', 30);
