(function() {
    'use strict';

    angular
    .module('session')
    .service('cmSession', session);

    /** @ngInject */
    function session(localStorage, $cookies) {
        var self = this;
        var sessionObj = {};
        var domain = '';

        self.get = get;
        self.set = set;
        self.remove = remove;
        self.getCSRF = getCSRF;
        self.getUID = getUID;
        self.setDomain = setDomain;
        self.getSessionName = getSessionName;

        init();

        ///////////////
        function init() {
            if (!get()) {
                return remove();
            }

            sessionObj = angular.fromJson(get());

            if (!sessionObj.sessionName || !sessionObj.sessionId || !sessionObj.token || !sessionObj.uid) {
                return remove();
            }

            set(sessionObj.sessionName, sessionObj.sessionId, sessionObj.token, sessionObj.uid);
        }

        function resetSessionObj() {
            sessionObj = {};
            sessionObj.sessionName = '';
            sessionObj.sessionId = '';
            sessionObj.token = '';
            sessionObj.uid = '';
        }

        function get() {
            return localStorage.get('session');
        }

        /**
        * @description
        *     Function set() saves all informations required for identify user session
        * @param session_name
        *     name of session, retrived on user loggin
        * @param session_id
        *     id of session, retrived on user loggin
        * @param token
        *     CSRF token, retrived on user loggin
        * @param uid
        *     current user id
        */
        function set(session_name, session_id, token, uid) {
            var cookie = session_name + '=' + session_id;

            if (!session_name || !session_id || !token || !uid) {
                return false;
            }

            sessionObj.sessionName = session_name;
            sessionObj.sessionId = session_id;
            sessionObj.token = token;
            sessionObj.uid = uid;

            //$cookies.put('Cookie', cookie);
            if (domain) {
                $cookies.put(session_name, session_id, { domain: domain });
            } else {
                $cookies.put(session_name, session_id);
            }

            //sessionObj['X-CSRF-Token'] = token;
            return localStorage.set('session', angular.toJson(sessionObj));
        }

        function remove() {
            if (domain) {
                $cookies.remove(sessionObj.sessionName, { domain: domain });
            }
            $cookies.remove(sessionObj.sessionName);// remove fake cookie
            localStorage.remove('session');
            resetSessionObj();
        }

        function getCSRF() {
            if (!sessionObj.token) {
                return false;
            }

            return { 'X-CSRF-Token': sessionObj.token };
        }

        function getUID() {
            if (!sessionObj.uid) {
                return false;
            }

            return sessionObj.uid;
        }

        function getSessionName() {
            if (!sessionObj.sessionName && !sessionObj.sessionId) {
                return false;
            }
            var name = sessionObj.sessionName,
                headersSessionObj = {};

                headersSessionObj[name] = sessionObj.sessionId;
                console.logheadersSessionObj

            return headersSessionObj;
        }

        function setDomain(value) {
            if (!value) {
                return false;
            }

            domain = value;
        }
    }
})();
