(function () {
    'use strict';

    function MachineServicesController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = "Machine Service";
        vm.icon = "add_box";
       
    }

    angular.module('MIPM').controller('MachineServicesController', MachineServicesController);
    MachineServicesController.$inject = ['$location'];
})();
