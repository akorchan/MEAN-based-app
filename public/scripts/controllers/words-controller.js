'use strict';

/** Controllers */
angular.module('app.controllers').controller('WordsController', function ($scope, WordsService) {
    WordsService.getMeaning('нонконформизм', 'ru', function (data) {
        $scope.getResponse = data;
        console.log(data);
    });
});