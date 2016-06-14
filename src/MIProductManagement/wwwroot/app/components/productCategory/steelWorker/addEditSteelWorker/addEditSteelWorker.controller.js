(function () {
    'use strict';

    function AddEditSteelWorkerController($location, $scope, firebaseUrl, ProductCategoryService, modal, $firebaseArray, $filter, $firebaseObject) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl + "/SteelWorker");
        $scope.isEdit = false;

        init();
        function init() {
            $scope.steelWorker = ProductCategoryService.getAssignedRecord();
            if ($scope.steelWorker)
                $scope.isEdit = true;

            $scope.products = ProductCategoryService.products;
        }
        $scope.closeModal = function () {
            modal.hide();
        };

        $scope.create = function (steelWorker) {

            $scope.formSubmitted = true;

            if ($scope.steelWorkerForm.$valid) {
                var steelWorkers = $firebaseArray(ref);

                var today = $filter('date')(new Date(), 'yyyy-MM-dd');
                var newRecord = {
                    productDescription: steelWorker.productDescription,
                    quantity: steelWorker.quantity,
                    createdDate: today.toString(),
                };
                steelWorkers.$add(newRecord);
                modal.hide();
            }
        }

        $scope.Update = function (steelWorker) {
            $scope.formSubmitted = true;

            if ($scope.steelWorkerForm.$valid) {
                var editRef = new Firebase(firebaseUrl + "/SteelWorker/" + steelWorker.$id);
                var oldSteelWorker = $firebaseObject(editRef);

                oldSteelWorker.$id = steelWorker.$id;
                oldSteelWorker.productDescription = steelWorker.productDescription;
                oldSteelWorker.quantity = steelWorker.quantity;
                oldSteelWorker.createdDate = steelWorker.createdDate;
                
                oldSteelWorker.$save();
                modal.hide();
            }
        }
      
    }

    angular.module('MIPM').controller('AddEditSteelWorkerController', AddEditSteelWorkerController);
    AddEditSteelWorkerController.$inject = ['$location', '$scope', 'firebaseUrl', 'ProductCategoryService', 'modal', '$firebaseArray', '$filter', '$firebaseObject'];
})();
