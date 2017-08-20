(function () {
    'use strict';

    angular.module('base').service('stateChecking', stateChecking);

    /** @ngInject */
    function stateChecking($state, $location, tabs) {

        return {
            getLastChildNameFromCurrentState: getLastChildNameFromCurrentState,
            isLicenseModalStateActive: isLicenseModalStateActive,
            isUserModalStateActive: isUserModalStateActive,
            isStatisticsChartsState: isStatisticsChartsState
        };

        /**
         * Gets most nested child state(last child state) out of the current state based on url and map of keys(statesMap).
         *
         * @returns {*}
         */
        function getLastChildNameFromCurrentState() {
            var currentStateParts = $location.path().split('/'),
                currentState = (currentStateParts[1] && currentStateParts[1] !== '') ? currentStateParts[1] : 'STATISTICS',
                // Map of urls and tab codes. This is used for keeping track which tab is selected.
                statesTabMap = tabs.getStateTabsMap();

            return statesTabMap[currentState] ? statesTabMap[currentState] : currentState;
        }

        /**
         * If license modal state is opened license will be placed to the url.
         *
         * @returns {boolean}
         */
        function isLicenseModalStateActive() {
            return $state.params['modal'] === 'license';
        }

        /**
         * If user modal state is opened userDetails will be placed to the url.
         *
         * @returns {boolean}
         */
        function isUserModalStateActive() {
            return $state.params['modal'] === 'userDetails';
        }

        /**
         * Checks if current state is charts.
         *
         * @returns {boolean}
         */
        function isStatisticsChartsState() {
            return $state.current.name === 'base.statistics.charts';
        }
    }
}());
