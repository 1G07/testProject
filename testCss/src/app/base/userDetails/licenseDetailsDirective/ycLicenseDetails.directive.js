(function(){
    angular
        .module('userDetails')
        .directive('ycLicenseDetails', ycLicenseDetails);

    function ycLicenseDetails() {
        return {
            restrict: 'E',
            controller: 'LicenseDetailsController',
            controllerAs: 'vm',
            templateUrl: 'app/base/userDetails/licenseDetailsDirective/license-details.html',
            scope: {}
        };
        
    }
})();
