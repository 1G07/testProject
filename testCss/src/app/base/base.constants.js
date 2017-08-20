/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('base')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('availableLocales', ['en', 'de', 'fr']);

})();
