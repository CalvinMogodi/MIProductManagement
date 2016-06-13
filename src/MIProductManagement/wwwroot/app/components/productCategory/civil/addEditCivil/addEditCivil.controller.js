(function () {
    'use strict';

    function AddEditCivilController($location, $scope, firebaseUrl, ProductCategoryService, modal, $firebaseArray, $filter, $firebaseObject) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl + "/Civil");
        $scope.isEdit = false;

        init();
        function init() {
            $scope.civil = ProductCategoryService.getAssignedRecord();
            if ($scope.civil)
                $scope.isEdit = true;

            $scope.products = ProductCategoryService.products;
        }
        $scope.closeModal = function () {
            modal.hide();
        };

        $scope.create = function (civil) {
            var civils = $firebaseArray(ref);

            var today = $filter('date')(new Date(), 'yyyy-MM-dd');
            var newRecord = {
                productDescription: civil.productDescription,
                quantity: civil.quantity,
                createdDate: today.toString(),
            };
            civils.$add(newRecord);
            modal.hide();
        }

        $scope.Update = function (civil) {
            var editRef = new Firebase(firebaseUrl + "/Civil/" + civil.$id);
            var oldCivil = $firebaseObject(editRef);

            oldCivil.$id = civil.$id;
            oldCivil.productDescription = civil.productDescription;
            oldCivil.quantity = civil.quantity;
            oldCivil.createdDate = civil.createdDate;

            oldCivil.$save();
            modal.hide();
        }
    }

    angular.module('MIPM').controller('AddEditCivilController', AddEditCivilController);
    AddEditCivilController.$inject = ['$location', '$scope', 'firebaseUrl', 'ProductCategoryService', 'modal', '$firebaseArray', '$filter', '$firebaseObject'];
})();
