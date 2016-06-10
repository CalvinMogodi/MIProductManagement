﻿(function () {
    'use strict';
    
    function ProductController($location, $firebaseObject, $firebaseArray, firebaseUrl, modal, ProductService) {
        var ref = new Firebase(firebaseUrl);
        var vm = this;
        vm.allProducts = [];
       
        vm.showProducts = false;

        init();

        function init() {
            vm.allProducts = $firebaseArray(ref.child('Product'));
        }

        vm.loadProducts = function (productCategory) {
            vm.showProducts = true;
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
            modal.show(templateUrl, 'CreateProduct');
        }
       
    }
    angular.module('MIPM').controller('ProductController', ProductController);
    ProductController.$inject = ['$location', '$firebaseObject', '$firebaseArray', 'firebaseUrl', 'modal', 'ProductService'];
})();
