(function() {
  'use strict';

  angular
      .module('base')
      .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
