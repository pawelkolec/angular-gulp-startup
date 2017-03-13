(function() {
    'use strict';

    angular
    .module('clixmix')
    .config(config);

    /** @ngInject */
    function config($logProvider, $translateProvider) {
        // Enable log
        $logProvider.debugEnabled(true);

        $translateProvider.useStaticFilesLoader({
            prefix: 'app/content/translations/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('de-DE');

    }

})();
