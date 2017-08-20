(function() {
  'use strict';

  angular
    .module('statistics')
    .controller('AddedRevenueController', AddedRevenueController);

  /** @ngInject */
  function AddedRevenueController($scope, Restangular, $cookies, localStorageService, moment, processSync) {

      var vm = this;

      vm.addedRevenues = [];
      vm.dateSelected = true;
      
      vm.getRecommendedConsumedDiff = getRecommendedConsumedDiff;
      
      /**
       * Limit  for number of records that should be fetched from API..
       *
       * @type {number}
       */
      var LIMIT = 100;

      init();
      
      function init() {
          var fromDate = localStorageService.get('fromDate'),
              toDate = localStorageService.get('toDate');

          vm.dateSelected = fromDate && fromDate !== '' && toDate && toDate !== '';

          if (vm.dateSelected) {
              var addedRevenueQueryParams = {
                  'limit': LIMIT,
                  'from_date_time': fromDate,
                  'to_date_time': toDate
              };
              
              Restangular
                  .all('v4/' + $cookies.get('customerID') + '/statistic/added_revenue')
                  .customGET('', addedRevenueQueryParams)
                  .then(function (addedRevenues) {
                          vm.addedRevenues = addedRevenues;
                          processSync.lockDateChangeProcess = false;
                      }
                  );
          }
      }

      /**
       * Gets calculated absolute value of difference between recommended and consumed time for each revenue.
       * 
       * @param revenue
       * @returns {number}
       */
      function getRecommendedConsumedDiff(revenue) {
          var diff = moment(revenue['timeRecommended']).diff(moment(revenue['timeConsumed']), 'minutes');
          return Math.abs(diff);
      }
      
      // Every time that time range changes data for chosen date must be fetched and displayed.
      $scope.$on('timeRangeChanged', init)
  }
})();
