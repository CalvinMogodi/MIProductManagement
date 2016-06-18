(function () {
    'use strict';

    function dashboardController($location, $rootScope, $scope) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Dashboard';
        vm.icon = "home";
        $scope.profileImage = $rootScope.profileImage;

        vm.navigateTo = function (url) {
            $location.path(url);
        }
        
    }

    angular.module('MIPM').controller('dashboardController', dashboardController);
    dashboardController.$inject = ['$location', '$rootScope', '$scope'];

})();
