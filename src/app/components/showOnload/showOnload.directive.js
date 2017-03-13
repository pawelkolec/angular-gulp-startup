(function() {
    'use strict';
    	
	//directive for single image
    angular
    .module('showOnload')
    .directive('cmShowOnload', cmShowOnload);
               
    /** @ngInject */
    function cmShowOnload() {
        
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				element.bind('load', function() {
					$(this).closest('.cm-item').removeClass('cm-item-hidden');				
				});
			}
		};
    }
	
	
})();