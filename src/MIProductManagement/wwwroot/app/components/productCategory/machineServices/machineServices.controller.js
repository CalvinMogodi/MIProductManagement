(function () {
    'use strict';

    function MachineServicesController($location, $firebaseArray, firebaseUrl, ProductCategoryService, modal) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = "Machine Service";
        vm.icon = "add_box";
       
    }

    angular.module('MIPM').controller('MachineServicesController', MachineServicesController);
    MachineServicesController.$inject = ['$location', '$firebaseArray', 'firebaseUrl', 'ProductCategoryService', 'modal'];
})();
