var fs = require('fs');

// Specify the locales you are interested here.
var locales = ['de'];
var i;
var localesData = Object.create(null);
var prefix = 'data:text/javascript;base64,';
var outputPrefix = "angular.module('tmh.dynamicLocalePreload', ['tmh.dynamicLocale'])" +
".config(['tmhDynamicLocaleProvider', function(tmhDynamicLocaleProvider) {" +
"tmhDynamicLocaleProvider.localeLocationPattern('{{base64Locales[locale]}}');" +
"tmhDynamicLocaleProvider.addLocalePatternValue('base64Locales', "
var outputSuffix = ");" +
"}]);";

// Read all the locales and base64 encode them.
for (i = 0; i < locales.length; ++i) {
  localesData[locales[i]] = prefix + base64(
      fs.readFileSync('src/bower_components/angular-i18n/angular-locale_' + locales[i] + '.js', 'utf8'));
}

function base64(content) {
  return new Buffer(content).toString('base64');
}
