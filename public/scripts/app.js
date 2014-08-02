'use strict';

angular.module('app', ['ngRoute', 'app.controllers', 'app.services'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: '/views/main.html', controller: 'MainController'})
            .when('/example', {templateUrl: '/views/example.html', controller: 'ExampleController'})
            .otherwise({ redirectTo: '/404'});
    });

/** services module initialization, allows adding services to module in multiple files */
angular.module('app.services', []);

/** controllers module initialization, allows adding controllers to module in multiple files */
angular.module('app.controllers', ['app.services', 'app.directives']);

/** directives module initialization, allows adding directives to module in multiple files */
angular.module('app.directives', []);