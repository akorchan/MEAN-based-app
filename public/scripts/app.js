'use strict';

angular.module('app', ['ngRoute', 'app.controllers', 'app.services'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: '/views/main.html', controller: 'MainController'})
            .when('/words', {templateUrl: '/views/words.html', controller: 'WordsController'})
            .otherwise({ redirectTo: '/404'});
    });

/** constants */
angular.module('app.constants', []);

/** services module initialization, allows adding services to module in multiple files */
angular.module('app.services', ['app.constants']);

/** directives module initialization, allows adding directives to module in multiple files */
angular.module('app.directives', []);

/** controllers module initialization, allows adding controllers to module in multiple files */
angular.module('app.controllers', ['app.services', 'app.directives']);
