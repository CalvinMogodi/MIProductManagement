(function () {
    'use strict';

    function CreateProduct(firebaseUrl, $scope, modal, $firebaseArray, ProductService) {
        /* jshint validthis:true */
        var vm = this;
        var ref = new Firebase(firebaseUrl + "/Product");

        init();

        function init() {
            $scope.category = ProductService.getProductCategory();
        }

        $scope.createProduct = function (project) {
            var AddProject = $firebaseArray(ref);
            var product = {
                description: project.description,
                category: $scope.category
            };
            AddProject.$add(product);
            modal.hide();
        }
        $scope.closeModal = function () {
            modal.hide();
        };     
    }

    angular.module('MIPM').controller('CreateProduct', CreateProduct);
    CreateProduct.$inject = ['firebaseUrl', '$scope', 'modal', '$firebaseArray', 'ProductService'];
})();
