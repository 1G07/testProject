(function() {
  'use strict';

  angular
    .module('base')
    .controller('BaseController', BaseController);

  /** @ngInject */
  function BaseController(
      $scope,
      $translate,
      $q,
      $cookies,
      errorHandler,
      Restangular,
      routingBase,
      routingAuthorization,
      userDetails,
      stateChecking,
      localStorageService,
      tabs
  ) {

      var vm = this;
      
      vm.navigationMenuOptions = [];
      vm.userRoles = [];
      vm.currentProfile = {};
      vm.currentProfileId = {};
      vm.currentLanguage = 'en';
      vm.possibleLanguages = ['de', 'en', 'fr'];
      vm.availableProfiles = [];
      vm.showUserInfo = false;
      vm.currentYear = new Date().getFullYear();

      vm.allTabs = tabs.getTabs();
      vm.changeCurrentLanguage = changeCurrentLanguage;
      vm.changeCurrentProfile = changeCurrentProfile;
      vm.openProfileInfo = openProfileInfo;
      vm.closeUserInfoSubMenu = closeUserInfoSubMenu;
      vm.showLicenceKey = showLicenceKey;
      vm.openEditUser = openEditUser;
      vm.goToTab = goToTab;
      vm.tabShouldBeSelected = tabShouldBeSelected;
      vm.logout = logout;

      init();

      function init() {
          errorHandler.setErrorInterceptor();

          // $q
          //     .all(
          //         [
          //             Restangular.one('v3/registration/get_me').get(),
          //             Restangular.all('v4/profile/get_accessible_mandators').getList({versionFilter: 'LITE,EXTENDED'})
          //         ]
          //     )
          //     .then(function(results) {
          //         vm.currentProfile = results[0];
          //         userDetails.currentUser = vm.currentProfile['loginInfo'];
          //         $scope.$broadcast('userDataFetched');
          //         vm.currentLanguage = vm.currentProfile['loginInfo']['lang'];
          //         vm.availableProfiles = results[1];
          vm.currentProfile = {loginInfo: {}};
                  vm.currentProfile.loginInfo.navigationMenuOptions = [
                      "STATISTICS",
                      "REVENUE",
                      "SCENARIOS",
                      "MODELS",
                      "PREVIEW",
                      "PLUGIN",
                      "IMPORT",
                      "EXPORT",
                      "ABTESTING",
                      "SUPPORT"
                  ]
      //         });
      }

      /**
       * Sets current language based on the choice from the language select box.
       */
      function changeCurrentLanguage() {
          $cookies.put('language', vm.currentLanguage, {expires: new Date().addHours(1)});
          $translate.use(vm.currentLanguage);
      }

      /**
       * Changes profile and refreshes the page.
       */
      function changeCurrentProfile() {
          $cookies.put('customerID', vm.currentProfileId, {expires: new Date().addHours(1)});
          localStorageService.clearAll();
          routingBase.refreshCurrentState();
      }

      /**
       * Opens profile info menu when image or name of a user are clicked.
       */
      function openProfileInfo() {
          vm.showUserInfo = !vm.showUserInfo;
      }

      /**
       * Closes user info menu.
       */
      function closeUserInfoSubMenu() {
          vm.showUserInfo = false;
      }

      /**
       * Shows licence key of the user.
       */
      function showLicenceKey() {
          routingBase.goToCurrentState('license');
      }

      /**
       * Opens edit user modal.
       */
      function openEditUser() {
          routingBase.goToCurrentState('userDetails');
      }

      /**
       * Calls a router in order to get to the proper state.
       * 
       * @param tabName
       */
      function goToTab(tabName) {
          routingBase.goToMenuTab(tabName);
      }

      /**
       * Determines if tab should be selected based on tab name and current state.
       * 
       * @param tabName
       * @returns {boolean}
       */
      function tabShouldBeSelected(tabName) {
          // Last child state will be the selected tab.
          return tabName === stateChecking.getLastChildNameFromCurrentState();
      }

      /**
       * Logs out current user.
       */
      function logout() {
          Restangular.one('v4/registration/logout').get().then(function() {
              localStorageService.clearAll();
              routingAuthorization.goToLogin();
          });
      }

      /**
       * When hitting specific URL state needs to update its variables.
       */
      $scope.$on('$stateChangeSuccess', function() {
          vm.displayLicenseModal = stateChecking.isLicenseModalStateActive();
          vm.displayUserModal = stateChecking.isUserModalStateActive();
      });

      /**
       * From the user specific form user can be updated and data that are common for all views(user first and last name)
       * has to updated. It is done on this event.
       */
      $scope.$on('userDataFetched', function() {
          vm.currentProfile['loginInfo'] = userDetails.currentUser;
      });
  }
})();
