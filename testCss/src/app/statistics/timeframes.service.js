(function () {
    'use strict';

    angular.module('statistics').service('timeframes', timeframes);

    /** @ngInject */
    function timeframes(moment) {

        /**
         * Objects holding calculation callbacks for getting the time range. When adding the new time range, everything
         * that needs to be done is here by adding new object with the same interface.
         */
        return {
            '24H': {
                'code': '24H',
                'from': function() {
                    return moment().subtract(1, 'days');
                },
                'to': function() {
                    return moment();
                }
            },
            '7Days': {
                'code': '7Days',
                'from': function() {
                    return moment().subtract(7, 'days');
                },
                'to': function() {
                    return moment();
                }
            },
            '30Days': {
                'code': '30Days',
                'from': function() {
                    return moment().subtract(30, 'days');
                },
                'to': function() {
                    return moment();
                }
            },
            'month': {
                'code': 'month',
                'from': function() {
                    return moment().subtract(1, 'months').date(1);
                },
                'to': function() {
                    return moment().date(1);
                }
            }
        };
    }
}());

