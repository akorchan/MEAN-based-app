'use strict';

/** Controllers */
angular.module('app.controllers').controller('MainController',function ($scope, $document) {

    $scope.showMeaning = false;

    $scope.toTheTop = function () {
        $document.scrollTopAnimated(0).then(function () {
            console && console.log('You just scrolled to the top!');
        });
    }

    $scope.$on('showMeaning', function () {
        $scope.showMeaning = true;
        $scope.$apply();
        $document.scrollToElementAnimated(angular.element(document.getElementById('meaning-section')));
    });

}).value('duScrollOffset', 30);
