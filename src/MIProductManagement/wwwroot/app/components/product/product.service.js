(function () {
    'use strict';
    
    function ProductService($http) {
        var self = this;
        self.productCategory;

        self.getProductCategory = function () {
            return self.productCategory;
        }

        self.assignCurrentProductCategory = function (productCategory) {
            self.productCategory = productCategory;
        }

        return self;
    }

    angular.module('MIPM').service('ProductService', ProductService);
    ProductService.$inject = ['$http'];
})();