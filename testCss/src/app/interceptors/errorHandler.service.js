(function () {
    'use strict';

    angular.module('interceptors').service('errorHandler', errorHandler);

    /** @ngInject */
    function errorHandler(Restangular, routingAuthorization) {
        
        return {
            setErrorInterceptor: setErrorInterceptor
        };

        /**
         * Sets an interceptor on each API request. When request has an error depending on its code it should be handled.
         */
        function setErrorInterceptor() {
            Restangular.setErrorInterceptor(function(response) {
                switch (response.status) {
                    case 401:
                        routingAuthorization.goToLogin();
                        return false; // error handled
                }

                return true; // error not handled
            });
        }
    }
}());
