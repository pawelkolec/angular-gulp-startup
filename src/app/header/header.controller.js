(function() {
    'use strict';

    angular
    .module('header')
    .controller('HeaderController', HeaderController);

    /** @ngInject */
    function HeaderController($rootScope) {
        var vm = this;

        vm.toggleMenu = toggleMenu;

        function toggleMenu() {
            if(vm.toggleMobileMenu === true) {
                vm.toggleMobileMenu = false;

            }
        }
    }
})();
// ng-mouseover="vm.updateSearchValue(word)"
