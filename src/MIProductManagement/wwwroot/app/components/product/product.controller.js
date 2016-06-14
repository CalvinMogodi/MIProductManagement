﻿(function () {
    'use strict';
    
    function ProductController($location, $firebaseArray, firebaseUrl, modal, ProductService, $scope) {
        var ref = new Firebase(firebaseUrl);
        var vm = this;
        vm.allProducts = [];
        $scope.showProducts = false;
        vm.heading = "Products";
        vm.icon = "add_box";
       
        init();

        function init() {
            vm.allProducts = $firebaseArray(ref.child('Product'));
        }

        vm.loadProducts = function (productCategory) {
            $scope.showProducts = true;
            vm.products = [];
            for (var i = 0; i < vm.allProducts.length; i++) {
                var product = vm.allProducts[i];
                if (productCategory == product.category) {
                    vm.products.push(product);
                }
            }
        }

        vm.newProduct = function () {
            ProductService.assignCurrentProductCategory(vm.productCategory);
            var templateUrl = '/app/components/product/createProduct/createProduct.html';
            modal.show(templateUrl, 'CreateProduct').then(function () {
                vm.loadProducts(vm.productCategory);
            });
        }

        vm.deleteProduct = function (product) {
            vm.allProducts.$remove(product).then(function () {
                vm.loadProducts(vm.productCategory);
            });
        }
       
    }
    angular.module('MIPM').controller('ProductController', ProductController);
    ProductController.$inject = ['$location', '$firebaseArray', 'firebaseUrl', 'modal', 'ProductService', '$scope'];
})();
