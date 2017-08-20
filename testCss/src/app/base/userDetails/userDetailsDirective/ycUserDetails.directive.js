(function(){
    angular
        .module('userDetails')
        .directive('ycUserDetails', ycUserDetails);

    function ycUserDetails() {
        return {
            restrict: 'E',
            controller: 'UserDetailsController',
            controllerAs: 'vm',
            templateUrl: 'app/base/userDetails/userDetailsDirective/user-details.html',
            scope: {}
        };
        
    }
})();
