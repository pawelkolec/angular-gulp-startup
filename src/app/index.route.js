(function() {
    'use strict';

    angular
    .module('clixmix')
    .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider) {

        $urlMatcherFactoryProvider.caseInsensitive(true);

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $locationProvider.hashPrefix('!');

        $stateProvider
        .state('home', {
            url: "/",
            views: {
                'header': {
                    templateUrl: 'app/header/header.html',
                    controller: 'HeaderController',
                    controllerAs: 'headerCtrl'
                },
                'content': {
                    templateUrl: 'app/mainpage/mainpage.html',
                    controller: 'MainPageController',
                    controllerAs: 'mainpage'
                },
                'footer': {
                    templateUrl: 'app/footer/footer.html'
                }
            }
        });

        $urlRouterProvider.otherwise('/');

    }

})();
