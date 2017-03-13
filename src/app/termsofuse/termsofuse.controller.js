(function() {
    'use strict';

    angular
    .module('termofuse')
    .controller('termofuseController', termofuseController);

    /** @ngInject */
    function termofuseController($rootScope) {
        $rootScope.spinnerShow = false;
        $rootScope.loading = false;
    }
})();
