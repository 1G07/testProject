(function() {
    'use strict';

    angular
        .module('modals')
        .controller('MessageModalController', MessageModalController);

    /** @ngInject */
    function MessageModalController($timeout, close) {
        var DISPLAY_INTERVAL = 4000;

        $timeout(
            function() {
                close({}, DISPLAY_INTERVAL);
            }
        );
    }
})();
