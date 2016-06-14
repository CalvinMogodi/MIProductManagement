(function () {
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
        }).when('/dashboard', {
            controller: 'dashboardController',
            templateUrl: viewBase + '/dashboard/dashboard.html',
            controllerAs: 'vm'
        }).when('/products', {
            controller: 'ProductController',
            templateUrl: viewBase + '/product/product.html',
            controllerAs: 'vm'
        }).when('/blockMaker', {
            controller: 'BlockMakerController',
            templateUrl: viewBase + '/productCategory/blockMaker/blockMaker.html',
            controllerAs: 'vm'
        }).when('/civil', {
            controller: 'CivilController',
            templateUrl: viewBase + '/productCategory/civil/civil.html',
            controllerAs: 'vm'
        }).when('/bricklayer', {
            controller: 'BricklayerController',
            templateUrl: viewBase + '/productCategory/bricklayer/bricklayer.html',
            controllerAs: 'vm'
        }).when('/delivery', {
            controller: 'DeliveryReportController',
            templateUrl: viewBase + '/productCategory/deliveryReport/deliveryReport.html',
            controllerAs: 'vm'
        }).when('/fuel', {
            controller: 'FuelReportController',
            templateUrl: viewBase + '/productCategory/fuelReport/fuelReport.html',
            controllerAs: 'vm'
        }).when('/machineServices', {
            controller: 'MachineServicesController',
            templateUrl: viewBase + '/productCategory/machineServices/machineServices.html',
            controllerAs: 'vm'
        }).when('/productionAndConcrete', {
            controller: 'productionAndConcreteController',
            templateUrl: viewBase + '/productCategory/productionAndConcrete/productionAndConcrete.html',
            controllerAs: 'vm'
        }).when('/steelWorker', {
            controller: 'SteelWorkerController',
            templateUrl: viewBase + '/productCategory/steelWorker/steelWorker.html',
            controllerAs: 'vm'
        }).otherwise({ redirectTo: '/' });
    }

    angular.module('MIPM').config(['$routeProvider', '$locationProvider', routeProvider]);
    routeProvider.$inject = ['$routeProvider', '$locationProvider'];

})();