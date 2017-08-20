(function () {
    'use strict';

    angular.module('userDetails').service('userDetails', userDetails);

    /** @ngInject */
    function userDetails() {
        return {
            currentUser: {}
        };
    }
}());
