(function() {
  'use strict';

  angular
    .module('base')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {

      $stateProvider
          .state('base', {
              abstract: true,
              templateUrl: 'app/base/base.html',
              controller: 'BaseController',
              controllerAs: 'vm'
          });

      $urlRouterProvider.otherwise('/');
  }

})();
