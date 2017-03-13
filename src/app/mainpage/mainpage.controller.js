(function() {
  'use strict';

  angular
    .module('clixmix')
    .controller('MainPageController', MainPageController);

  /** @ngInject */
	function MainPageController(api, $timeout, $state, $translate, $rootScope) {
		var vm = this;

        $rootScope.loading = false;
	}
})();
