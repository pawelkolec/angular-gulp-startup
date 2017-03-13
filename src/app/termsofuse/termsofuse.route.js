(function() {
    'use strict';

    angular
    .module('clixmix')
    .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider) {
        $stateProvider
        .state('home.termsofuse', {
            url: "termsofuse",
            views: {
                'content@': {
                    templateUrl: 'app/termsofuse/termsofuse.html',
                    controller: 'termofuseController',
                    controllerAs: 'termCtrl'
                }
            }
        });
    }

})();
