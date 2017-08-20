(function() {
  'use strict';

  angular
    .module('statistics')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {

      $stateProvider
          .state('base.statistics', {
              abstract: true,
              templateUrl: 'app/statistics/statistics.html',
              controller: 'StatisticsController',
              controllerAs: 'vm'
          })
          .state('base.statistics.charts', {
              url: '/:modal',
              templateUrl: 'app/statistics/charts/charts.html',
              controller: 'ChartsController',
              controllerAs: 'vm'
          })
          .state('base.statistics.addedRevenue', {
              url: '/addedRevenue/:modal',
              templateUrl: 'app/statistics/addedRevenue/added-revenue.html',
              controller: 'AddedRevenueController',
              controllerAs: 'vm'
          });
  }

})();
