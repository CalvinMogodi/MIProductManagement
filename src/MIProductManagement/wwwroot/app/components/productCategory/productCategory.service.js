(function () {
    'use strict';
    
    function ProductCategoryService($location, firebaseUrl, $firebaseArray) {
        /* jshint validthis:true */
        var self = this;
        self.record;
        self.products = [];
        var ref = new Firebase(firebaseUrl);
        self.allProducts = $firebaseArray(ref.child('Product'));

        self.assignCurrentRecord = function (record) {
            self.record = record;
        }

        self.getAssignedRecord = function () {
            return self.record;
        }

        self.loadProducts = function (category) {
           
            
            self.products = [];
            for (var i = 0; i < self.allProducts.length; i++) {
                var product = self.allProducts[i];
                if (category == product.category) {
                    self.products.push(product);
                }
            }
        }

        return self;
    }

    angular.module('MIPM').service('ProductCategoryService', ProductCategoryService);
    ProductCategoryService.$inject = ['$location', 'firebaseUrl', '$firebaseArray'];
})();
