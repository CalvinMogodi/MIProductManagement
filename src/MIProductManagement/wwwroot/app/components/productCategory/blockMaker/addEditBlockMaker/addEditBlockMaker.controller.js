(function () {
    'use strict';

    function AddEditBlockMakerController(ProductCategoryService, firebaseUrl, $scope, $firebaseArray, modal, $firebaseObject, $filter) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl + "/BlockMaker");
        $scope.isEdit = false;

        init();
        function init() {
            $scope.blockMaker = ProductCategoryService.getAssignedRecord();
            if ($scope.blockMaker) 
                $scope.isEdit = true;

            $scope.products = ProductCategoryService.products;          
        }

        $scope.closeModal = function () {
            modal.hide();
        };

        $scope.create = function (blockMaker) {
            var blockMakers = $firebaseArray(ref);
            var today = $filter('date')(new Date(), 'yyyy-MM-dd');
            var newRecord = {
                productDescription: blockMaker.productDescription,
                total: blockMaker.total,
                used: blockMaker.used,
                createdDate: today.toString(),           
            };
            blockMakers.$add(newRecord);
            modal.hide();
        }

        $scope.Update = function (blockMaker) {
            var editRef = new Firebase(firebaseUrl + "/BlockMaker/" + blockMaker.$id);
            var oldBlockMaker = $firebaseObject(editRef);

            oldBlockMaker.$id = blockMaker.$id;
            oldBlockMaker.productDescription = blockMaker.productDescription;
            oldBlockMaker.total = blockMaker.total;
            oldBlockMaker.used = blockMaker.used;
            oldBlockMaker.createdDate = blockMaker.createdDate;
         
            oldBlockMaker.$save();
            modal.hide();
        }
      
    }

    angular.module('MIPM').controller('AddEditBlockMakerController', AddEditBlockMakerController);
    AddEditBlockMakerController.$inject = ['ProductCategoryService', 'firebaseUrl', '$scope', '$firebaseArray', 'modal', '$firebaseObject', '$filter'];
})();
