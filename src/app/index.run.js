(function() {
  'use strict';

  angular
    .module('clixmix')
    .run(runBlock);

  /** @ngInject */
    function runBlock($log, $rootScope, $location, $document, ngMeta) {

        ngMeta.init();

        // Track a root changes
        $rootScope.$on('$routeChangeSuccess', function(event, current) {
            if(window._paq) {
                window._paq.push(['setCustomUrl', $location.path() ]);
                window._paq.push(['trackPageView']);
            }
        })
    }
})();
