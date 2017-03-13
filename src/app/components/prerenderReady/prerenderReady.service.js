(function() {
    'use strict';

    angular
        .module('prerenderReady')
        .factory('httpInterceptorPrerender', httpInterceptorPrerender);

    /** @ngInject */
    function httpInterceptorPrerender($q, $timeout) {

        var numLoadings = 0,
            methodsObject = {
                request: request,
                response: response,
                responseError: responseError
            }

        return methodsObject;

        function request(config) {
            numLoadings++;
            window.prerenderReady = false;
            return config || $q.when(config);
        };

        function response(res) {
            if ((--numLoadings) === 0) {
                $timeout(function() {
                    if((numLoadings) === 0) {
                        window.prerenderReady = true;
                    }
                }, 1500)
            }
            return res || $q.when(res);
        };

        function responseError(responseError) {
            if (!(--numLoadings)) {
                $timeout(function() {
                    if((numLoadings) === 0) {
                        window.prerenderReady = true;
                    }
                }, 1500)
            }
            return $q.reject(responseError);
        };
    };
})();

