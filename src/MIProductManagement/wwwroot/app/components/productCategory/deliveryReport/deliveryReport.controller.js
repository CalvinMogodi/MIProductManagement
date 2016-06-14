(function () {
    'use strict';

    function DeliveryReportController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = "Delivery";
        vm.icon = "add_box";
    }

    angular.module('MIPM').controller('DeliveryReportController', DeliveryReportController);
    DeliveryReportController.$inject = ['$location'];
})();
