(function () {
    'use strict';

    function AddEditBricklayerController($location, $scope, firebaseUrl, ProductCategoryService, modal, $firebaseArray, $filter, $firebaseObject) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl + "/Bricklayer");
        $scope.isEdit = false;

        init();
        function init() {
            $scope.bricklayer = ProductCategoryService.getAssignedRecord();
            if ($scope.bricklayer)
                $scope.isEdit = true;

            $scope.products = ProductCategoryService.products;
        }
        $scope.closeModal = function () {
            modal.hide();
        };

        $scope.create = function (bricklayer) {
            $scope.formSubmitted = true;

            if ($scope.bricklayerForm.$valid) {
                var bricklayers = $firebaseArray(ref);

                var today = $filter('date')(new Date(), 'yyyy-MM-dd');
                var newRecord = {
                    productDescription: bricklayer.productDescription,
                    quantity: bricklayer.quantity,
                    createdDate: today.toString(),
                };
                bricklayers.$add(newRecord);
                modal.hide();
            }
        }

        $scope.Update = function (bricklayer) {
            $scope.formSubmitted = true;

            if ($scope.bricklayerForm.$valid) {
                var editRef = new Firebase(firebaseUrl + "/Bricklayer/" + bricklayer.$id);
                var oldBricklayer = $firebaseObject(editRef);

                oldBricklayer.$id = bricklayer.$id;
                oldBricklayer.productDescription = bricklayer.productDescription;
                oldBricklayer.quantity = bricklayer.quantity;
                oldBricklayer.createdDate = bricklayer.createdDate;

                oldBricklayer.$save();
                modal.hide();
            }
        }
    }
    angular.module('MIPM').controller('AddEditBricklayerController', AddEditBricklayerController);
    AddEditBricklayerController.$inject = ['$location', '$scope', 'firebaseUrl', 'ProductCategoryService', 'modal', '$firebaseArray', '$filter', '$firebaseObject'];

})();
