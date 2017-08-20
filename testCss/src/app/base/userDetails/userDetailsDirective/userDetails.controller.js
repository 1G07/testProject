(function() {
    'use strict';

    angular
        .module('userDetails')
        .controller('UserDetailsController', UserDetailsController);

    /** @ngInject */
    function UserDetailsController($scope, $cookies, $q, Restangular, ModalService, userDetails, routingBase) {

        var vm = this;
        
        vm.user = {};
        vm.contract = {};

        vm.close = close;
        vm.saveChanges = saveChanges;

        init();

        function init() {
            Restangular.one('v3/profile/get_profile_pack').customGET($cookies.get('customerID')).then(function(response) {
                vm.contract = response['profilePack']['customer'];
            });
        }

        /**
         * Route to the current state without modal in url will close the modal.
         */
        function close() {
            routingBase.goToCurrentState();
        }

        /**
         * When promise in parent controller is resolved, event will be emitted. In that moment all needed information
         * for view are prepared.
         */
        $scope.$on('userDataFetched', function() {
            vm.user = angular.copy(userDetails.currentUser);
        });

        /**
         * Saves changes both for personal and contract data.
         */
        function saveChanges() {
            $q.all(
                [
                    Restangular.all('v3/profile/update_customer').post(vm.contract),
                    Restangular.all('v4/profile/update_local_profile').post(vm.user)
                ]
            ).then(function(response) {
                    vm.contract = response[0]['customer'];
                    Restangular.one('v3/registration/get_me').get().then(function(response) {
                        vm.user = response['loginInfo'];
                        userDetails.currentUser = angular.copy(vm.user);
                        // When user data is fetched, base data for all views should be updated. Every controller
                        // that needs to be updated should be hooked to this event.
                        $scope.$emit('userDataFetched');
                        ModalService.showModal({
                            templateUrl: 'app/base/modals/message-modals/save-success-message.html',
                            controller: 'MessageModalController'
                        });
                    });
                }
            );
        }
        
    }
})();
