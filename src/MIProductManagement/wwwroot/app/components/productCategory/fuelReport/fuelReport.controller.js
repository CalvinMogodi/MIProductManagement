(function () {
    'use strict';

    function FuelReportController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = "Fuel";
        vm.icon = "add_box";
    }

    angular.module('MIPM').controller('FuelReportController', FuelReportController);
    FuelReportController.$inject = ['$location'];
})();
