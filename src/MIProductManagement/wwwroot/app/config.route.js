﻿(function () {
    'use strict';
    var routeProvider = function ($routeProvider, $locationProvider) {

        var viewBase = '/app/components';
        var viewcommonBase = '/app/common';

        $routeProvider.when('/index', {
            controller: 'IndexController',
            templateUrl: 'index.html',
            controllerAs: 'vm'            
        }).when('/login', {
            controller: 'LoginController',
            templateUrl: viewcommonBase + '/login/login.html',
            controllerAs: 'vm'
        }).when('/products', {
            controller: 'ProductController',
            templateUrl: viewBase + '/product/product.html',
            controllerAs: 'vm'
        }).when('/blockMaker', {
            controller: 'BlockMakerController',
            templateUrl: viewBase + '/productCategory/blockMaker/blockMaker.html',
            controllerAs: 'vm'
        }).otherwise({ redirectTo: '/' });
    }

    angular.module('MIPM').config(['$routeProvider', '$locationProvider', routeProvider]);
    routeProvider.$inject = ['$routeProvider', '$locationProvider'];

})();