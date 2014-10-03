'use strict';

//not used for now
angular.module('app.constants').constant('EndPointUrls', {
        findWord: '/words/:word/:lang',
        findWords: '/words/search/:word/:lang',
        postWord: '/words/:word/:meaning'
});