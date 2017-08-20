(function() {
    'use strict';

    angular
        .module('userDetails')
        .controller('LicenseDetailsController', LicenseDetailsController);

    /** @ngInject */
    function LicenseDetailsController($cookies, Restangular, routingBase) {
        var vm = this;

        vm.registrationData = {};

        vm.close = close;

        init();

        function init() {
            Restangular
                .one('v4/base/get_mandator/')
                .customGET($cookies.get('customerID') + '?registrationData')
                .then(function(response) {
                    vm.registrationData = response['registrationData'];
                });
        }

        function close() {
            routingBase.goToCurrentState();
        }
    }
})();
