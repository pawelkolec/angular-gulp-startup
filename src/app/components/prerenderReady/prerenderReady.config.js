(function() {
    'use strict';

    angular
    .module('prerenderReady')
    .config(config);

    /** @ngInject */
    function config($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptorPrerender');
    }
})();
