'use strict';

/** Controllers */
angular.module('app.controllers').controller('ExampleController', function ($scope, ExampleService) {
    ExampleService.getSimpleData("get simple data", function (data) {
        $scope.getResponse = data;
        console.log(data);
    });
});