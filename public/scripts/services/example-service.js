'use strict';

angular.module('app.services').service('ExampleService', function ($http) {

    var getSimpleData = function (argument1, callback) {
        $http({method: "GET", url: '/example/action/:value', params: {value: argument1}}).
            success(function (data) {
                callback(data);
            }).error(function (data) {
                console.log(data);
            });
    };

    return {
        getSimpleData: getSimpleData
    };

});