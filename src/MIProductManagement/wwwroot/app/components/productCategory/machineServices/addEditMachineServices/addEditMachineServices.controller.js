(function () {
    'use strict';

    function AddEditMachineServicesController($location, $scope, firebaseUrl, ProductCategoryService, modal, $firebaseArray, $filter, $firebaseObject) {
        /* jshint validthis:true */
        var vm = this;
         var ref = new Firebase(firebaseUrl + "/Delivery");
        $scope.isEdit = false;

        init();
        function init() {
            $scope.delivery = ProductCategoryService.getAssignedRecord();
            if ($scope.delivery)
                $scope.isEdit = true;

            $scope.products = ProductCategoryService.products;
        }
        $scope.closeModal = function () {
            modal.hide();
        };

        $scope.create = function (delivery) {

            $scope.formSubmitted = true;

            if ($scope.deliveryForm.$valid) {
                var deliveries = $firebaseArray(ref);

                var today = $filter('date')(new Date(), 'yyyy-MM-dd');
                var newRecord = {
                    productDescription: delivery.productDescription,
                    quantity: delivery.quantity,
                    createdDate: today.toString(),
                };
                deliveries.$add(newRecord);
                modal.hide();
            }
        }

        $scope.Update = function (delivery) {
            $scope.formSubmitted = true;

            if ($scope.deliveryForm.$valid) {
                var editRef = new Firebase(firebaseUrl + "/Delivery/" + delivery.$id);
                var oldDelivery = $firebaseObject(editRef);

                oldDelivery.$id = delivery.$id;
                oldDelivery.productDescription = delivery.productDescription;
                oldDelivery.quantity = delivery.quantity;
                oldDelivery.createdDate = delivery.createdDate;
                
                oldDelivery.$save();
                modal.hide();
            }
        }
       
    }

    angular.module('MIPM').controller('AddEditMachineServicesController', AddEditMachineServicesController);
    AddEditMachineServicesController.$inject = ['$location', '$scope', 'firebaseUrl', 'ProductCategoryService', 'modal', '$firebaseArray', '$filter', '$firebaseObject'];

})();
