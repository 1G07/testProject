(function() {
  'use strict';

  angular
    .module('statistics')
    .controller('StatisticsController', StatisticsController);

  /** @ngInject */
  function StatisticsController(
      $scope,
      $cookies, 
      localStorageService, 
      timeframes, 
      moment, 
      chartsRequestParamsDataFormatter, 
      stateChecking,
      processSync
  ) {

      var vm = this;

      /**
       * Constant for custom time range code. When this tab is chosen code for time frame should be this constant.
       * 
       * @type {string}
       */
      var CUSTOM_TIMERANGE_CODE = 'custom';
      
      vm.customerId = $cookies.get('customerID');
      vm.minToDate = '';
      vm.maxToDate = moment();
      vm.maxFromDate = moment().subtract(1, 'days');
      vm.timeRange = '24H';
      vm.timeframes = timeframes;
      
      // Only used for date picker control.
      vm.customFromDate = '';
      
      // Only used for date picker control.
      vm.customToDate = '';
      vm.compareMaxDate = '';
      vm.compareFromDate = '';
      vm.compareToDate = '';
      vm.isCompareMode = true;
      vm.granularity = 'PT1H';
      vm.isStatisticsChartsState = true;

      vm.setSelectedTimeRange = setSelectedTimeRange;
      vm.setMinToDate = setMinToDate;
      vm.updateOnCustomDateChange = updateOnCustomDateChange;
      vm.compare = compare;
      vm.resetCompare = resetCompare;

      init();
      
      function init() {
          var selectedTimeRange = localStorageService.get('timeRange');
          vm.fromDate = chartsRequestParamsDataFormatter.formatDate(timeframes[vm.timeRange].from());
          vm.toDate = chartsRequestParamsDataFormatter.formatDate(timeframes[vm.timeRange].to());

          if (selectedTimeRange) {
              vm.timeRange = selectedTimeRange;
              vm.fromDate = localStorageService.get('fromDate');
              vm.toDate = localStorageService.get('toDate');

              if (vm.fromDate && vm.fromDate !== '' && vm.toDate && vm.toDate !== '') {
                  setCompareMaxDate(moment(vm.fromDate), moment(vm.toDate));

                  if (selectedTimeRange === CUSTOM_TIMERANGE_CODE) {
                      // When custom is selected control must be filled properly and it demands date in moment format.
                      vm.customFromDate = moment(vm.fromDate);
                      vm.customToDate = moment(vm.toDate);
                  }
              }
          }
          
          storeDatesToLocalStorage(vm.fromDate, vm.toDate);
          localStorageService.set('timeRange', vm.timeRange);
      }

      /**
       * Sets chosen time range from tab options.
       * 
       * @param selectedTimeframe
       */
      function setSelectedTimeRange(selectedTimeframe) {
          vm.timeRange = selectedTimeframe;
          storeDatesToLocalStorage('', '');

          if (selectedTimeframe !== CUSTOM_TIMERANGE_CODE) {
              vm.timeRange = selectedTimeframe['code'];
              vm.customFromDate = '';
              vm.customToDate = '';

              setChosenFromToDate(selectedTimeframe.from(), selectedTimeframe.to());
          }

          localStorageService.set('timeRange', vm.timeRange);
      }

      /**
       * Sets minimal date that can be selected in date picker for upper bound date. It must always be greater than
       * lower bound date.
       */
      function setMinToDate() {
          if (vm.timeRange === CUSTOM_TIMERANGE_CODE) {
              vm.minToDate = angular.copy(vm.customFromDate);
              vm.minToDate = vm.minToDate.add(1, 'days');
          }
      }

      /**
       * Sets chosen from-to date. It is used for setting start and end dates both for custom and predefined
       * time frames.
       *
       * @param from
       * @param to
       */
      function setChosenFromToDate(from, to) {
          resetCompare();
          setCompareMaxDate(from, to);
          vm.fromDate = chartsRequestParamsDataFormatter.formatDate(from, vm.timeRange === 'month');
          vm.toDate = chartsRequestParamsDataFormatter.formatDate(to, vm.timeRange === 'month');

          storeDatesToLocalStorage(vm.fromDate, vm.toDate);
      }

      /**
       * Sets max date which user can select in compare date picker.
       *
       * @param from
       * @param to
       */
      function setCompareMaxDate(from, to) {
          var rangeInDays = to.diff(from, 'days');
          vm.compareMaxDate = moment().subtract(rangeInDays, 'days');
      }

      /**
       * Handles changing of custom dates when custom option is selected.
       */
      function updateOnCustomDateChange() {
          // Don`t allow changing of data until last request is finished or when some other option than 'custom' is selected 
         if (vm.timeRange === CUSTOM_TIMERANGE_CODE && ! processSync.lockDateChangeProcess) {
             // For custom date, time range should always go from midnight until the midnight including the selected dates
             vm.customFromDate = chartsRequestParamsDataFormatter.setDateToMidnight(vm.customFromDate);
             vm.customToDate = chartsRequestParamsDataFormatter.setDateToMidnight(vm.customToDate);
             var customDateCopy = angular.copy(vm.customToDate);
             setChosenFromToDate(vm.customFromDate, customDateCopy.add(1, 'days'));
         }
      }

      /**
       * Helper function for storing needed data to local storage.
       *
       * @param from
       * @param to
       */
      function storeDatesToLocalStorage(from, to) {
          localStorageService.set('fromDate', from);
          localStorageService.set('toDate', to);
          if (from !== '' && to !== '') {
              // Emits the event that date is changed. Subscriber controllers will hook on this event and do needed actions.
              $scope.$broadcast('timeRangeChanged');
              // Don`t allow changing of data until last request is finished.
              processSync.lockDateChangeProcess = true;
          }
      }

      /**
       * Sets model used for displaying comparison graph.
       */
      function compare() {
          vm.isCompareMode = false;
          var rangeInDays = moment(vm.toDate).diff(moment(vm.fromDate), 'days');
          vm.compareToDate = angular.copy(vm.compareFromDate);
          vm.compareToDate = vm.compareToDate.add(rangeInDays, 'days');
      }

      /**
       * Resets model used for displaying comparison graph.
       */
      function resetCompare() {
          vm.isCompareMode = true;
          vm.compareFromDate = '';
          vm.compareToDate = '';
          vm.compareMaxDate = '';
      }

      $scope.$on('$stateChangeSuccess', function() {
          vm.isStatisticsChartsState = stateChecking.isStatisticsChartsState();
      });
  }
})();
