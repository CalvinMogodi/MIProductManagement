(function () {
    'use strict';

    function AddEditFuelReportController($location, $scope, firebaseUrl, ProductCategoryService, modal, $firebaseArray, $filter, $firebaseObject) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl + "/Fuel");
        $scope.isEdit = false;

        init();
        function init() {
            $scope.fuel = ProductCategoryService.getAssignedRecord();
            if ($scope.fuel)
                $scope.isEdit = true;

            $scope.products = ProductCategoryService.products;
        }
        $scope.closeModal = function () {
            modal.hide();
        };

        $scope.create = function (fuel) {

            $scope.formSubmitted = true;

            if ($scope.fuelForm.$valid) {
                var fuels = $firebaseArray(ref);

                var today = $filter('date')(new Date(), 'yyyy-MM-dd');
                var newRecord = {
                    productDescription: fuel.productDescription,
                    bought: fuel.bought,
                    used: fuel.used,
                    rest: fuel.rest,
                    createdDate: today.toString(),
                };
                fuels.$add(newRecord);
                modal.hide();
            }
        }

        $scope.Update = function (fuel) {
            $scope.formSubmitted = true;

            if ($scope.fuelForm.$valid) {
                var editRef = new Firebase(firebaseUrl + "/Fuel/" + fuel.$id);
                var oldFuel = $firebaseObject(editRef);

                oldFuel.$id = fuel.$id;
                oldFuel.productDescription = fuel.productDescription;
                oldFuel.bought = fuel.bought;
                oldFuel.used = fuel.used;
                oldFuel.rest = fuel.rest;
                oldFuel.createdDate = fuel.createdDate;
                
                oldFuel.$save();
                modal.hide();
            }
        }
        
    }

    angular.module('MIPM').controller('AddEditFuelReportController', AddEditFuelReportController);
    AddEditFuelReportController.$inject = ['$location', '$scope', 'firebaseUrl', 'ProductCategoryService', 'modal', '$firebaseArray', '$filter', '$firebaseObject'];
})();
