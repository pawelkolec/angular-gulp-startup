(function () {
	'use strict';
		
	angular.module('validateString').filter('cmValidateString', cmValidateString);
			
	function cmValidateString() {
		return function (item) {
			if(angular.isString(item)) {
				return item;	
			}
			else {
				return "";
			}
		};
	}
	
})();


