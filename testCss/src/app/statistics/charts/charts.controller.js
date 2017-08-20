(function() {
    'use strict';

    angular
        .module('statistics')
        .controller('ChartsController', ChartsController);

    /** @ngInject */
    function ChartsController(
        $scope,
        $q,
        $cookies,
        localStorageService,
        Restangular,
        chartsRequestParamsDataFormatter,
        collectedEventsChart,
        $translate
    ) {

        var vm = this;

        vm.selectedEventLegend = null;
        vm.collectedEventsPossibleLegendFields = [];
        vm.addToEventsChart = addToEventsChart;
        vm.removeFromEventsChart = removeFromEventsChart;
        vm.changeEventsChartScale = changeEventsChartScale;
        vm.getScaleCode = getScaleCode;

        /**
         * Common configuration for all charts.
         *
         * @type {Object}
         */
        var chartsConfiguration = {
            type: 'LineChart',
            options: {
                legend: {position: 'bottom'},
                backgroundColor: '#FFFFFF',
                curveType: 'function',
                colors: [],
                vAxis: {
                    scaleType: 'linear'
                },
                hAxis: {
                    gridlines: {
                        count: -1,
                        units: {
                            days: {format: ['MMM dd']},
                            hours: {format: ['HH:mm', 'ha']}
                        }
                    }
                }


                // series: {
                //     0: { lineDashStyle: [1, 1] },
                //     1: { lineDashStyle: [2, 2] },
                //     2: { lineDashStyle: [4, 4] },
                //     3: { lineDashStyle: [5, 1, 3] },
                //     4: { lineDashStyle: [4, 1] },
                //     5: { lineDashStyle: [10, 2] },
                //     6: { lineDashStyle: [14, 2, 7, 2] },
                //     7: { lineDashStyle: [14, 2, 2, 7] },
                //     8: { lineDashStyle: [2, 2, 20, 2, 20, 2] }
                // },
            },
            data: {
                cols: [],
                rows: []
            }
        };

        var customerId = $cookies.get('customerID'),
            fromDate = localStorageService.get('fromDate'),
            toDate = localStorageService.get('toDate'),
            apiParams = {
                from_date_time: fromDate,
                to_date_time: toDate,
                granularity: chartsRequestParamsDataFormatter.getGranularity(fromDate, toDate)
            },
            eventsChartApiData = [];

        init();

        function init() {
            vm.collectedEventsChart = angular.copy(chartsConfiguration);
            // $q.all(
            //     [Restangular.all('/v4/' + customerId + '/statistic/summary/REVENUE,RECOS,EVENTS').getList(apiParams)]
            // ).then(function (response) {
            //    setBaseChartsConfiguration();
            //      eventsChartApiData  = response[0];
            //     setColectedEventsChart(eventsChartApiData);
            //
            // });

            setColectedEventsChart();
        }

        function setBaseChartsConfiguration() {
            vm.collectedEventsChart = angular.copy(chartsConfiguration);
        }

        function setColectedEventsChart(apiData) {
            vm.collectedEventsChart.options.title = $translate.instant("charts.collectedEvents");
            var apiData  = [
                {
                    "basketEvents": 7813,
                    "blacklistEvents": 0,
                    "clickEvents": 59541,
                    "clickedRecommended": 4922,
                    "consumeEvents": 0,
                    "deliveredRecommendations": 161026,
                    "purchaseEvents": 4047,
                    "purchasedRecommended": 189,
                    "purchasedRecommendedFresh": 177,
                    "rateEvents": 0,
                    "recommendationCalls": 15247,
                    "renderedEvents": 5699,
                    "revenue": 7045.69,
                    "revenueFresh": 6064.44,
                    "timespanBegin": "2017-08-07T00:00:00.000",
                    "timespanDuration": "PT1H"
                },
                {
                    "basketEvents": 7813,
                    "blacklistEvents": 0,
                    "clickEvents": 59541,
                    "clickedRecommended": 4922,
                    "consumeEvents": 0,
                    "deliveredRecommendations": 161026,
                    "purchaseEvents": 4047,
                    "purchasedRecommended": 189,
                    "purchasedRecommendedFresh": 177,
                    "rateEvents": 0,
                    "recommendationCalls": 15247,
                    "renderedEvents": 5699,
                    "revenue": 7045.69,
                    "revenueFresh": 6064.44,
                    "timespanBegin": "2017-08-07T12:00:00.000",
                    "timespanDuration": "PT1H"
                },
                {
                    "basketEvents": 7813,
                    "blacklistEvents": 0,
                    "clickEvents": 59541,
                    "clickedRecommended": 4922,
                    "consumeEvents": 0,
                    "deliveredRecommendations": 161026,
                    "purchaseEvents": 4047,
                    "purchasedRecommended": 189,
                    "purchasedRecommendedFresh": 177,
                    "rateEvents": 0,
                    "recommendationCalls": 15247,
                    "renderedEvents": 5699,
                    "revenue": 7045.69,
                    "revenueFresh": 6064.44,
                    "timespanBegin": "2017-08-08T00:00:00.000",
                    "timespanDuration": "PT1H"
                },
                {
                    "basketEvents": 7813,
                    "blacklistEvents": 0,
                    "clickEvents": 59541,
                    "clickedRecommended": 4922,
                    "consumeEvents": 0,
                    "deliveredRecommendations": 161026,
                    "purchaseEvents": 4047,
                    "purchasedRecommended": 189,
                    "purchasedRecommendedFresh": 177,
                    "rateEvents": 0,
                    "recommendationCalls": 15247,
                    "renderedEvents": 5699,
                    "revenue": 7045.69,
                    "revenueFresh": 6064.44,
                    "timespanBegin": "2017-08-08T12:00:00.000",
                    "timespanDuration": "PT1H"
                },
                {
                    "basketEvents": 7813,
                    "blacklistEvents": 0,
                    "clickEvents": 59541,
                    "clickedRecommended": 4922,
                    "consumeEvents": 0,
                    "deliveredRecommendations": 161026,
                    "purchaseEvents": 4047,
                    "purchasedRecommended": 189,
                    "purchasedRecommendedFresh": 177,
                    "rateEvents": 0,
                    "recommendationCalls": 15247,
                    "renderedEvents": 5699,
                    "revenue": 7045.69,
                    "revenueFresh": 6064.44,
                    "timespanBegin": "2017-08-09T00:00:00.000",
                    "timespanDuration": "PT1H"
                },
                {
                    "basketEvents": 7813,
                    "blacklistEvents": 0,
                    "clickEvents": 59541,
                    "clickedRecommended": 4922,
                    "consumeEvents": 0,
                    "deliveredRecommendations": 161026,
                    "purchaseEvents": 4047,
                    "purchasedRecommended": 189,
                    "purchasedRecommendedFresh": 177,
                    "rateEvents": 0,
                    "recommendationCalls": 15247,
                    "renderedEvents": 5699,
                    "revenue": 7045.69,
                    "revenueFresh": 6064.44,
                    "timespanBegin": "2017-08-09T12:00:00.000",
                    "timespanDuration": "PT1H"
                },
                {
                    "basketEvents": 7813,
                    "blacklistEvents": 0,
                    "clickEvents": 59541,
                    "clickedRecommended": 4922,
                    "consumeEvents": 0,
                    "deliveredRecommendations": 161026,
                    "purchaseEvents": 4047,
                    "purchasedRecommended": 189,
                    "purchasedRecommendedFresh": 177,
                    "rateEvents": 0,
                    "recommendationCalls": 15247,
                    "renderedEvents": 5699,
                    "revenue": 7045.69,
                    "revenueFresh": 6064.44,
                    "timespanBegin": "2017-08-10T00:00:00.000",
                    "timespanDuration": "PT1H"
                },
                {
                    "basketEvents": 7813,
                    "blacklistEvents": 0,
                    "clickEvents": 59541,
                    "clickedRecommended": 4922,
                    "consumeEvents": 0,
                    "deliveredRecommendations": 161026,
                    "purchaseEvents": 4047,
                    "purchasedRecommended": 189,
                    "purchasedRecommendedFresh": 177,
                    "rateEvents": 0,
                    "recommendationCalls": 15247,
                    "renderedEvents": 5699,
                    "revenue": 7045.69,
                    "revenueFresh": 6064.44,
                    "timespanBegin": "2017-08-10T12:00:00.000",
                    "timespanDuration": "PT1H"
                },
                {
                    "basketEvents": 10000,
                    "blacklistEvents": 30000,
                    "clickEvents": 20000,
                    "clickedRecommended": 4922,
                    "consumeEvents": 0,
                    "deliveredRecommendations": 161026,
                    "purchaseEvents": 4047,
                    "purchasedRecommended": 189,
                    "purchasedRecommendedFresh": 177,
                    "rateEvents": 0,
                    "recommendationCalls": 15247,
                    "renderedEvents": 5699,
                    "revenue": 7045.69,
                    "revenueFresh": 6064.44,
                    "timespanBegin": "2017-08-11T00:00:00.000",
                    "timespanDuration": "PT1H"
                },
                {
                    "basketEvents": 100000,
                    "blacklistEvents": 0,
                    "clickEvents": 80000,
                    "clickedRecommended": 4922,
                    "consumeEvents": 0,
                    "deliveredRecommendations": 161026,
                    "purchaseEvents": 4047,
                    "purchasedRecommended": 189,
                    "purchasedRecommendedFresh": 177,
                    "rateEvents": 0,
                    "recommendationCalls": 15247,
                    "renderedEvents": 5699,
                    "revenue": 7045.69,
                    "revenueFresh": 6064.44,
                    "timespanBegin": "2017-08-11T12:00:00.000",
                    "timespanDuration": "PT1H"
                },
                {
                    "basketEvents": 7813,
                    "blacklistEvents": 0,
                    "clickEvents": 59541,
                    "clickedRecommended": 4922,
                    "consumeEvents": 0,
                    "deliveredRecommendations": 161026,
                    "purchaseEvents": 4047,
                    "purchasedRecommended": 189,
                    "purchasedRecommendedFresh": 177,
                    "rateEvents": 0,
                    "recommendationCalls": 15247,
                    "renderedEvents": 5699,
                    "revenue": 7045.69,
                    "revenueFresh": 6064.44,
                    "timespanBegin": "2017-08-12T00:00:00.000",
                    "timespanDuration": "PT1H"
                },
                {
                    "basketEvents": 7813,
                    "blacklistEvents": 0,
                    "clickEvents": 59541,
                    "clickedRecommended": 4922,
                    "consumeEvents": 0,
                    "deliveredRecommendations": 161026,
                    "purchaseEvents": 4047,
                    "purchasedRecommended": 189,
                    "purchasedRecommendedFresh": 177,
                    "rateEvents": 0,
                    "recommendationCalls": 15247,
                    "renderedEvents": 5699,
                    "revenue": 7045.69,
                    "revenueFresh": 6064.44,
                    "timespanBegin": "2017-08-12T12:00:00.000",
                    "timespanDuration": "PT1H"
                },
                {
                    "basketEvents": 7813,
                    "blacklistEvents": 0,
                    "clickEvents": 59541,
                    "clickedRecommended": 4922,
                    "consumeEvents": 0,
                    "deliveredRecommendations": 161026,
                    "purchaseEvents": 4047,
                    "purchasedRecommended": 189,
                    "purchasedRecommendedFresh": 177,
                    "rateEvents": 0,
                    "recommendationCalls": 15247,
                    "renderedEvents": 5699,
                    "revenue": 7045.69,
                    "revenueFresh": 6064.44,
                    "timespanBegin": "2017-08-13T00:00:00.000",
                    "timespanDuration": "PT1H"
                },
                {
                    "basketEvents": 7813,
                    "blacklistEvents": 0,
                    "clickEvents": 59541,
                    "clickedRecommended": 4922,
                    "consumeEvents": 0,
                    "deliveredRecommendations": 161026,
                    "purchaseEvents": 4047,
                    "purchasedRecommended": 189,
                    "purchasedRecommendedFresh": 177,
                    "rateEvents": 0,
                    "recommendationCalls": 15247,
                    "renderedEvents": 5699,
                    "revenue": 7045.69,
                    "revenueFresh": 6064.44,
                    "timespanBegin": "2017-08-13T12:00:00.000",
                    "timespanDuration": "PT1H"
                },
                {
                    "basketEvents": 7813,
                    "blacklistEvents": 0,
                    "clickEvents": 59541,
                    "clickedRecommended": 4922,
                    "consumeEvents": 0,
                    "deliveredRecommendations": 161026,
                    "purchaseEvents": 4047,
                    "purchasedRecommended": 189,
                    "purchasedRecommendedFresh": 177,
                    "rateEvents": 0,
                    "recommendationCalls": 15247,
                    "renderedEvents": 5699,
                    "revenue": 7045.69,
                    "revenueFresh": 6064.44,
                    "timespanBegin": "2017-08-14T00:00:00.000",
                    "timespanDuration": "PT1H"
                },
                // {
                //     "basketEvents": 7813,
                //     "blacklistEvents": 0,
                //     "clickEvents": 59541,
                //     "clickedRecommended": 4922,
                //     "consumeEvents": 0,
                //     "deliveredRecommendations": 161026,
                //     "purchaseEvents": 4047,
                //     "purchasedRecommended": 189,
                //     "purchasedRecommendedFresh": 177,
                //     "rateEvents": 0,
                //     "recommendationCalls": 15247,
                //     "renderedEvents": 5699,
                //     "revenue": 7045.69,
                //     "revenueFresh": 6064.44,
                //     "timespanBegin": "2017-08-07T19:00:00.000",
                //     "timespanDuration": "PT1H"
                // },
                // {
                //     "basketEvents": 7813,
                //     "blacklistEvents": 0,
                //     "clickEvents": 59541,
                //     "clickedRecommended": 4922,
                //     "consumeEvents": 0,
                //     "deliveredRecommendations": 161026,
                //     "purchaseEvents": 4047,
                //     "purchasedRecommended": 189,
                //     "purchasedRecommendedFresh": 177,
                //     "rateEvents": 0,
                //     "recommendationCalls": 15247,
                //     "renderedEvents": 5699,
                //     "revenue": 7045.69,
                //     "revenueFresh": 6064.44,
                //     "timespanBegin": "2017-08-07T20:00:00.000",
                //     "timespanDuration": "PT1H"
                // },
                // {
                //     "basketEvents": 7813,
                //     "blacklistEvents": 0,
                //     "clickEvents": 59541,
                //     "clickedRecommended": 4922,
                //     "consumeEvents": 0,
                //     "deliveredRecommendations": 161026,
                //     "purchaseEvents": 4047,
                //     "purchasedRecommended": 189,
                //     "purchasedRecommendedFresh": 177,
                //     "rateEvents": 0,
                //     "recommendationCalls": 15247,
                //     "renderedEvents": 5699,
                //     "revenue": 7045.69,
                //     "revenueFresh": 6064.44,
                //     "timespanBegin": "2017-08-07T21:00:00.000",
                //     "timespanDuration": "PT1H"
                // },
                // {
                //     "basketEvents": 7813,
                //     "blacklistEvents": 0,
                //     "clickEvents": 59541,
                //     "clickedRecommended": 4922,
                //     "consumeEvents": 0,
                //     "deliveredRecommendations": 161026,
                //     "purchaseEvents": 4047,
                //     "purchasedRecommended": 189,
                //     "purchasedRecommendedFresh": 177,
                //     "rateEvents": 0,
                //     "recommendationCalls": 15247,
                //     "renderedEvents": 5699,
                //     "revenue": 7045.69,
                //     "revenueFresh": 6064.44,
                //     "timespanBegin": "2017-08-07T22:00:00.000",
                //     "timespanDuration": "PT1H"
                // },
                // {
                //     "basketEvents": 7813,
                //     "blacklistEvents": 0,
                //     "clickEvents": 59541,
                //     "clickedRecommended": 4922,
                //     "consumeEvents": 0,
                //     "deliveredRecommendations": 161026,
                //     "purchaseEvents": 4047,
                //     "purchasedRecommended": 189,
                //     "purchasedRecommendedFresh": 177,
                //     "rateEvents": 0,
                //     "recommendationCalls": 15247,
                //     "renderedEvents": 5699,
                //     "revenue": 7045.69,
                //     "revenueFresh": 6064.44,
                //     "timespanBegin": "2017-08-07T23:00:00.000",
                //     "timespanDuration": "PT1H"
                // },
                // {
                //     "basketEvents": 7813,
                //     "blacklistEvents": 0,
                //     "clickEvents": 59541,
                //     "clickedRecommended": 4922,
                //     "consumeEvents": 0,
                //     "deliveredRecommendations": 161026,
                //     "purchaseEvents": 4047,
                //     "purchasedRecommended": 189,
                //     "purchasedRecommendedFresh": 177,
                //     "rateEvents": 0,
                //     "recommendationCalls": 15247,
                //     "renderedEvents": 5699,
                //     "revenue": 7045.69,
                //     "revenueFresh": 6064.44,
                //     "timespanBegin": "2017-08-08T00:00:00.000",
                //     "timespanDuration": "PT1H"
                // }
            ];
            vm.collectedEventsChart.data = collectedEventsChart.getCalculatedData(apiData, apiParams.granularity);
            vm.collectedEventsChart.options.colors = collectedEventsChart.getChartColors();
            vm.collectedEventsPossibleLegendFields = collectedEventsChart.getPossibleLegendFieldsForSelect();
        }
        
        function addToEventsChart() {
            collectedEventsChart.addOptionToChart(vm.selectedEventLegend);
            vm.selectedEventLegend = null;
            setColectedEventsChart(eventsChartApiData);
        }

        function removeFromEventsChart(selectedOption) {
            collectedEventsChart.removeOptionFromChart(selectedOption.column - 1);
            setColectedEventsChart(eventsChartApiData);
        }

        function changeEventsChartScale() {
            if (vm.collectedEventsChart.options.vAxis.scaleType === 'linear') {
                vm.collectedEventsChart.options.vAxis.scaleType = 'log';
                return;
            }

            vm.collectedEventsChart.options.vAxis.scaleType = 'linear';
        }

        function getScaleCode() {
            if (vm.collectedEventsChart.options.vAxis.scaleType === 'linear') {
                return 'charts.logScale';
            }

            return 'charts.linearScale';
        }

        $scope.$on('timeRangeChanged', init);
    }
})();
