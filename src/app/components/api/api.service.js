(function() {
    'use strict';

    angular
    .module('apiModule')
    .service('api', api);

    /** @ngInject */
    function api($http, $q, cmSession, $timeout) {
        var self = this;
        var apiConfig = { url: "app/components/api/api.config.json", responseType: "json" };
        var fakeRootUrl = "app/components/api/fakeResources/"; // to remove
        var rootUrl = null;
        var endpoints = null;
        var domain = '';
        var initialized = false;

        self.request = request;
        self.getVideos = getVideos;
        self.getVideosCategories = getVideosCategories;
		self.getPopularVideos = getPopularVideos;
		self.getRelatedVideos = getRelatedVideos;
		self.getWorks = getWorks;
		self.getPopularWorks = getPopularWorks;
		self.getRelatedWorks = getRelatedWorks;
		self.getWorkCategories = getWorkCategories;
		self.getPdfDownloadUrl = getPdfDownloadUrl;
		self.getGames = getGames;
		self.getPopularGames = getPopularGames;
		self.getGameCategories = getGameCategories;
		self.getAudios = getAudios;
		self.getPopularAudios = getPopularAudios;
		self.getRelatedAudios = getRelatedAudios;
		self.getAudioCategories = getAudioCategories;
		self.setPopular = setPopular;
        self.recoverPassword = recoverPassword;
        self.resetPassword = resetPassword;
        self.getGenerateCredentialPdfUrls = getGenerateCredentialPdfUrls;
        self.getTitles = getTitles;
		self.getTips = getTips;
        self.sendQuestion = sendQuestion;
        self.getAllClothes = getAllClothes;
        self.getUserClothes = getUserClothes;
        self.setUserClothes = setUserClothes;
        self.user = user;
        self.getAnimation = getAnimation;

        /////////////////////
        function request(endpoint, configuration) {
            // If endpoint contains parameters that should be replaced by specific values
            // you should add replacements array into configuration object. Example:
            // [{ target: '{UID}', value: 1 }]
            var rootAddress = rootUrl;

            // to remove on production
            if ( configuration && configuration.fake ) {
                rootAddress = fakeRootUrl;
            }
            //

            return $q(function(resolve, reject) {
                if ( !endpoint ) {
                    return reject('No endpoint provided.');
                }

                if ( rootAddress && endpoints && endpoints[endpoint]) {
                    return makeRequest(resolve, reject, rootAddress + endpoints[endpoint], configuration);
                }

                if (initialized) {
                    return reject('Api error or no such endpoint.');
                }

                getApiConfig(apiConfig).then(function() {
                    return request(endpoint, configuration).then(function(results) {
                        return resolve(results);
                    }, function(results) {
                        return reject(results);
                    });
                }, function(results) {
                    return reject(results);
                });
            });
        }

        function makeRequest(resolve, reject, endpoint, configuration) {
            var config = { responseType: "json" };
            var replacementLength = 0;
            var requestCounter = 0;

            // replace parameters in endpoint if needed, example configuration.replacements:
            // [{ target: '{UID}', value: 1 }]
            if (configuration && configuration.replacements && typeof configuration.replacements.length !== 'undefined') {
                replacementLength = configuration.replacements.length;

                for (var i = 0; i < replacementLength; i++) {
                    if (!configuration.replacements[i].target || !configuration.replacements[i].value) {
                        continue;
                    }

                    endpoint = endpoint.replace(configuration.replacements[i].target, configuration.replacements[i].value);
                }
            }

            if (cmSession.getCSRF()) {
                if (!configuration.headers) {
                    configuration.headers = {};
                }

                angular.extend(configuration.headers, angular.fromJson(cmSession.getCSRF()));
            }

            angular.extend(config, { url: endpoint });

            if (typeof configuration !== 'undefined') {
                angular.extend(config, configuration);
            }

            // add empty data if no data provided
            if ((config.method === 'POST' || config.method === 'post') && !config.data) {
                config.data = '';
            }

            return $q(callBackend).then(function(res) {
                return resolve(res);
            }, function(res) {
                return reject(res);
            });

            function callBackend(resolve, reject) {
                $http(config).then( function (response) {
                    if ((response.data && response.data.error) || response.error) {
                        return reject(response.data.error);
                    }

                    return resolve(response.data);
                }, function(response) {
                    if (response.status > 0 || (response.status < 0 && requestCounter < 2)) {
                        return reject(response);
                    }

                    requestCounter ++;
                    $timeout(callBackend(resolve, reject), 3000);
                });
            }
        }

        function getApiConfig(config) {
            return $http(config).then( function (response) {
                initialized = true;
                rootUrl = response.data.root || null;
                endpoints = response.data.endpoints || null;
                domain = response.data.domain || '';
                cmSession.setDomain(domain);

                return response.data;
            }, function(response) {
                initialized = true;
                return $q.reject(response);
            });
        }

        function getAnimation(configuration) {
            var conf = { method: 'GET' };
            if (typeof configuration !== 'undefined') {
                angular.extend(conf, configuration);
            }

            return request('animation', conf);
        }

        function getTitles(configuration) {
            var conf = { method: 'GET' };
            if (typeof configuration !== 'undefined') {
                angular.extend(conf, configuration);
            }

            return request('contents', conf);
        }

        function getVideos(configuration) {
            var conf = { method: 'GET' };
            if (typeof configuration !== 'undefined') {
                angular.extend(conf, configuration);
            }

            return request('videos', conf);
        }

        function getVideosCategories(configuration) {
            var conf = { method: 'GET' };
            if (typeof configuration !== 'undefined') {
                angular.extend(conf, configuration);
            }

            return request('videoCategories', conf);
        }

		function getPopularVideos(configuration) {
            var conf = { method: 'GET' };
            if (typeof configuration !== 'undefined') {
                angular.extend(conf, configuration);
            }

            return request('popularVideos', conf);
        }

		function getRelatedVideos(configuration) {
            var conf = { method: 'GET' };
            if (typeof configuration !== 'undefined') {
                angular.extend(conf, configuration);
            }

            return request('relatedVideos', conf);
        }

		function getWorks(configuration) {
            var conf = { method: 'GET' };
            if (typeof configuration !== 'undefined') {
                angular.extend(conf, configuration);
            }

            return request('works', conf);
        }

		function getPopularWorks(configuration) {
            var conf = { method: 'GET' };
            if (typeof configuration !== 'undefined') {
                angular.extend(conf, configuration);
            }

            return request('popularWorks', conf);
        }

		function getRelatedWorks(configuration) {
            var conf = { method: 'GET' };
            if (typeof configuration !== 'undefined') {
                angular.extend(conf, configuration);
            }

            return request('relatedWorks', conf);
        }

		function getWorkCategories(configuration) {
            var conf = { method: 'GET' };
            if (typeof configuration !== 'undefined') {
                angular.extend(conf, configuration);
            }

            return request('workCategories', conf);
        }

		function getGames(configuration) {
            var conf = { method: 'GET' };
            if (typeof configuration !== 'undefined') {
                angular.extend(conf, configuration);
            }

            return request('games', conf);
        }

		function getPopularGames(configuration) {
            var conf = { method: 'GET' };
            if (typeof configuration !== 'undefined') {
                angular.extend(conf, configuration);
            }

            return request('popularGames', conf);
        }

		function getGameCategories(configuration) {
            var conf = { method: 'GET' };
            if (typeof configuration !== 'undefined') {
                angular.extend(conf, configuration);
            }

            return request('gameCategories', conf);
        }

		function getAudios(configuration) {
            var conf = { method: 'GET' };
            if (typeof configuration !== 'undefined') {
                angular.extend(conf, configuration);
            }

            return request('audios', conf);
        }

		function getPopularAudios(configuration) {
            var conf = { method: 'GET' };
            if (typeof configuration !== 'undefined') {
                angular.extend(conf, configuration);
            }

            return request('popularAudios', conf);
        }

		function getRelatedAudios(configuration) {
            var conf = { method: 'GET' };
            if (typeof configuration !== 'undefined') {
                angular.extend(conf, configuration);
            }

            return request('relatedAudios', conf);
        }

		function getAudioCategories(configuration) {
            var conf = { method: 'GET' };
            if (typeof configuration !== 'undefined') {
                angular.extend(conf, configuration);
            }

            return request('audioCategories', conf);
        }

        function authenticate(configuration) {
            var conf = { method: 'POST' };

            if (typeof configuration !== 'undefined') {
                angular.extend(conf, configuration);
            }

            return request('audios', conf);
        }

        function sendQuestion(configuration) {
            var conf = {
                    method: 'POST',
                    withCredentials: true,
                    data: {},
                    replacements: []
                };

            if(configuration.uid) {
                conf.replacements.push({ target: '{UID}', value: configuration.uid });
            }

            if(typeof configuration !== 'undefined') {
                angular.extend(conf.data, configuration);
            }

            return request('contact_mail', conf);
        }

        function user(configuration) {
            var conf = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            var replacements = [];

            if (typeof configuration === 'undefined') {
                return request('user', conf);
            }

            if (configuration.uid) {
                replacements.push({ target: '{UID}', value: configuration.uid });
                angular.extend(configuration, { replacements: replacements });
            }

            angular.extend(conf, configuration);
            return request('user', conf);
        }

		function setPopular(id) {

			var conf = {
				method: 'POST',
				headers: {
        			"Content-Type": "application/json"
    			},
				data: {
					id: id
				}
			};

            return request('popularSet', conf);
		}

        function recoverPassword(usernameOrEmail) {
            var conf = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    name: usernameOrEmail
                }
            };

            return request('requestNewPassword', conf);
        }

        function resetPassword(configuration) {
            var replacements = [];
            var conf = {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                }
            };

            if (typeof configuration === 'undefined') {
                return request('resetPassword', conf);
            }

            if (configuration.uid) {
                replacements.push({ target: '{UID}', value: configuration.uid });
                angular.extend(configuration, { replacements: replacements });
            }

            angular.extend(conf, configuration);
            return request('resetPassword', conf);
        }

        function getGenerateCredentialPdfUrls(name, pass) {
            return $q(function(resolve, reject) {
                $http(apiConfig).then( function (response) {
                    var pdfUrl = response.data.root || null;
                    var urlsObj = {};

                    if (!pdfUrl || !response.data.endpoints.generateCredentialPdf || !name || !pass) {
                        return reject(null);
                    }

                    pdfUrl += response.data.endpoints.generateCredentialPdf;

                    if (!cmSession.getCSRF()['X-CSRF-Token']) {
                        return reject(null);
                    }

                    urlsObj.download = pdfUrl + '?username=' + name + '&pass=' + pass + '&crsf=' + cmSession.getCSRF()['X-CSRF-Token'] + '&dl=1';
                    urlsObj.print = pdfUrl + '?username=' + name + '&pass=' + pass + '&crsf=' + cmSession.getCSRF()['X-CSRF-Token'] + '&dl=0';
                    return resolve(urlsObj);
                }, function(response) {
                    return reject(null);
                });
            });
        }

		function getPdfDownloadUrl(nid) {
			return rootUrl + endpoints["workPdfDownload"] + "?nid=" + nid;
		}

		function getTips(configuration) {
            var conf = { method: 'GET' };
            if (typeof configuration !== 'undefined') {
                angular.extend(conf, configuration);
            }

            return request('tips', conf);
        }

        function getAllClothes(configuration) {
            var replacements = [];
            var conf = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            };

            if (typeof configuration === 'undefined') {
                return request('clothesGetAll', conf);
            }

            if (configuration.uid) {
                replacements.push({ target: '{UID}', value: configuration.uid });
                angular.extend(configuration, { replacements: replacements });
            }

            angular.extend(conf, configuration);
            return request('clothesGetAll', conf);
        }

        function getUserClothes(configuration) {
            var replacements = [];
            var conf = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            };

            if (typeof configuration === 'undefined') {
                return request('userClothes', conf);
            }

            if (configuration.uid) {
                replacements.push({ target: '{UID}', value: configuration.uid });
                angular.extend(configuration, { replacements: replacements });
            }

            angular.extend(conf, configuration);
            return request('userClothes', conf);
        }

        function setUserClothes(configuration) {
            var replacements = [];
            var conf = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }
            };

            if (typeof configuration === 'undefined') {
                return request('userClothes', conf);
            }

            if (configuration.uid) {
                replacements.push({ target: '{UID}', value: configuration.uid });
                angular.extend(configuration, { replacements: replacements });
            }

            angular.extend(conf, configuration);
            return request('userClothes', conf);
        }

    }
})();
