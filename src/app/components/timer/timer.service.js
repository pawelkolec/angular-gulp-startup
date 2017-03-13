(function() {
    'use strict';
    
    angular
    .module('timer')
    .factory('cmTimer', cmTimer);
               
    /** @ngInject */
    function cmTimer() {

		var keys = {};
		
		function start(key) {
			keys[key] = new Date().getTime();
		}
		
		function stop(key) {
			
			var end = new Date().getTime();
			var time = end - keys[key];
			
			console.log(time);			
		}
		
        return {
            start: start,
			stop: stop
        }
    }
    
})();