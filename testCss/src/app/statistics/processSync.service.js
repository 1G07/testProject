(function () {
    'use strict';

    angular.module('statistics').service('processSync', processSync);

    /** @ngInject */
    function processSync() {
        
        return {
            // Because change event for date picker is sometimes fired before request is finished, sync flag is added.
            lockDateChangeProcess: false
        };
    }
}());

