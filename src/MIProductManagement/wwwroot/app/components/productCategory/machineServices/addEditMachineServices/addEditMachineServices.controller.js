(function () {
    'use strict';

    function AddEditMachineServicesController($location, $scope, firebaseUrl, ProductCategoryService, modal, $firebaseArray, $filter, $firebaseObject) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl + "/MachineService");
        $scope.isEdit = false;

        init();
        function init() {
            $scope.machineService = ProductCategoryService.getAssignedRecord();

            if ($scope.machineService) {
                $scope.isEdit = true;
                if ($scope.machineService.date)
                    $scope.machineService.date = new Date($scope.machineService.date);
            }


            $scope.products = ProductCategoryService.products;
        }
        $scope.closeModal = function () {
            modal.hide();
        };

        $scope.create = function (machineService) {

           

            $scope.formSubmitted = true;

            if ($scope.machineServiceForm.$valid) {

                if (machineService.model == undefined)
                    machineService.model = '';
                if (machineService.date == undefined)
                    machineService.date = '';
                if (machineService.hours == undefined)
                    machineService.hours = '';
                if (machineService.driver == undefined)
                    machineService.driver = '';
                if (machineService.repaired == undefined)
                    machineService.repaired = '';
                if (machineService.breakdown == undefined)
                    machineService.breakdown = '';
                if (machineService.notes == undefined)
                    machineService.notes = '';
                if (machineService.techncian == undefined)
                    machineService.techncian = '';

                var machineServices = $firebaseArray(ref);
                machineService.date = $filter('date')(new Date(machineService.date), 'yyyy-MM-dd');
                var today = $filter('date')(new Date(), 'yyyy-MM-dd');
                var newRecord = {
                    productDescription: machineService.productDescription,
                    model: machineService.model,
                    date: machineService.date,
                    hours: machineService.hours,
                    driver: machineService.driver,
                    repaired: machineService.repaired,
                    breakdown: machineService.breakdown,
                    notes: machineService.notes,
                    techncian: machineService.techncian,
                    createdDate: today.toString(),
                };
                machineServices.$add(newRecord);
                modal.hide();
            }
        }

        $scope.Update = function (machineService) {
            $scope.formSubmitted = true;

            if ($scope.machineServiceForm.$valid) {

                if (machineService.model == undefined)
                    machineService.model = '';
                if (machineService.date == undefined)
                    machineService.date = '';
                if (machineService.hours == undefined)
                    machineService.hours = '';
                if (machineService.driver == undefined)
                    machineService.driver = '';
                if (machineService.repaired == undefined)
                    machineService.repaired = '';
                if (machineService.breakdown == undefined)
                    machineService.breakdown = '';
                if (machineService.notes == undefined)
                    machineService.notes = '';
                if (machineService.techncian == undefined)
                    machineService.techncian = '';

                var editRef = new Firebase(firebaseUrl + "/MachineService/" + machineService.$id);
                var oldMachineService = $firebaseObject(editRef);
                machineService.date = $filter('date')(new Date(machineService.date), 'yyyy-MM-dd');

                oldMachineService.$id = machineService.$id;
                oldMachineService.productDescription = machineService.productDescription;
                oldMachineService.model = machineService.model;
                oldMachineService.date = machineService.date;
                oldMachineService.hours = machineService.hours;
                oldMachineService.driver = machineService.driver;
                oldMachineService.repaired = machineService.repaired;
                oldMachineService.breakdown = machineService.breakdown;
                oldMachineService.techncian = machineService.techncian;
                oldMachineService.createdDate = machineService.createdDate;

                oldMachineService.$save();
                modal.hide();
            }
        }

    }

    angular.module('MIPM').controller('AddEditMachineServicesController', AddEditMachineServicesController);
    AddEditMachineServicesController.$inject = ['$location', '$scope', 'firebaseUrl', 'ProductCategoryService', 'modal', '$firebaseArray', '$filter', '$firebaseObject'];

})();
