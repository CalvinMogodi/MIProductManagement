(function () {
    'use strict';

    function productionAndConcreteController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.heading = "Production And Concrete";
        vm.icon = "add_box";
    }

    angular.module('MIPM').controller('productionAndConcreteController', productionAndConcreteController);
    productionAndConcreteController.$inject = ['$location'];
})();
