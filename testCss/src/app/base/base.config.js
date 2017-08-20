(function() {
  'use strict';

  angular
    .module('base')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $translateProvider, availableLocales, RestangularProvider) {
      // Enable log
      $logProvider.debugEnabled(true);

      // Set options third-party lib
      toastrConfig.allowHtml = true;
      toastrConfig.timeOut = 3000;
      toastrConfig.positionClass = 'toast-top-right';
      toastrConfig.preventDuplicates = true;
      toastrConfig.progressBar = true;

      // generate mapping
      var localesMapping = {
          "*": availableLocales[0]
      };
      
      availableLocales.forEach(function(locale) {
          if (locale.indexOf("_") === -1) {   // if not specific locale ( ie. en_US )
              localesMapping[locale + "_*"] = locale;
          }
      });

      $translateProvider
          .useStaticFilesLoader({prefix: "../assets/locales/locale-", suffix: ".json"})
          .determinePreferredLanguage()
          .registerAvailableLanguageKeys(availableLocales, localesMapping)
          .useSanitizeValueStrategy("escape");

      RestangularProvider
          .setDefaultHttpFields({withCredentials: true})
          .setBaseUrl('https://admin.test.yoochoose.net/api/');
      
      // Expend prototype of Date to be able to add hours on date.
      Date.prototype.addHours= function(h){
          this.setHours(this.getHours()+h);
          return this;
      };
  }

})();
