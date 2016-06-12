(function () {
    'use strict';

    function AddEditBlockMakerController(ProductCategoryService, firebaseUrl, $scope, $firebaseArray, modal, $firebaseObject) {
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

            for (var i = 0; i < $scope.products.length; i++) {
                if ($scope.blockMaker.productDesricption == $scope.products[i].description) {
                    $scope.blockMaker.productDesricption = $scope.products[i];
                }
            }
        }

        $scope.closeModal = function () {
            modal.hide();
        };

        $scope.create = function (blockMaker) {
            var blockMakers = $firebaseArray(ref);
            var today = new Date();
            var newRecord = {
                productDesricption: blockMaker.productDescription,
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
            oldBlockMaker.productDesricption = blockMaker.productDesricption;
            oldBlockMaker.total = blockMaker.total;
            oldBlockMaker.used = blockMaker.used;
            oldBlockMaker.createdDate = blockMaker.createdDate;
         
            oldBlockMaker.$save();
            modal.hide();
        }
      
    }

    angular.module('MIPM').controller('AddEditBlockMakerController', AddEditBlockMakerController);
    AddEditBlockMakerController.$inject = ['ProductCategoryService', 'firebaseUrl', '$scope', '$firebaseArray', 'modal', '$firebaseObject'];
})();
