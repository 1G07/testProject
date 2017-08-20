(function () {
    'use strict';

    angular.module('base').service('routingAuthorization', routingAuthorization);

    /** @ngInject */
    function routingAuthorization($window) {

        return {
            goToLogin: goToLogin
        };

        /**
         * Redirects to the login page by hitting the URL.
         */
        function goToLogin() {
            $window.location.href = 'https://admin.test.yoochoose.net/login.html#login';
        }
    }
}());

