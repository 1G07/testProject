(function () {
    'use strict';

    angular.module('base').service('tabs', tabs);

    /** @ngInject */
    function tabs() {

        return {
            getTabs: getTabs,
            getStateTabsMap: getStateTabsMap
        };
        
        function getTabs() {
            // All tabs. If any code changes or is added in the backend this map needs to be updated.
            return {
                'STATISTICS' : {
                    routeToState: 'goToStatistics',
                    code: 'STATISTICS'
                },
                'REVENUE' : {
                    routeToState: 'goToRevenue',
                    code: 'REVENUE'
                },
                'SCENARIOS' : {
                    routeToState: 'goToScenarios',
                    code: 'SCENARIOS'
                },
                'MODELS' : {
                    routeToState: 'goToModels',
                    code: 'MODELS'
                },
                'PREVIEW' : {
                    routeToState: 'goToPreview',
                    code: 'PREVIEW'
                },
                'PLUGIN' : {
                    routeToState: 'goToPlugin',
                    code: 'PLUGIN'
                },
                'IMPORT' : {
                    routeToState: 'goToImport',
                    code: 'IMPORT'
                },
                'EXPORT' : {
                    routeToState: 'goToExport',
                    code: 'EXPORT'
                },
                'ABTESTING' : {
                    routeToState: 'goToABTesting',
                    code: 'ABTESTING'
                },
                'SUPPORT' : {
                    routeToState: 'goToSupport',
                    code: 'SUPPORT'
                }
            }
        }
        
        function getStateTabsMap() {
            return {
                'addedRevenue': 'REVENUE'
            }
        }
    }
}());
