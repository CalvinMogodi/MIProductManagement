(function () {
    'use strict';

    function productionAndConcreteController($location, $firebaseArray, firebaseUrl, ProductCategoryService, modal) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = "Production And Concrete";
        vm.icon = "add_box";
    }

    angular.module('MIPM').controller('productionAndConcreteController', productionAndConcreteController);
    productionAndConcreteController.$inject = ['$location', '$firebaseArray', 'firebaseUrl', 'ProductCategoryService', 'modal'];
})();
