(function () {
    'use strict';

    function dashboardController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = 'Dashboard';
        vm.icon = "home";
      
        vm.navigateTo = function (url) {
            $location.path(url);
        }
    }

    angular.module('MIPM').controller('dashboardController', dashboardController);
    dashboardController.$inject = ['$location'];

})();
