(function () {
    'use strict';

    angular.module('statistics').service('collectedEventsChart', collectedEventsChart);

    /**
     * Service that will format data for collected events chart.
     */

    /** @ngInject */
    function collectedEventsChart(localStorageService, $translate, moment) {

        var savedEventKeys = localStorageService.get('savedEventKeys');

        savedEventKeys = savedEventKeys ? JSON.parse(savedEventKeys) : null;

        return {
            getAllLegendKeys: getAllLegendKeys,
            addOptionToChart: addOptionToChart,
            removeOptionFromChart: removeOptionFromChart, 
            getCalculatedData: getCalculatedData,
            getPossibleLegendFieldsForSelect: getPossibleLegendFieldsForSelect,
            getChartColors: getChartColors
        };

        function getAllLegendKeys() {
            return {
                'basketEvents': {
                    'code': 'basketEvents',
                    'color': '#e6194b'
                },
                'blacklistEvents': {
                    'code': 'blacklistEvents',
                    'color': '#000000'
                },
                'clickEvents': {
                    'code': 'clickEvents',
                    'color': '#e0440e'
                },
                'clickedRecommended': {
                    'code': 'clickedRecommended',
                    'color': '#0082c8'
                },
                'consumeEvents': {
                    'code': 'consumeEvents',
                    'color': '#f032e6'
                },
                'purchaseEvents': {
                    'code': 'purchaseEvents',
                    'color': '#aa6e28'
                },
                'rateEvents': {
                    'code': 'rateEvents',
                    'color': '#808080'
                },
                'total': {
                    'code': 'total',
                    'color': '#3cb44b'
                }
            };
        }

        function getCalculatedData(rawData) {
            var data = {
                    cols: [{id: 'collectedEvents', label: $translate.instant("charts.collectedEvents"), type: 'date'}],
                    rows: []
                };

            if (!savedEventKeys ) {
                // Initial legend fields
                savedEventKeys = ['clickEvents', 'purchaseEvents', 'clickedRecommended'];
                saveSessionData(savedEventKeys);
            }
            
            angular.forEach(savedEventKeys , function(key) {
                data.cols.push({id: 'key', label: $translate.instant("charts." + key), type: 'number'});

                angular.forEach(rawData, function(events, $index) {
                    if (key === 'total') {
                        events[key] = calculateTotal(events);
                    }

                    if (!data.rows[$index]) {
                        var timespanStringified = moment(events['timespanBegin']).format('DD/MMM/YYYY HH:mm:ss');
                        // If data for this date is not yet in the array push it.
                        // This is the format that google chart expects for rendering the chart. The first object in 'c'
                        // array is used for rendering granularity on horizontal line based on values in 'v' field of the
                        // object and function curve is rendered based on the value of 'v' in second object. For each
                        // line in chart new object with 'v' value should be added to this array.
                        data.rows.push(
                            {c:
                                [
                                    {
                                        v: new Date(timespanStringified),
                                        f: timespanStringified
                                    },
                                    {v: events.hasOwnProperty(key) ? events[key] : 0}
                                ]
                            }
                        );

                    } else {
                        // If data for some event is already added for that date.
                        data.rows[$index]['c'].push({v: events.hasOwnProperty(key) ? events[key] : 0});
                    }

                });

               
            });

            return data;
        }

        function saveSessionData(eventKeys) {
            localStorageService.set('savedEventKeys', JSON.stringify(eventKeys));
        }

        function calculateTotal(events) {
            var clickEvents = events.hasOwnProperty('clickEvents') ? events['clickEvents'] : 0,
                consumeEvents = events.hasOwnProperty('consumeEvents') ? events['consumeEvents'] : 0,
                purchaseEvents = events.hasOwnProperty('purchaseEvents') ? events['purchaseEvents'] : 0,
                clickedRecommended = events.hasOwnProperty('clickedRecommended') ? events['clickedRecommended'] : 0,
                rateEvents = events.hasOwnProperty('rateEvents') ? events['rateEvents'] : 0,
                blacklistEvents = events.hasOwnProperty('blacklistEvents') ? events['blacklistEvents'] : 0,
                basketEvents = events.hasOwnProperty('basketEvents') ? events['basketEvents'] : 0;

            return clickEvents + consumeEvents + purchaseEvents + clickedRecommended + rateEvents + blacklistEvents +
                basketEvents;
        }

        function getPossibleLegendFieldsForSelect() {
            var possibleLegendKeysForSelect = [],
                allLegendKeys = getAllLegendKeys();

            for (var prop in allLegendKeys) {
                if (allLegendKeys.hasOwnProperty(prop) && savedEventKeys.indexOf(prop) < 0) {
                    allLegendKeys[prop]['index'] = savedEventKeys.length;
                    possibleLegendKeysForSelect.push(allLegendKeys[prop]);
                }
            }

            return possibleLegendKeysForSelect;
        }

        function getChartColors() {
            var colors = [],
                allLegendKeys = getAllLegendKeys();

            angular.forEach(savedEventKeys, function(key) {
                colors.push(allLegendKeys[key]['color']);
            });

            return colors;
        }

        function addOptionToChart(option) {
            savedEventKeys.push(option.trim());
            saveSessionData(savedEventKeys);
        }
        
        function removeOptionFromChart(optionIndex) {
            savedEventKeys.splice(optionIndex, 1);
            saveSessionData(savedEventKeys);
        }

    }
}());

