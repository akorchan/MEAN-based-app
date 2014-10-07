'use strict';

/** Controllers */
angular.module('app.controllers').controller('WordsController', function ($scope, $routeParams, $document, WordsService) {
    $scope.word = $routeParams.word
    if (typeof $scope.word !== 'undefined') {
        WordsService.getMeaning($scope.word, 'ru', function (data) {
            $scope.meanings = data;
            $document.scrollToElementAnimated(angular.element(document.getElementById('section-2')));
        });
    }

    $scope.toSection2 = function() {
        $document.scrollToElementAnimated(angular.element(document.getElementById('section-2')));
    }

});