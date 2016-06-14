(function () {
    'use strict';

    function AddEditProductionAndConcreteController($location, $scope, firebaseUrl, ProductCategoryService, modal, $firebaseArray, $filter, $firebaseObject) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl + "/ProductionAndConcrete");
        $scope.isEdit = false;

        init();
        function init() {
            $scope.productionAndConcrete = ProductCategoryService.getAssignedRecord();
            if ($scope.productionAndConcrete)
                $scope.isEdit = true;

            $scope.products = ProductCategoryService.products;
        }
        $scope.closeModal = function () {
            modal.hide();
        };

        $scope.create = function (productionAndConcrete) {

            $scope.formSubmitted = true;

            if ($scope.productionAndConcreteForm.$valid) {
                var deliveries = $firebaseArray(ref);

                var today = $filter('date')(new Date(), 'yyyy-MM-dd');
                var newRecord = {
                    productDescription: productionAndConcrete.productDescription,
                    quantity: productionAndConcrete.quantity,
                    createdDate: today.toString(),
                };
                deliveries.$add(newRecord);
                modal.hide();
            }
        }

        $scope.Update = function (productionAndConcrete) {
            $scope.formSubmitted = true;

            if ($scope.productionAndConcreteForm.$valid) {
                var editRef = new Firebase(firebaseUrl + "/ProductionAndConcrete/" + productionAndConcrete.$id);
                var oldProductionAndConcrete = $firebaseObject(editRef);

                oldProductionAndConcrete.$id = productionAndConcrete.$id;
                oldProductionAndConcrete.productDescription = productionAndConcrete.productDescription;
                oldProductionAndConcrete.quantity = productionAndConcrete.quantity;
                oldProductionAndConcrete.createdDate = productionAndConcrete.createdDate;
                
                oldProductionAndConcrete.$save();
                modal.hide();
            }
        }
       
    }

    angular.module('MIPM').controller('AddEditProductionAndConcreteController', AddEditProductionAndConcreteController);
    AddEditProductionAndConcreteController.$inject = ['$location', '$scope', 'firebaseUrl', 'ProductCategoryService', 'modal', '$firebaseArray', '$filter', '$firebaseObject'];
})();
