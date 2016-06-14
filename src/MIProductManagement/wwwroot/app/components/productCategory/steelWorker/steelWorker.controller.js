(function () {
    'use strict';

    function SteelWorkerController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = "Steel Worker";
        vm.icon = "add_box";
       
    }

    angular.module('MIPM').controller('SteelWorkerController', SteelWorkerController);
    SteelWorkerController.$inject = ['$location'];
})();   
