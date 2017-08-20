(function () {
    'use strict';

    angular.module('statistics').service('chartsRequestParamsDataFormatter', chartsRequestParamsDataFormatter);

    /**
     * Service that will format data for API calls needed for chart displaying. 
     */
    
    /** @ngInject */
    function chartsRequestParamsDataFormatter(moment) {
        
        return {
            formatDate: formatDate,
            setDateToMidnight: setDateToMidnight,
            getGranularity: getGranularity
        };

        /**
         * Formats date for fetching data from the API.
         * 
         * @param date
         * @param setToZero
         * @returns string
         */
        function formatDate(date) {
            date = setDateToMidnight(date);

            return date.startOf('hour').toISOString().slice(0, -1);
        }

        /**
         * Sets given date to midnight and returns new date.
         * 
         * @param date
         * @returns moment
         */
        function setDateToMidnight(date) {
            date.utcOffset(0);
            date.set({hour: 0, minute: 0, second: 0, millisecond: 0});
            
            return date;
        }

        /**
         * Gets granularity based on start end date.
         * 
         * @param startDate
         * @param endDate
         * @returns {*}
         */
        function getGranularity(startDate, endDate) {
            var endStartDateDiff = moment(endDate).diff(moment(startDate), 'days');

            if (endStartDateDiff <= 1) {
                return 'PT1H';
            }

            if (endStartDateDiff <= 7) {
                return 'PT12H';
            }

            if (endStartDateDiff <= 31) {
                return 'P1D';
            }

            return 'P1W';
        }
    }
}());

