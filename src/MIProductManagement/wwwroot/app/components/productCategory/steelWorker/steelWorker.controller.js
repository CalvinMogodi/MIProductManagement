(function () {
    'use strict';

    function SteelWorkerController($location, $firebaseArray, firebaseUrl, ProductCategoryService, modal) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = "Steel Worker";
        vm.icon = "add_box";
       
    }

    angular.module('MIPM').controller('SteelWorkerController', SteelWorkerController);
    SteelWorkerController.$inject = ['$location', '$firebaseArray', 'firebaseUrl', 'ProductCategoryService', 'modal'];
})();   
