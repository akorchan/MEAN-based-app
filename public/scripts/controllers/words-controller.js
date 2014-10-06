'use strict';

/** Controllers */
angular.module('app.controllers').controller('WordsController', function ($scope, $routeParams, $location, WordsService) {

    $scope.word = $routeParams.word
    if (typeof $scope.word !== 'undefined') {
        WordsService.getMeaning($scope.word, 'ru', function (data) {
            $scope.meanings = data;
        });
    }

});