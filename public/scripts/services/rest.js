'use strict';

//not used for now. check here how to use: https://github.com/ebertsch/MEAN/
angular.module('app')
    .factory('rest', ['$resource', 'EndPointUrls', function ($resource, EndPointUrls) {
        return {
            "exampleItems": $resource(EndPointUrls.example, {id:"@_id"}, { })
        };
    }]);