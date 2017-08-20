(function () {
    'use strict';

    angular.module('base').service('routingBase', routingService);

    /** @ngInject */
    function routingService($state, $location) {
        
        return {
            goToMenuTab: goToMenuTab,
            refreshCurrentState: refreshCurrentState,
            goToCurrentState: goToCurrentState
        };
        
        /**
         * Based on selectedTab routes to the proper state.
         *
         * @param selectedTab
         */
        function goToMenuTab(selectedTab) {
            var tabs = {
                'STATISTICS' : {
                    routeToState: goToStatistics
                },
                'REVENUE' : {
                    routeToState: goToRevenue
                },
                'SCENARIOS' : {
                    routeToState: goToScenarios
                },
                'MODELS' : {
                    routeToState: goToModels
                },
                'PREVIEW' : {
                    routeToState: goToPreview
                },
                'PLUGIN' : {
                    routeToState: goToPlugin
                },
                'IMPORT' : {
                    routeToState: goToImport
                },
                'EXPORT' : {
                    routeToState: goToExport
                },
                'ABTESTING' : {
                    routeToState: goToABTesting
                },
                'SUPPORT' : {
                    routeToState: goToSupport
                }
            };

            tabs[selectedTab].routeToState();
        }

        function goToStatistics() {
            $state.go('base.statistics.charts');
        }
        
        function goToRevenue() {
            $state.go('base.statistics.addedRevenue');
        }

        function goToScenarios() {
            //TODO: Implement when state is defined.
        }

        function goToModels() {
            //TODO: Implement when state is defined.
        }

        function goToPreview() {
            //TODO: Implement when state is defined.
        }

        function goToPlugin() {
            //TODO: Implement when state is defined.
        }

        function goToImport() {
            //TODO: Implement when state is defined.
        }

        function goToExport() {
            //TODO: Implement when state is defined.
        }

        function goToABTesting() {
            //TODO: Implement when state is defined.
        }

        function goToSupport() {
            //TODO: Implement when state is defined.
        }

        function refreshCurrentState() {
            $state.go($state.current.name, $location.search(), {reload: true});
        }

        function goToCurrentState(modalType) {
            var queryParams = $location.search();
            queryParams['modal'] = '';

            if (modalType) {
                queryParams['modal'] = modalType;
            }

            $state.go($state.current.name, queryParams);
        }
        
    }
}());
